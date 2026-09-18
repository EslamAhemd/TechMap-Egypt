import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IOpportunity } from '../../models/iopportunity';
import { ICompany } from '../../models/icompany';
import { OpportunityService } from '../../services/opportunity-service';
import { CompanyService } from '../../services/company-service';
import { ApplicationService } from '../../services/application-service';
import { IApplication } from '../../models/iapplication';

@Component({
  selector: 'app-admin-opportunities',
  imports: [FormsModule],
  templateUrl: './admin-opportunities.html',
  styleUrl: './admin-opportunities.css'
})
export class AdminOpportunities implements OnInit {
  opportunities: IOpportunity[] = [];
  companies: ICompany[] = [];
  searchTerm = '';
  companySearchTerm = '';
  activeTab: 'opportunities' | 'companies' | 'applications' = 'opportunities';
  applications: IApplication[] = [];
  formType: 'opportunity' | 'company' | null = null;
  editingId: string | null = null;
  form: Record<string, unknown> = {};
  saveError = '';
  isSaving = false;
  isLoading = true;
  hasError = false;
  companyCount = 0;

  private readonly opportunityService = inject(OpportunityService);
  private readonly companyService = inject(CompanyService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly applicationService = inject(ApplicationService);

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

    this.loadCompanies();
    this.loadApplications();
  }

  loadApplications(): void {
    this.applicationService.getAll().subscribe({
      next: (response) => {
        this.applications = response.data ?? [];
        this.changeDetector.detectChanges();
      }
    });
  }

  get filteredOpportunities(): IOpportunity[] {
    const search = this.searchTerm.trim().toLowerCase();

    if (!search) {
      return this.opportunities;
    }

    return this.opportunities.filter((opportunity) => [
      opportunity.title,
      opportunity.companyName,
      opportunity.type,
      opportunity.workMode,
      opportunity.location
    ].join(' ').toLowerCase().includes(search));
  }

  loadCompanies(): void {
    this.companyService.getAll().subscribe({
      next: (companies) => {
        this.companies = companies;
        this.companyCount = companies.length;
        this.changeDetector.detectChanges();
      }
    });
  }

  get filteredCompanies(): ICompany[] {
    const search = this.companySearchTerm.trim().toLowerCase();
    return this.companies.filter((company) => !search || [company.name, company.category, company.location]
      .join(' ').toLowerCase().includes(search));
  }

  openRoles(companyName: string): number {
    return this.opportunities.filter((opportunity) => opportunity.companyName === companyName).length;
  }

  openCreate(type: 'opportunity' | 'company'): void {
    this.formType = type;
    this.editingId = null;
    this.saveError = '';
    this.form = type === 'company'
      ? { name: '', description: '', location: '', website: '' }
      : { companyId: this.companies[0]?.id ?? '', title: '', type: 'Full-time', experienceLevel: 'Entry-level', workMode: 'Remote', location: '', description: '', minSalary: 0, maxSalary: 0, applicationLink: '', deadline: '' };
  }

  openEditCompany(company: ICompany): void {
    this.formType = 'company';
    this.editingId = company.id;
    this.form = { name: company.name, description: '', location: company.location, website: '' };
  }

  openEditOpportunity(opportunity: IOpportunity): void {
    this.formType = 'opportunity';
    this.editingId = opportunity.id;
    this.form = { companyId: opportunity.companyId, title: opportunity.title, type: opportunity.type, experienceLevel: opportunity.experienceLevel, workMode: opportunity.workMode, location: opportunity.location, description: opportunity.description, minSalary: 0, maxSalary: 0, applicationLink: '', deadline: '' };
  }

  closeForm(): void {
    this.formType = null;
    this.editingId = null;
  }

  saveForm(): void {
    this.isSaving = true;
    this.saveError = '';
    const request = this.formType === 'company'
      ? (this.editingId ? this.companyService.update(this.editingId, this.form) : this.companyService.create(this.form))
      : (this.editingId ? this.opportunityService.update(this.editingId, this.opportunityPayload()) : this.opportunityService.create(this.opportunityPayload()));

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.closeForm();
        this.loadData();
      },
      error: (error) => {
        this.isSaving = false;
        this.saveError = error.error?.message ?? 'Could not save changes.';
        this.changeDetector.detectChanges();
      }
    });
  }

  deleteCompany(company: ICompany): void {
    if (!confirm(`Delete ${company.name}?`)) return;
    this.companyService.delete(company.id).subscribe({ next: () => this.loadData() });
  }

  deleteOpportunity(opportunity: IOpportunity): void {
    if (!confirm(`Delete ${opportunity.title}?`)) return;
    this.opportunityService.delete(opportunity.id).subscribe({ next: () => this.loadData() });
  }

  private opportunityPayload(): Record<string, unknown> {
    const company = this.companies.find((item) => item.id === this.form['companyId']);
    return {
      companyId: this.form['companyId'], companyName: company?.name ?? '', companyLogo: company?.logo ?? '',
      title: this.form['title'], type: this.form['type'], experienceLevel: this.form['experienceLevel'],
      workMode: this.form['workMode'], location: this.form['location'], description: this.form['description'],
      salaryRange: { min: Number(this.form['minSalary'] ?? 0), max: Number(this.form['maxSalary'] ?? 0), visible: true },
      applicationLink: this.form['applicationLink'] || 'https://example.com/apply',
      deadline: this.form['deadline'] || new Date(Date.now() + 2592000000).toISOString()
    };
  }

  private loadData(): void {
    this.loadCompanies();
    this.opportunityService.getAll().subscribe({ next: (opportunities) => { this.opportunities = opportunities; this.changeDetector.detectChanges(); } });
  }
}
