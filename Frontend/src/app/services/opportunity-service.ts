import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { IOpportunity } from '../models/iopportunity';
import { resolveCompanyLogo } from './company-image';

interface OpportunityApiResponse {
  data: OpportunityDocument[];
}

interface OpportunityDocument {
  _id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  type: IOpportunity['type'];
  experienceLevel: string;
  workMode: IOpportunity['workMode'];
  location: string;
  description: string;
  salaryRange: { min: number; max: number; visible: boolean };
  requiredSkills?: Array<{ name?: string; skillName?: string } | string>;
  postedDate: string;
}

@Injectable({ providedIn: 'root' })
export class OpportunityService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/opportunities';

  getAll(): Observable<IOpportunity[]> {
    return this.http.get<OpportunityApiResponse>(this.apiUrl).pipe(
      map((response) => (response.data ?? []).map((item) => this.toOpportunity(item)))
    );
  }

  create(opportunity: Record<string, unknown>): Observable<unknown> {
    return this.http.post(this.apiUrl, opportunity, { headers: this.authHeaders() });
  }

  update(id: string, opportunity: Record<string, unknown>): Observable<unknown> {
    return this.http.put(`${this.apiUrl}/${id}`, opportunity, { headers: this.authHeaders() });
  }

  delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.authHeaders() });
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: localStorage.getItem('authToken') ?? '' });
  }

  private toOpportunity(item: OpportunityDocument): IOpportunity {
    return {
      id: item._id,
      companyId: String(item.companyId),
      title: item.title,
      companyName: item.companyName,
      companyLogo: resolveCompanyLogo(item.companyName, item.companyLogo),
      companyLogoTheme: 'light',
      location: item.location,
      postedLabel: this.formatPostedDate(item.postedDate),
      type: item.type,
      experienceLevel: item.experienceLevel,
      workMode: item.workMode,
      description: item.description,
      salary: item.salaryRange.visible
        ? `EGP ${item.salaryRange.min.toLocaleString()}–${item.salaryRange.max.toLocaleString()}/mo`
        : 'Salary not disclosed',
      skills: (item.requiredSkills ?? []).map((skill) =>
        typeof skill === 'string' ? skill : skill.name ?? skill.skillName ?? ''
      ).filter(Boolean)
    };
  }

  private formatPostedDate(date: string): string {
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(date));
  }

}
