import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HybridAnalyticsService } from './services/hybrid-analytics.service';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'CJACO - Organisation Non Gouvernementale';

  constructor(
    private router: Router,
    private analyticsService: HybridAnalyticsService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // Tracker les changements de route pour les analytics
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Attendre un petit délai pour que le titre soit mis à jour
        setTimeout(() => {
          const currentTitle = this.titleService.getTitle();
          this.analyticsService.trackPageVisit(event.urlAfterRedirects, currentTitle);
        }, 100);
      });
  }
}
