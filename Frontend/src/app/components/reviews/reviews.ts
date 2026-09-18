import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Reviews } from "../../services/reviews";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-reviews",
  imports: [CommonModule, FormsModule],
  templateUrl: "./reviews.html",
  styleUrl: "./reviews.css",
})
export class ReviewsComponent implements OnInit {
  reviews: any[] = [];

  reviewData = {
    companyId: "",
    userId: "",
    userName: "",
    userImage: "",
    rating: {
      overall: 0,
      workEnvironment: 0,
      techStack: 0,
      careerGrowth: 0,
    },
    reviewText: "",
  };

  constructor(
    private reviewsService: Reviews,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.reviewsService.getAllReviews().subscribe({
      next: (response: any) => {
        console.log("REVIEWS RESPONSE:", response);
        this.reviews = response.data;
        this.cdr.detectChanges();
        console.log("REVIEWS ARRAY:", this.reviews);
      },

      error: (error) => {
        console.error("Error loading reviews:", error);
      },
    });
  }

  addReview() {
    this.reviewsService.createReview(this.reviewData).subscribe({
      next: (response: any) => {
        console.log("Review added:", response);
        this.reviews.push(response.data);
      },

      error: (error) => {
        console.error("Error adding review:", error);
      },
    });
  }
}
