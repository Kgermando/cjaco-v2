import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private isBrowser: boolean;

  // Identifiants par défaut (dans un vrai projet, cela devrait être sécurisé côté serveur)
  private readonly adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Vérifier si l'utilisateur est déjà connecté
    if (this.isBrowser) {
      const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      this.isAuthenticatedSubject.next(isLoggedIn);
    }
  }
  login(username: string, password: string): boolean {
    if (username === this.adminCredentials.username && 
        password === this.adminCredentials.password) {
      if (this.isBrowser) {
        localStorage.setItem('adminLoggedIn', 'true');
      }
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('adminLoggedIn');
    }
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
