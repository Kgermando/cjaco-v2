import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { OrganisationComponent } from './pages/organisation/organisation.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ActivityViewComponent } from './pages/activities/activity-view/activity-view.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DonateComponent } from './pages/donate/donate.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminActivitiesComponent } from './pages/admin/admin-activities/admin-activities.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Accueil - CJACO | Organisation Non Gouvernementale'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'À Propos - CJACO | Notre Mission et Vision'
  },
  {
    path: 'organisation',
    component: OrganisationComponent,
    title: 'Notre Organisation - CJACO | Structure et Équipe'
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
    title: 'Nos Activités - CJACO | Programmes et Projets'
  },
  {
    path: 'activities/:slug',
    component: ActivityViewComponent,
    title: 'Détails de l\'Activité - CJACO | Informations Complètes'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact - CJACO | Nous Contacter'
  },  {
    path: 'donate',
    component: DonateComponent,
    title: 'Faire un Don - CJACO | Soutenez notre Mission'
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    title: 'Administration - Connexion | CJACO'
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        title: 'Administration - Tableau de bord | CJACO'
      },
      {
        path: 'activities',
        component: AdminActivitiesComponent,
        title: 'Administration - Gestion des Activités | CJACO'
      },
      {
        path: 'users',
        component: AdminUsersComponent,
        title: 'Administration - Gestion des Utilisateurs | CJACO'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
