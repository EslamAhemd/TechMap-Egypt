import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Header } from '../../components/header/header';
import { Oopertunites } from '../../components/oopertunites/oopertunites';
import { AdminOpportunities } from '../../components/admin-opportunities/admin-opportunities';
import { AuthService } from '../../services/auth-service';
import { IOpportunity } from '../../models/iopportunity';
import { OpportunityService } from '../../services/opportunity-service';

@Component({
  selector: 'app-opportunities-page',
  imports: [Header, Oopertunites, AdminOpportunities, FormsModule],
  styleUrl: './opportunities.css',
  templateUrl: './opportunities.html'
})
export class OpportunitiesPage implements OnInit {
  readonly authService = inject(AuthService);
  opportunities: IOpportunity[] = [];
  searchTerm = '';
  typeFilter = 'All Types';
  levelFilter = 'All Levels';
  workModeFilter = 'All Work Models';
  locationFilter = 'All Locations';
  private readonly opportunityService = inject(OpportunityService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.opportunityService.getAll().subscribe({
      next: (opportunities) => {
        this.opportunities = opportunities;
        this.changeDetector.detectChanges();
      }
    });
  }

  get filteredOpportunityCount(): number {
    const search = this.searchTerm.trim().toLowerCase();

    return this.opportunities.filter((opportunity) => {
      const searchableText = [opportunity.title, opportunity.companyName, ...opportunity.skills]
        .join(' ')
        .toLowerCase();

      return (!search || searchableText.includes(search))
        && (this.typeFilter === 'All Types' || opportunity.type === this.typeFilter)
        && (this.levelFilter === 'All Levels' || opportunity.experienceLevel === this.levelFilter)
        && (this.workModeFilter === 'All Work Models' || opportunity.workMode === this.workModeFilter)
        && (this.locationFilter === 'All Locations' || opportunity.location === this.locationFilter);
    }).length;
  }
}