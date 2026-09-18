import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Iuser } from "../models/iuser";
import { IuserResponse } from "../models/iuser-response";
import { IloginData } from "../models/ilogin-data";

import {
    ItokenPayload
} from '../models/itoken-payload';

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


    // to implement tho AuthGaurd
    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        return Boolean(token)
    }

    getTokenPayload(): ItokenPayload | null {
        const token = this.getToken();

        if (!token) {
            return null;
        }

        try {
            const tokenParts = token.split('.');

            if (tokenParts.length !== 3) {
                return null;
            }

            const payload = tokenParts[1];

            const base64 = payload
                .replace(/-/g, '+')
                .replace(/_/g, '/');

            const paddedBase64 = base64.padEnd(
                Math.ceil(base64.length / 4) * 4,
                '='
            );

            const decodedPayload = atob(paddedBase64);

            return JSON.parse(
                decodedPayload
            ) as ItokenPayload;
        } catch (error) {
            console.log('Invalid token:', error);

            return null;
        }
    }

    getUserRole(): string | null {
        const payload = this.getTokenPayload();

        return payload?.role || null;
    }

    isAdmin(): boolean {
        const role = this.getUserRole();

        return role?.toLowerCase() === 'admin';
    }






}