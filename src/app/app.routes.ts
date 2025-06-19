import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { OrganisationComponent } from './pages/organisation/organisation.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DonateComponent } from './pages/donate/donate.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
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
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    title: 'Administration - Tableau de bord | CJACO'
  },
  {
    path: 'admin',
    redirectTo: 'admin/dashboard'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
