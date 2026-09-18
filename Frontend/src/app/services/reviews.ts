import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Reviews {

  private apiUrl = 'http://localhost:5000/reviews';

  constructor(private http: HttpClient) {}

  getAllReviews() {
    return this.http.get(this.apiUrl);
  }

  createReview(review: any) {
    return this.http.post(this.apiUrl, review);
  }
}