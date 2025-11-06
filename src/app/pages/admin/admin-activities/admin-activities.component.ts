import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivityService, ApiResponse } from '../../../services/activity.service';
import { Activity } from '../../../models/activity.interface';

@Component({
  selector: 'app-admin-activities',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-activities.component.html',
  styleUrl: './admin-activities.component.scss'
})
export class AdminActivitiesComponent implements OnInit {
  private activityService = inject(ActivityService);
  private fb = inject(FormBuilder);

  activities = signal<Activity[]>([]);
  loading = signal<boolean>(false);
  showModal = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  currentActivity = signal<Activity | null>(null);

  activityForm!: FormGroup;
  imageFile: File | null = null;
  galleryFiles: File[] = [];
  imagePreview: string | null = null;

  // Pagination
  currentPage = signal<number>(1);
  pageSize = signal<number>(9);
  totalPages = signal<number>(0);
  totalItems = signal<number>(0);

  // Categories
  categories = [
    'Education',
    'Health',
    'Environment',
    'Community',
    'Sports',
    'Culture',
    'Technology',
    'Other'
  ];

  ngOnInit(): void {
    this.initForm();
    this.loadActivities();
  }

  initForm(): void {
    this.activityForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      shortDescription: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      location: [''],
      author: [''],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      partners: [''],
      relatedActivities: ['']
    });
  }

  loadActivities(): void {
    this.loading.set(true);
    this.activityService.getPaginatedActivities(this.currentPage(), this.pageSize())
      .subscribe({
        next: (response: ApiResponse<Activity[]>) => {
          if (response.status === 'success') {
            this.activities.set(response.data);
            if (response.pagination) {
              this.totalPages.set(response.pagination.total_pages);
              this.totalItems.set(response.pagination.length);
            }
          }
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error loading activities:', error);
          this.loading.set(false);
        }
      });
  }

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.currentActivity.set(null);
    this.activityForm.reset();
    this.imageFile = null;
    this.galleryFiles = [];
    this.imagePreview = null;
    this.resetFileInputs();
    this.showModal.set(true);
  }

  openEditModal(activity: Activity): void {
    this.isEditMode.set(true);
    this.currentActivity.set(activity);
    
    // Réinitialiser les fichiers avant d'ouvrir le modal en mode édition
    this.imageFile = null;
    this.galleryFiles = [];
    this.resetFileInputs();
    
    this.activityForm.patchValue({
      title: activity.title,
      category: activity.category,
      shortDescription: activity.shortDescription,
      description: activity.description,
      location: activity.location || '',
      author: activity.author || '',
      date: activity.date ? new Date(activity.date) : new Date(),
      partners: activity.partners?.join(';') || '',
      relatedActivities: activity.relatedActivities?.join(';') || ''
    });

    this.imagePreview = activity.image || null;
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.activityForm.reset();
    this.imageFile = null;
    this.galleryFiles = [];
    this.imagePreview = null;
    
    // Réinitialiser les inputs de fichiers
    this.resetFileInputs();
  }

  private resetFileInputs(): void {
    const imageInput = document.getElementById('image') as HTMLInputElement;
    const galleryInput = document.getElementById('gallery') as HTMLInputElement;
    
    if (imageInput) imageInput.value = '';
    if (galleryInput) galleryInput.value = ''; 
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
      
      // Preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  onGallerySelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.galleryFiles = Array.from(input.files);
    }
  }

  onSubmit(): void {
    console.log('=== SUBMIT STARTED ===');
    console.log('Form valid:', this.activityForm.valid);
    console.log('Form value:', this.activityForm.value);
    console.log('Is Edit Mode:', this.isEditMode());
    console.log('Image File:', this.imageFile);
    console.log('Gallery Files:', this.galleryFiles);

    if (this.activityForm.invalid) {
      console.log('Form errors:', this.activityForm.errors);
      Object.keys(this.activityForm.controls).forEach(key => {
        const control = this.activityForm.get(key);
        if (control?.errors) {
          console.log(`${key} errors:`, control.errors);
        }
      });
      this.activityForm.markAllAsTouched();
      alert('Veuillez remplir tous les champs requis correctement.');
      return;
    }

    // Validate image is required for creation
    if (!this.isEditMode() && !this.imageFile) {
      alert('L\'image principale est requise pour créer une activité.');
      return;
    }

    this.loading.set(true);
    const formValue = this.activityForm.value;

    // Convert partners and relatedActivities strings to arrays
    const activityData: Partial<Activity> = {
      ...formValue,
      partners: formValue.partners ? formValue.partners.split(';').map((p: string) => p.trim()).filter((p: string) => p) : [],
      relatedActivities: formValue.relatedActivities ? formValue.relatedActivities.split(';').map((r: string) => r.trim()).filter((r: string) => r) : []
    };

    console.log('=== Activity Data ===');
    console.log(activityData);

    const formData = this.activityService.createFormData(
      activityData,
      this.imageFile || undefined,
      this.galleryFiles
    );

    // Debug: Log formData contents
    console.log('=== FormData Contents ===');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    if (this.isEditMode() && this.currentActivity()) {
      // Update
      this.activityService.updateActivity(this.currentActivity()!.slug, formData)
        .subscribe({
          next: (response) => {
            console.log('Update response:', response);
            if (response.status === 'success') {
              alert('Activité mise à jour avec succès!');
              this.loadActivities();
              this.closeModal();
            } else {
              alert(`Erreur: ${response.message || 'Réponse inattendue du serveur'}`);
            }
            this.loading.set(false);
          },
          error: (error) => {
            console.error('Error updating activity:', error);
            const errorMsg = error.error?.message || error.message || 'Erreur de connexion au serveur';
            alert(`Erreur lors de la mise à jour: ${errorMsg}`);
            this.loading.set(false);
          }
        });
    } else {
      // Create
      const apiUrl = this.activityService['apiUrl'];
      console.log('=== CREATE REQUEST ===');
      console.log('API URL:', apiUrl);
      console.log('Full endpoint:', `${apiUrl}/create`);
      
      this.activityService.createActivity(formData)
        .subscribe({
          next: (response) => {
            console.log('=== CREATE SUCCESS ===');
            console.log('Response:', response);
            if (response.status === 'success') {
              alert('Activité créée avec succès!');
              this.loadActivities();
              this.closeModal();
            } else {
              alert(`Erreur: ${response.message || 'Réponse inattendue du serveur'}`);
            }
            this.loading.set(false);
          },
          error: (error) => {
            console.error('=== CREATE ERROR ===');
            console.error('Full error object:', error);
            console.error('Status:', error.status);
            console.error('Status Text:', error.statusText);
            console.error('Error body:', error.error);
            console.error('Message:', error.message);
            console.error('URL:', error.url);
            
            let errorMsg = 'Erreur de connexion au serveur';
            if (error.error?.message) {
              errorMsg = error.error.message;
            } else if (error.status === 0) {
              errorMsg = 'Impossible de contacter le serveur. Vérifiez que l\'API est accessible à ' + apiUrl;
            } else if (error.status === 404) {
              errorMsg = 'Endpoint non trouvé (404). URL: ' + error.url;
            } else if (error.status === 422) {
              errorMsg = 'Données invalides (422). Vérifiez les champs du formulaire.';
              if (error.error?.errors) {
                console.error('Validation errors:', error.error.errors);
                errorMsg += '\n' + JSON.stringify(error.error.errors, null, 2);
              }
            } else if (error.status >= 500) {
              errorMsg = `Erreur serveur (${error.status}): ${error.statusText}`;
            }
            
            console.error('Final error message:', errorMsg);
            alert(`Erreur lors de la création: ${errorMsg}`);
            this.loading.set(false);
          }
        });
    }
  }

  deleteActivity(activity: Activity): void {
    if (confirm(`Are you sure you want to delete "${activity.title}"?`)) {
      this.loading.set(true);
      this.activityService.deleteActivity(activity.slug)
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              alert('Activity deleted successfully!');
              this.loadActivities();
            }
            this.loading.set(false);
          },
          error: (error) => {
            console.error('Error deleting activity:', error);
            alert('Error deleting activity. Please try again.');
            this.loading.set(false);
          }
        });
    }
  }

  // Pagination
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadActivities();
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadActivities();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadActivities();
    }
  }

  get pages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    
    // Show max 5 pages
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);
    
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}
