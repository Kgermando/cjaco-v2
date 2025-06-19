import { Injectable } from '@angular/core';
import { HybridAnalyticsService } from './hybrid-analytics.service';

@Injectable({
  providedIn: 'root'
})
export class DemoDataService {

  constructor(private analyticsService: HybridAnalyticsService) {}

  generateDemoData(): void {
    // Simuler des visites sur différentes pages
    const demoVisits = [
      { path: '/', title: 'Accueil - CJACO | Organisation Non Gouvernementale', visits: 45 },
      { path: '/about', title: 'À Propos - CJACO | Notre Mission et Vision', visits: 23 },
      { path: '/organisation', title: 'Notre Organisation - CJACO | Structure et Équipe', visits: 18 },
      { path: '/activities', title: 'Nos Activités - CJACO | Programmes et Projets', visits: 31 },
      { path: '/contact', title: 'Contact - CJACO | Nous Contacter', visits: 12 },
      { path: '/donate', title: 'Faire un Don - CJACO | Soutenez notre Mission', visits: 8 }
    ];

    // Ajouter les visites de façon réaliste avec des intervalles
    demoVisits.forEach((visit, index) => {
      for (let i = 0; i < visit.visits; i++) {
        // Simuler des visites sur les derniers jours
        setTimeout(() => {
          this.analyticsService.trackPageVisit(visit.path, visit.title);
        }, index * 50 + i * 10);
      }
    });
  }
  clearDemoData(): void {
    this.analyticsService.clearAnalytics().subscribe({
      next: () => {
        console.log('Données de démonstration effacées');
      },
      error: (error) => {
        console.error('Erreur lors de l\'effacement:', error);
      }
    });
  }
}
