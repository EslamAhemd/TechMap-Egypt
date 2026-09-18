import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Welcome } from '../../components/welcome/welcome';
import { Oopertunites } from '../../components/oopertunites/oopertunites';
import { Company } from '../../components/company/company';
import { ReviewsComponent } from '../../components/reviews/reviews';
import { ReportsComponent } from '../../components/reports/reports';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Footer,
    Welcome,
    Oopertunites,
    Company,
    ReviewsComponent,
    ReportsComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}