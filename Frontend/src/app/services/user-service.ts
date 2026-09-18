import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Iuser } from "../models/iuser";
import { IuserResponse } from "../models/iuser-response";
import { IloginData } from "../models/ilogin-data";

@Injectable({
    providedIn: 'root'
})


@Injectable({
    providedIn: 'root'
})
export class UserService {
    users: Iuser[] = [];
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5000/users';

    getUsers(): Observable<IuserResponse> {
        return this.http.get<IuserResponse>(this.apiUrl);
    }

    register(newUser: Iuser): Observable<IuserResponse> {
        return this.http.post<IuserResponse>(`${this.apiUrl}/register`, newUser);
    }

    login(loginData: IloginData): Observable<IuserResponse> {
        return this.http.post<IuserResponse>(`${this.apiUrl}/login`, loginData);
    }
}