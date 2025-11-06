import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Login } from '../../../models/user.interface';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  email = '';
  password = '';
  entreprise = '';
  errorMessage = '';
  isLoading = false;
  useStaticLogin = true; // Toggle pour tester méthode statique ou dynamique

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Si déjà connecté, rediriger vers le dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.useStaticLogin) {
      // Méthode statique avec identifiants par défaut
      this.loginStatic();
    } else {
      // Méthode dynamique avec backend
      this.loginDynamic();
    }
  }

  private loginStatic(): void {
    // Simulation avec identifiants statiques (admin/admin123)
    setTimeout(() => {
      if (this.email === 'admin@admin.com' && this.password === 'Admin@2025!') {
        // Simuler une réponse de connexion réussie
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage = 'Identifiants incorrects (utilisez admin@admin.com / Admin@2025!)';
      }
      this.isLoading = false;
    }, 1000);
  }

  private loginDynamic(): void {
    const loginData: Login = {
      email: this.email,
      password: this.password,
      entreprise: this.entreprise || 'cjaco'
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        this.router.navigate(['/admin/dashboard']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
        this.errorMessage = error.error?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
        this.isLoading = false;
      }
    });
  }

  toggleLoginMethod(): void {
    this.useStaticLogin = !this.useStaticLogin;
    this.errorMessage = '';
    this.email = '';
    this.password = '';
    this.entreprise = '';
  }
}
