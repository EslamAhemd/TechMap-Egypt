import { ChangeDetectorRef, Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { IOpportunity } from '../../models/iopportunity';
import { OpportunityService } from '../../services/opportunity-service';

@Component({
  imports: [RouterLink],
  selector: 'app-oopertunites',
  styleUrl: './oopertunites.css',
  templateUrl: './oopertunites.html',
})
export class Oopertunites implements OnInit {
  showViewAll = input(false);
  fullPage = input(false);
  searchTerm = input('');
  typeFilter = input('All Types');
  levelFilter = input('All Levels');
  workModeFilter = input('All Work Models');
  locationFilter = input('All Locations');
  opportunities: IOpportunity[] = [];
  isLoading = true;
  hasError = false;

  private readonly router = inject(Router);
  private readonly opportunityService = inject(OpportunityService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.opportunityService.getAll().subscribe({
      next: (opportunities) => {
        this.opportunities = opportunities;
        this.isLoading = false;
        this.changeDetector.detectChanges();
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
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

  viewCompany(companyId: string): void {
    this.router.navigate(['/companies', companyId]);
  }

  displayedOpportunities(): IOpportunity[] {
    const search = this.searchTerm().trim().toLowerCase();
    const filtered = this.opportunities.filter((opportunity) => {
      const searchableText = [
        opportunity.title,
        opportunity.companyName,
        ...opportunity.skills
      ].join(' ').toLowerCase();

      return (!search || searchableText.includes(search))
        && (this.typeFilter() === 'All Types' || opportunity.type === this.typeFilter())
        && (this.levelFilter() === 'All Levels' || opportunity.experienceLevel === this.levelFilter())
        && (this.workModeFilter() === 'All Work Models' || opportunity.workMode === this.workModeFilter())
        && (this.locationFilter() === 'All Locations' || opportunity.location === this.locationFilter());
    });

    return this.fullPage() ? filtered : filtered.slice(0, 3);
  }
}
