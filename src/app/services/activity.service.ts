import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Activity } from '../models/activity.interface';

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  pagination?: {
    total_pages: number;
    page: number;
    page_size: number;
    length: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/cjaco/activities`;

  // Get paginated activities
  getPaginatedActivities(page: number = 1, pageSize: number = 9): Observable<ApiResponse<Activity[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());
    return this.http.get<ApiResponse<Activity[]>>(`${this.apiUrl}/all/paginate`, { params });
  }

  // Get all activities
  getAllActivities(): Observable<ApiResponse<Activity[]>> {
    return this.http.get<ApiResponse<Activity[]>>(`${this.apiUrl}/all`);
  }

  // Get limited activities (for homepage)
  getLimitedActivities(): Observable<ApiResponse<Activity[]>> {
    return this.http.get<ApiResponse<Activity[]>>(`${this.apiUrl}/all/limit`);
  }

  // Get activity by slug
  getActivityBySlug(slug: string): Observable<ApiResponse<Activity>> {
    return this.http.get<ApiResponse<Activity>>(`${this.apiUrl}/get/${slug}`);
  }

  // Get activities by category
  getActivitiesByCategory(category: string): Observable<ApiResponse<Activity[]>> {
    return this.http.get<ApiResponse<Activity[]>>(`${this.apiUrl}/category/${category}`);
  }

  // Create activity
  createActivity(formData: FormData): Observable<ApiResponse<Activity>> {
    return this.http.post<ApiResponse<Activity>>(`${this.apiUrl}/create`, formData);
  }

  // Update activity
  updateActivity(slug: string, formData: FormData): Observable<ApiResponse<Activity>> {
    return this.http.put<ApiResponse<Activity>>(`${this.apiUrl}/update/${slug}`, formData);
  }

  // Delete activity (soft delete)
  deleteActivity(slug: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/delete/${slug}`);
  }

  // Helper method to create FormData from activity object
  createFormData(activity: Partial<Activity>, imageFile?: File, galleryFiles?: File[]): FormData {
    const formData = new FormData();

    if (activity.title) formData.append('title', activity.title);
    if (activity.category) formData.append('category', activity.category);
    if (activity.shortDescription) formData.append('shortDescription', activity.shortDescription);
    if (activity.description) formData.append('description', activity.description);
    if (activity.location) formData.append('location', activity.location);
    if (activity.author) formData.append('author', activity.author);
    
    if (activity.date) {
      const dateStr = typeof activity.date === 'string'
        ? activity.date.split('T')[0]
        : new Date(activity.date).toISOString().split('T')[0];
      formData.append('date', dateStr);
    }

    if (activity.partners && activity.partners.length > 0) {
      formData.append('partners', activity.partners.join(';'));
    }

    if (activity.relatedActivities && activity.relatedActivities.length > 0) {
      formData.append('relatedActivities', activity.relatedActivities.join(';'));
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (galleryFiles && galleryFiles.length > 0) {
      galleryFiles.forEach(file => {
        formData.append('gallery', file);
      });
    }

    return formData;
  }
}
