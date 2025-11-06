import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError, tap } from 'rxjs';
import { 
  Login, 
  LoginResponse, 
  RegisterInput, 
  UserResponse, 
  ApiResponse, 
  UpdateUserInput, 
  ChangePasswordInput 
} from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8000/api/auth'; // Ajustez l'URL selon votre backend
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<UserResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.checkAuthStatus();
  }
  
  // Vérifier le statut d'authentification au démarrage
  private checkAuthStatus(): void {
    if (this.isBrowser) {
      const token = this.getToken();
      if (token) {
        this.verifyToken(token).subscribe({
          next: (user) => {
            this.currentUserSubject.next(user);
            this.isAuthenticatedSubject.next(true);
          },
          error: () => {
            this.logout();
          }
        });
      }
    }
  }

  // Méthode de connexion avec le backend
  login(loginData: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, loginData)
      .pipe(
        tap(response => {
          if (response.data.token && this.isBrowser) {
            localStorage.setItem('auth_token', response.data.token);
            this.currentUserSubject.next(response.data.user);
            this.isAuthenticatedSubject.next(true);
          }
        }),
        catchError(this.handleError)
      );
  }

  // Méthode de connexion statique (pour compatibilité)
  loginStatic(username: string, password: string): Observable<boolean> {
    const loginData: Login = {
      email: username,
      password: password
    };
    
    return new Observable(observer => {
      this.login(loginData).subscribe({
        next: () => {
          observer.next(true);
          observer.complete();
        },
        error: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  // Enregistrement d'un nouvel utilisateur
  register(userData: RegisterInput): Observable<ApiResponse<UserResponse>> {
    return this.http.post<ApiResponse<UserResponse>>(`${this.API_URL}/register`, userData)
      .pipe(catchError(this.handleError));
  }

  // Vérification du token
  verifyToken(token: string): Observable<UserResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserResponse>(`${this.API_URL}/user?token=${token}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Mise à jour des informations utilisateur
  updateProfile(updateData: UpdateUserInput): Observable<ApiResponse<UserResponse>> {
    const token = this.getToken();
    return this.http.put<ApiResponse<UserResponse>>(`${this.API_URL}/profil/info?token=${token}`, updateData)
      .pipe(
        tap(response => {
          if (response.data) {
            this.currentUserSubject.next(response.data);
          }
        }),
        catchError(this.handleError)
      );
  }

  // Changement de mot de passe
  changePassword(passwordData: ChangePasswordInput): Observable<ApiResponse<any>> {
    const token = this.getToken();
    return this.http.put<ApiResponse<any>>(`${this.API_URL}/change-password?token=${token}`, {
      old_password: passwordData.oldPassword,
      password: passwordData.password,
      password_confirm: passwordData.passwordConfirm
    }).pipe(catchError(this.handleError));
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('auth_token');
    }
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    
    // Appeler l'endpoint de logout du backend
    this.http.post(`${this.API_URL}/logout`, {}).subscribe();
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): UserResponse | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private handleError(error: any) {
    console.error('Auth service error:', error);
    return throwError(() => error);
  }
}
