import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { Company } from '../../components/company/company';
import { Header } from '../../components/header/header';
import { CompanyService } from '../../services/company-service';

@Component({
  selector: 'app-companies-page',
  imports: [Header, Company],
  styleUrl: './companies.css',
  templateUrl: './companies.html'
})
export class CompaniesPage implements OnInit {
  companyCount = 0;
  private readonly companyService = inject(CompanyService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.companyService.getAll().subscribe({
      next: (companies) => {
        this.companyCount = companies.length;
        this.changeDetector.detectChanges();
      }
    });
  }
}