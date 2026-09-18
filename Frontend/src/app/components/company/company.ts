import { ChangeDetectorRef, Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ICompany } from '../../models/icompany';
import { IOpportunity } from '../../models/iopportunity';
import { CompanyService } from '../../services/company-service';
import { OpportunityService } from '../../services/opportunity-service';

@Component({
  imports: [RouterLink],
  selector: 'app-company',
  styleUrl: './company.css',
  templateUrl: './company.html',
})
export class Company implements OnInit {
  fullPage = input(false);
  companies: ICompany[] = [];
  opportunities: IOpportunity[] = [];
  isLoading = true;
  hasError = false;

  private readonly companyService = inject(CompanyService);
  private readonly opportunityService = inject(OpportunityService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.companyService.getAll().subscribe({
      next: (companies) => {
        this.companies = companies;
        this.isLoading = false;
        this.changeDetector.detectChanges();
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }
    });

    this.opportunityService.getAll().subscribe({
      next: (opportunities) => {
        this.opportunities = opportunities;
        this.changeDetector.detectChanges();
      }
    });
  }

  openRoles(companyName: string): number {
    return this.opportunities.filter((opportunity) => opportunity.companyName === companyName).length;
  }
}
