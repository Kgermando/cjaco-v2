import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { 
  User, 
  UserPaginate, 
  RegisterInput, 
  UpdateUserInput, 
  UserRole, 
  UserPermission,
  PaginationMeta 
} from '../../../models/user.interface';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: UserPaginate[] = [];
  loading = false;
  error = '';
  
  // Pagination
  currentPage = 1;
  pageSize = 15;
  totalPages = 0;
  totalUsers = 0;
  
  // Search
  searchTerm = '';
  
  // Modal states
  showCreateModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedUser: User | null = null;
  
  // Forms
  createForm: FormGroup;
  editForm: FormGroup;
  
  // Enums pour les templates
  userRoles = Object.values(UserRole);
  userPermissions = Object.values(UserPermission);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.initializeCreateForm();
    this.editForm = this.initializeEditForm();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private initializeCreateForm(): FormGroup {
    return this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      title: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
      role: [UserRole.USER, Validators.required],
      permission: [UserPermission.READ, Validators.required],
      status: [true],
      entreprise: ['cjaco', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private initializeEditForm(): FormGroup {
    return this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      title: [''],
      role: ['', Validators.required],
      permission: ['', Validators.required],
      status: [true],
      entreprise: ['', Validators.required]
    });
  }

  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password');
    const passwordConfirm = group.get('passwordConfirm');
    return password && passwordConfirm && password.value === passwordConfirm.value 
      ? null : { passwordMismatch: true };
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';
    
    this.userService.getPaginatedUsers(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.users = response.data;
        if (response.pagination) {
          this.totalPages = response.pagination.total_pages;
          this.totalUsers = response.pagination.length;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des utilisateurs';
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.userService.searchUsers(this.searchTerm, this.currentPage, this.pageSize).subscribe({
        next: (response) => {
          this.users = response.data;
          if (response.pagination) {
            this.totalPages = response.pagination.total_pages;
            this.totalUsers = response.pagination.length;
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors de la recherche';
          console.error('Error searching users:', error);
          this.loading = false;
        }
      });
    } else {
      this.loadUsers();
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
    }
  }

  openCreateModal(): void {
    this.createForm.reset();
    this.createForm.patchValue({
      role: UserRole.USER,
      permission: UserPermission.READ,
      status: true,
      entreprise: 'cjaco'
    });
    this.showCreateModal = true;
  }

  openEditModal(user: UserPaginate): void {
    this.selectedUser = user;
    this.editForm.patchValue({
      fullname: user.fullname,
      email: user.email,
      phone: user.phone || '',
      title: user.title || '',
      role: user.role,
      permission: user.permission,
      status: user.status,
      entreprise: user.entreprise
    });
    this.showEditModal = true;
  }

  openDeleteModal(user: UserPaginate): void {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  closeModals(): void {
    this.showCreateModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.selectedUser = null;
  }

  onCreateSubmit(): void {
    if (this.createForm.valid) {
      this.loading = true;
      const userData: RegisterInput = this.createForm.value;
      
      this.userService.createUser(userData).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          this.loadUsers();
          this.closeModals();
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'Erreur lors de la création de l\'utilisateur';
          console.error('Error creating user:', error);
          this.loading = false;
        }
      });
    }
  }

  onEditSubmit(): void {
    if (this.editForm.valid && this.selectedUser?.id) {
      this.loading = true;
      const updateData: UpdateUserInput = this.editForm.value;
      
      this.userService.updateUser(this.selectedUser.id, updateData).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          this.loadUsers();
          this.closeModals();
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'Erreur lors de la mise à jour de l\'utilisateur';
          console.error('Error updating user:', error);
          this.loading = false;
        }
      });
    }
  }

  onDeleteConfirm(): void {
    if (this.selectedUser?.id) {
      this.loading = true;
      
      this.userService.deleteUser(this.selectedUser.id).subscribe({
        next: (response) => {
          console.log('User deleted successfully:', response);
          this.loadUsers();
          this.closeModals();
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'Erreur lors de la suppression de l\'utilisateur';
          console.error('Error deleting user:', error);
          this.loading = false;
        }
      });
    }
  }

  toggleUserStatus(user: UserPaginate): void {
    if (user.id) {
      this.userService.toggleUserStatus(user.id, !user.status).subscribe({
        next: (response) => {
          console.log('User status updated:', response);
          this.loadUsers();
        },
        error: (error) => {
          this.error = error.error?.message || 'Erreur lors du changement de statut';
          console.error('Error toggling user status:', error);
        }
      });
    }
  }

  getStatusBadgeClass(status: boolean): string {
    return status ? 'badge-success' : 'badge-danger';
  }

  getStatusText(status: boolean): string {
    return status ? 'Actif' : 'Inactif';
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'badge-admin';
      case UserRole.MODERATOR:
        return 'badge-moderator';
      default:
        return 'badge-user';
    }
  }

  // Méthode helper pour la pagination
  getDisplayedUsersCount(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalUsers);
  }

  getStartIndex(): number {
    return ((this.currentPage - 1) * this.pageSize) + 1;
  }
}