import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface PageVisit {
  page: string;
  title: string;
  visits: number;
  lastVisited: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly STORAGE_KEY = 'page_analytics';
  private analyticsSubject = new BehaviorSubject<PageVisit[]>([]);
  public analytics$ = this.analyticsSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadAnalytics();
  }

  trackPageVisit(path: string, title: string): void {
    const analytics = this.getAnalytics();
    const existingPage = analytics.find(page => page.page === path);

    if (existingPage) {
      existingPage.visits++;
      existingPage.lastVisited = new Date();
      existingPage.title = title; // Mettre à jour le titre au cas où il aurait changé
    } else {
      analytics.push({
        page: path,
        title: title,
        visits: 1,
        lastVisited: new Date()
      });
    }

    this.saveAnalytics(analytics);
    this.analyticsSubject.next(analytics);
  }
  getAnalytics(): PageVisit[] {
    if (!this.isBrowser) {
      return [];
    }
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Convertir les dates string en objets Date
      return parsed.map((item: any) => ({
        ...item,
        lastVisited: new Date(item.lastVisited)
      }));
    }
    return [];
  }

  getTotalVisits(): number {
    return this.getAnalytics().reduce((total, page) => total + page.visits, 0);
  }

  getMostVisitedPage(): PageVisit | null {
    const analytics = this.getAnalytics();
    if (analytics.length === 0) return null;
    
    return analytics.reduce((max, page) => 
      page.visits > max.visits ? page : max
    );
  }  clearAnalytics(): void {
    if (!this.isBrowser) {
      return;
    }
    
    localStorage.removeItem(this.STORAGE_KEY);
    this.analyticsSubject.next([]);
  }

  exportAnalyticsToJson(): void {
    if (!this.isBrowser) {
      return;
    }

    const analytics = this.getAnalytics();
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Créer un lien de téléchargement
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  importAnalyticsFromJson(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.isBrowser) {
        resolve(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          
          // Valider la structure des données
          if (Array.isArray(data) && this.validateAnalyticsData(data)) {
            // Convertir les dates string en objets Date
            const validatedData = data.map(item => ({
              ...item,
              lastVisited: new Date(item.lastVisited)
            }));
            
            this.saveAnalytics(validatedData);
            this.analyticsSubject.next(validatedData);
            resolve(true);
          } else {
            reject(new Error('Format de fichier invalide'));
          }
        } catch (error) {
          reject(new Error('Erreur lors de la lecture du fichier JSON'));
        }
      };
      
      reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
      reader.readAsText(file);
    });
  }

  private validateAnalyticsData(data: any[]): boolean {
    return data.every(item => 
      typeof item.page === 'string' &&
      typeof item.title === 'string' &&
      typeof item.visits === 'number' &&
      (typeof item.lastVisited === 'string' || item.lastVisited instanceof Date)
    );
  }

  private loadAnalytics(): void {
    const analytics = this.getAnalytics();
    this.analyticsSubject.next(analytics);
  }
  private saveAnalytics(analytics: PageVisit[]): void {
    if (!this.isBrowser) {
      return;
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(analytics));
  }
}
