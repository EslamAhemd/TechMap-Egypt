import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IApplication } from '../models/iapplication';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/applications';
  private readonly storageKey = 'techmapApplications';

  save(application: IApplication): Observable<unknown> {
    return this.http.post(this.apiUrl, application, { headers: this.authHeaders() });
  }

  getAll(): Observable<{ data: IApplication[] }> {
    return this.http.get<{ data: IApplication[] }>(this.apiUrl, { headers: this.authHeaders() });
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: localStorage.getItem('authToken') ?? '' });
  }
}