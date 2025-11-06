import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  sidebarCollapsed = signal<boolean>(false);
  
  menuItems: MenuItem[] = [
    {
      icon: '📊',
      label: 'Tableau de bord',
      route: '/admin/dashboard'
    },
    {
      icon: '📝',
      label: 'Activités',
      route: '/admin/activities'
    },
    {
      icon: '👥',
      label: 'Utilisateurs',
      route: '/admin/users'
    },
    // Futures sections à ajouter
    // {
    //   icon: '📧',
    //   label: 'Messages',
    //   route: '/admin/messages',
    //   badge: '5'
    // },
    // {
    //   icon: '⚙️',
    //   label: 'Paramètres',
    //   route: '/admin/settings'
    // }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidebar(): void {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
