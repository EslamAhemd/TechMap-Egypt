import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ICompany } from '../models/icompany';
import { resolveCompanyLogo } from './company-image';

interface CompanyDocument {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  website?: string;
  category?: string;
  employees?: string;
  logo?: string;
  logoUrl?: string;
  logoTheme?: ICompany['logoTheme'];
  bannerImage?: string;
  skills?: string[];
}

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/companies';

  getAll(): Observable<ICompany[]> {
    return this.http.get<CompanyDocument[]>(this.apiUrl).pipe(
      map((companies) => companies.map((company) => this.toCompany(company)))
    );
  }

  create(company: Record<string, unknown>): Observable<unknown> {
    return this.http.post(this.apiUrl, company, { headers: this.authHeaders() });
  }

  update(id: string, company: Record<string, unknown>): Observable<unknown> {
    return this.http.put(`${this.apiUrl}/${id}`, company, { headers: this.authHeaders() });
  }

  delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.authHeaders() });
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: localStorage.getItem('authToken') ?? '' });
  }

  private toCompany(company: CompanyDocument): ICompany {
    return {
      id: company._id,
      name: company.name,
      category: company.category ?? 'Technology Company',
      location: company.location ?? 'Egypt',
      employees: company.employees ?? 'Not specified',
      logo: resolveCompanyLogo(company.name, company.logo ?? company.logoUrl),
      logoTheme: company.logoTheme ?? 'light',
      bannerImage: company.bannerImage ?? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
      skills: company.skills ?? []
    };
  }

}
