import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Welcome } from './components/welcome/welcome';
import { Oopertunites } from './components/oopertunites/oopertunites';
import { Company } from './components/company/company';

@Component({
  imports: [Header, Footer, Welcome,Oopertunites,Company,RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}

