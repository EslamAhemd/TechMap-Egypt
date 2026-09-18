import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ICompany } from '../../models/icompany';
import { IOpportunity } from '../../models/iopportunity';
import { CompanyService } from '../../services/company-service';
import { OpportunityService } from '../../services/opportunity-service';

@Component({
  selector: 'app-company-details',
  imports: [RouterLink],
  styleUrl: './company-details.css',
  templateUrl: './company-details.html'
})
export class CompanyDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly companyService = inject(CompanyService);
  private readonly opportunityService = inject(OpportunityService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  company?: ICompany;
  opportunities: IOpportunity[] = [];

  ngOnInit(): void {
    const companyId = this.route.snapshot.paramMap.get('id');

    this.companyService.getAll().subscribe({
      next: (companies) => {
        this.company = companies.find((item) => item.id === companyId);
        this.changeDetector.detectChanges();
      }
    });

    this.opportunityService.getAll().subscribe({
      next: (opportunities) => {
        this.opportunities = opportunities.filter((item) => item.companyId === companyId);
        this.changeDetector.detectChanges();
      }
    });
  }

  applyForOpportunity(title: string): void {
    const returnUrl = `/apply?job=${encodeURIComponent(title)}`;

    if (localStorage.getItem('authToken')) {
      this.router.navigateByUrl(returnUrl);
      return;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl } });
  }
}