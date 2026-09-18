import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ApplicationService } from '../../services/application-service';
import { IApplication } from '../../models/iapplication';

@Component({
  selector: 'app-apply',
  imports: [ReactiveFormsModule, RouterLink],
  styleUrl: './apply.css',
  templateUrl: './apply.html'
})
export class Apply {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly applicationService = inject(ApplicationService);

  submitted = false;
  errorMessage = '';
  opportunityTitle = this.route.snapshot.queryParamMap.get('job') ?? 'Tech Opportunity';

  applicationForm = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    yearsOfExperience: [0, [Validators.required, Validators.min(0)]],
    resumeLink: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    coverLetter: ['', [Validators.required, Validators.minLength(30)]]
  });

  submitApplication(): void {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    const application: IApplication = {
      id: crypto.randomUUID(),
      opportunityTitle: this.opportunityTitle,
      ...this.applicationForm.getRawValue(),
      submittedAt: new Date().toISOString()
    };

    this.applicationService.save(application).subscribe({
      next: () => this.submitted = true,
      error: (error) => this.errorMessage = error.error?.message ?? 'Could not submit application.'
    });
  }

  goToOpportunities(): void {
    this.router.navigateByUrl('/opportunities');
  }
}