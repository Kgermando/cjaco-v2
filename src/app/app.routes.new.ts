import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { OrganisationComponent } from './pages/organisation/organisation.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ContactComponent } from './pages/contact/contact.component';

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
  },
  {
    path: '**',
    redirectTo: ''
  }
];
