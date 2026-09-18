import { Component } from '@angular/core';

import { Header } from '../../components/header/header';
import { Welcome } from '../../components/welcome/welcome';
import { Oopertunites } from '../../components/oopertunites/oopertunites';
import { Company } from '../../components/company/company';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Welcome,
    Oopertunites,
    Company,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}