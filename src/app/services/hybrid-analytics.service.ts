import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface PageVisit {
  page: string;
  title: string;
  visits: number;
  lastVisited: Date | string;
}

@Injectable({
  providedIn: 'root'
})
export class HybridAnalyticsService {
  private readonly STORAGE_KEY = 'page_analytics';
  private readonly API_BASE_URL = '/api/analytics';
  private analyticsSubject = new BehaviorSubject<PageVisit[]>([]);
  public analytics$ = this.analyticsSubject.asObservable();
  private isBrowser: boolean;
  private useApi = true; // Toggle pour utiliser l'API ou localStorage

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadAnalytics();
  }

  // Basculer entre API et localStorage
  setUseApi(useApi: boolean): void {
    this.useApi = useApi;
    this.loadAnalytics();
  }

  trackPageVisit(path: string, title: string): void {
    if (!this.isBrowser) return;

    if (this.useApi) {
      this.trackPageVisitAPI(path, title).subscribe({
        next: () => this.loadAnalytics(),
        error: (error) => {
          console.warn('API indisponible, utilisation du localStorage', error);
          this.useApi = false;
          this.trackPageVisitLocal(path, title);
        }
      });
    } else {
      this.trackPageVisitLocal(path, title);
    }
  }

  private trackPageVisitAPI(path: string, title: string): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/track`, {
      page: path,
      title: title
    });
  }

  private trackPageVisitLocal(path: string, title: string): void {
    const analytics = this.getLocalAnalytics();
    const existingPage = analytics.find(page => page.page === path);

    if (existingPage) {
      existingPage.visits++;
      existingPage.lastVisited = new Date();
      existingPage.title = title;
    } else {
      analytics.push({
        page: path,
        title: title,
        visits: 1,
        lastVisited: new Date()
      });
    }

    this.saveLocalAnalytics(analytics);
    this.analyticsSubject.next(analytics);
  }

  loadAnalytics(): void {
    if (!this.isBrowser) return;

    if (this.useApi) {
      this.getAnalyticsAPI().subscribe({
        next: (analytics) => {
          const processedAnalytics = analytics.map(item => ({
            ...item,
            lastVisited: new Date(item.lastVisited)
          }));
          this.analyticsSubject.next(processedAnalytics);
        },
        error: (error) => {
          console.warn('API indisponible, utilisation du localStorage', error);
          this.useApi = false;
          const localAnalytics = this.getLocalAnalytics();
          this.analyticsSubject.next(localAnalytics);
        }
      });
    } else {
      const analytics = this.getLocalAnalytics();
      this.analyticsSubject.next(analytics);
    }
  }

  private getAnalyticsAPI(): Observable<PageVisit[]> {
    return this.http.get<PageVisit[]>(`${this.API_BASE_URL}/stats`);
  }

  getAnalytics(): PageVisit[] {
    return this.analyticsSubject.value;
  }

  private getLocalAnalytics(): PageVisit[] {
    if (!this.isBrowser) return [];
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
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
  }

  clearAnalytics(): Observable<any> {
    if (!this.isBrowser) return of(null);

    if (this.useApi) {
      return this.http.delete(`${this.API_BASE_URL}/clear`).pipe(
        tap(() => this.analyticsSubject.next([])),
        catchError((error) => {
          console.warn('API indisponible, effacement local', error);
          this.clearLocalAnalytics();
          return of(null);
        })
      );
    } else {
      this.clearLocalAnalytics();
      return of(null);
    }
  }

  private clearLocalAnalytics(): void {
    if (!this.isBrowser) return;
    
    localStorage.removeItem(this.STORAGE_KEY);
    this.analyticsSubject.next([]);
  }

  exportAnalyticsToJson(): void {
    if (!this.isBrowser) return;

    if (this.useApi) {
      // Télécharger depuis l'API
      window.open(`${this.API_BASE_URL}/export`, '_blank');
    } else {
      // Export local
      const analytics = this.getAnalytics();
      const dataStr = JSON.stringify(analytics, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `analytics-local-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
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
          
          if (Array.isArray(data) && this.validateAnalyticsData(data)) {
            if (this.useApi) {
              this.http.post(`${this.API_BASE_URL}/import`, data).subscribe({
                next: () => {
                  this.loadAnalytics();
                  resolve(true);
                },
                error: (error) => {
                  console.warn('Erreur API, import local', error);
                  this.importLocalData(data);
                  resolve(true);
                }
              });
            } else {
              this.importLocalData(data);
              resolve(true);
            }
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

  private importLocalData(data: any[]): void {
    const validatedData = data.map(item => ({
      ...item,
      lastVisited: new Date(item.lastVisited)
    }));
    
    this.saveLocalAnalytics(validatedData);
    this.analyticsSubject.next(validatedData);
  }

  private validateAnalyticsData(data: any[]): boolean {
    return data.every(item => 
      typeof item.page === 'string' &&
      typeof item.title === 'string' &&
      typeof item.visits === 'number' &&
      (typeof item.lastVisited === 'string' || item.lastVisited instanceof Date)
    );
  }

  private saveLocalAnalytics(analytics: PageVisit[]): void {
    if (!this.isBrowser) return;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(analytics));
  }

  // Méthode pour obtenir des infos sur le mode utilisé
  getStorageInfo(): { mode: string; available: boolean } {
    return {
      mode: this.useApi ? 'API Backend' : 'LocalStorage',
      available: this.isBrowser
    };
  }
}
