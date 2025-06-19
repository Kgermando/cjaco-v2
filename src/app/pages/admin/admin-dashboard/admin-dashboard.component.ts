import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { HybridAnalyticsService, PageVisit } from '../../../services/hybrid-analytics.service';
import { DemoDataService } from '../../../services/demo-data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  pageVisits: PageVisit[] = [];
  totalVisits = 0;
  mostVisitedPage: PageVisit | null = null;
  private subscription = new Subscription();
  selectedFile: File | null = null;
  storageInfo: { mode: string; available: boolean } = { mode: 'Unknown', available: false };

  constructor(
    private authService: AuthService,
    private analyticsService: HybridAnalyticsService,
    private demoDataService: DemoDataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadAnalytics();
    this.storageInfo = this.analyticsService.getStorageInfo();
    
    // S'abonner aux changements d'analytics
    this.subscription.add(
      this.analyticsService.analytics$.subscribe((analytics: PageVisit[]) => {
        this.pageVisits = analytics.sort((a: PageVisit, b: PageVisit) => b.visits - a.visits);
        this.totalVisits = this.analyticsService.getTotalVisits();
        this.mostVisitedPage = this.analyticsService.getMostVisitedPage();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  loadAnalytics(): void {
    this.pageVisits = this.analyticsService.getAnalytics().sort((a: PageVisit, b: PageVisit) => b.visits - a.visits);
    this.totalVisits = this.analyticsService.getTotalVisits();
    this.mostVisitedPage = this.analyticsService.getMostVisitedPage();
    this.analyticsService.loadAnalytics();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
  clearAnalytics(): void {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les statistiques ?')) {
      this.analyticsService.clearAnalytics().subscribe({
        next: () => {
          console.log('Données effacées avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de l\'effacement:', error);
        }
      });
    }
  }

  toggleStorageMode(): void {
    this.analyticsService.setUseApi(!this.storageInfo.mode.includes('API'));
    this.storageInfo = this.analyticsService.getStorageInfo();
    this.loadAnalytics();
  }

  getVisitPercentage(visits: number): number {
    return this.totalVisits > 0 ? (visits / this.totalVisits) * 100 : 0;
  }
  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  }

  getPageIcon(page: string): string {
    const icons: { [key: string]: string } = {
      '/': '🏠',
      '/about': 'ℹ️',
      '/organisation': '👥',
      '/activities': '📋',
      '/contact': '📞',
      '/donate': '💝'
    };
    return icons[page] || '📄';
  }  refresh(): void {
    this.loadAnalytics();
  }
  generateDemoData(): void {
    this.demoDataService.generateDemoData();
  }

  exportData(): void {
    this.analyticsService.exportAnalyticsToJson();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      this.selectedFile = file;
    } else {
      alert('Veuillez sélectionner un fichier JSON valide');
      event.target.value = '';
    }
  }

  async importData(): Promise<void> {
    if (!this.selectedFile) {
      alert('Veuillez sélectionner un fichier d\'abord');
      return;
    }

    try {
      const success = await this.analyticsService.importAnalyticsFromJson(this.selectedFile);
      if (success) {
        alert('Données importées avec succès !');
        this.selectedFile = null;
        // Réinitialiser l'input file
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }
    } catch (error) {
      alert('Erreur lors de l\'importation : ' + (error as Error).message);
    }
  }

  trackByPage(index: number, page: PageVisit): string {
    return page.page;
  }
}
