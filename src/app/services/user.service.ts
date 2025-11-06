import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { 
  User, 
  UserResponse, 
  UserPaginate, 
  RegisterInput, 
  ApiResponse, 
  PaginationMeta,
  UpdateUserInput 
} from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:8000/api/users'; // Ajustez l'URL selon votre backend

  constructor(private http: HttpClient) {}

  // Obtenir tous les utilisateurs
  getAllUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.API_URL}/all`)
      .pipe(catchError(this.handleError));
  }

  // Obtenir les utilisateurs avec pagination
  getPaginatedUsers(page: number = 1, pageSize: number = 15): Observable<ApiResponse<UserPaginate[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<ApiResponse<UserPaginate[]>>(`${this.API_URL}/all/paginate`, { params })
      .pipe(catchError(this.handleError));
  }

  // Obtenir un utilisateur par ID
  getUser(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.API_URL}/get/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Créer un nouvel utilisateur
  createUser(userData: RegisterInput): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.API_URL}/create`, userData)
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour un utilisateur
  updateUser(id: number, userData: UpdateUserInput): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.API_URL}/update/${id}`, userData)
      .pipe(catchError(this.handleError));
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.API_URL}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Rechercher des utilisateurs par terme
  searchUsers(searchTerm: string, page: number = 1, pageSize: number = 15): Observable<ApiResponse<UserPaginate[]>> {
    const params = new HttpParams()
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<ApiResponse<UserPaginate[]>>(`${this.API_URL}/search`, { params })
      .pipe(catchError(this.handleError));
  }

  // Changer le statut d'un utilisateur (activer/désactiver)
  toggleUserStatus(id: number, status: boolean): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.API_URL}/update/${id}`, { status })
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour le rôle d'un utilisateur
  updateUserRole(id: number, role: string, permission?: string): Observable<ApiResponse<User>> {
    const updateData: any = { role };
    if (permission) {
      updateData.permission = permission;
    }
    
    return this.http.put<ApiResponse<User>>(`${this.API_URL}/update/${id}`, updateData)
      .pipe(catchError(this.handleError));
  }

  // Obtenir les statistiques des utilisateurs
  getUserStats(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/stats`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('User service error:', error);
    return throwError(() => error);
  }
}