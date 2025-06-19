import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  stats = [
    { number: '1759+', label: 'Bénéficiaires directs' },
    { number: '300+', label: 'Activités réalisées' },
    { number: '17+', label: 'Collaborateurs actifs' },
    { number: '3+', label: 'Représentations provinciales' },
  ];
  testimonials = [
    {
      name: 'Aminata Traoré',
      role: 'Enseignante - Programme Éducation Mali',
      content: 'Grâce à CJACO, notre école a été rénovée et équipée. Aujourd\'hui, 300 enfants de plus peuvent accéder à une éducation de qualité dans notre village.',
      image: '/assets/images/about-icon.png'
    },
    {
      name: 'Dr. Jean-Baptiste Kone',
      role: 'Médecin-Chef - Centre de Santé, Burkina Faso',
      content: 'Le partenariat avec CJACO nous a permis d\'améliorer l\'accès aux soins pour plus de 15,000 habitants de la région. Leur approche collaborative est exemplaire.',
      image: '/assets/images/about-icon.png'
    },
    {
      name: 'Fatou Diallo',
      role: 'Coopérative agricole - Sénégal',
      content: 'Nous avons multiplié par trois nos rendements grâce aux techniques modernes enseignées par CJACO. Notre coopérative emploie maintenant 45 femmes.',
      image: '/assets/images/about-icon.png'
    },
    {
      name: 'Maria Santos',
      role: 'Responsable environnement - Brésil',
      content: 'Le projet de reforestation de CJACO a permis de planter 50,000 arbres dans notre région et de former 200 jeunes aux métiers verts.',
      image: '/assets/images/about-icon.png'
    }
  ];

  recentProjects = [
    {
      title: 'École Numérique Mali',
      location: 'Région de Kayes, Mali',
      description: 'Formation de 150 enseignants aux outils numériques et équipement de 12 écoles rurales.',
      impact: '3,200 élèves bénéficiaires',
      status: 'En cours',
      image: '/assets/projects/ecole-numerique-mali.jpg'
    },
    {
      title: 'Agroécologie Burkina',
      location: 'Province du Yatenga, Burkina Faso',
      description: 'Formation de 300 agriculteurs aux techniques agroécologiques et mise en place de banques de semences.',
      impact: '1,800 familles, +40% rendements',
      status: 'Terminé',
      image: '/assets/projects/agroecologie-burkina.jpg'
    },
    {
      title: 'Reforestation Amazonie',
      location: 'État d\'Acre, Brésil',
      description: 'Plantation de 25,000 arbres indigènes et formation de 50 jeunes aux métiers de l\'environnement.',
      impact: '500 hectares restaurés',
      status: 'En cours',
      image: '/assets/projects/reforestation-amazonie.jpg'
    }
  ];

  partners = [
    { name: 'Union Européenne', logo: '/assets/partners/eu.png' },
    { name: 'AFD', logo: '/assets/partners/afd.png' },
    { name: 'UNESCO', logo: '/assets/partners/unesco.png' },
    { name: 'OMS', logo: '/assets/partners/oms.png' },
    { name: 'UNICEF', logo: '/assets/partners/unicef.png' },
    { name: 'Fondation Gates', logo: '/assets/partners/gates.png' }
  ];

  constructor(private seoService: SeoService) { }

  ngOnInit() {    this.seoService.updateSEO({
      title: 'CJACO - Construire un Avenir Durable | ONG Développement International',
      description: 'CJACO est une organisation non gouvernementale dédiée au développement durable en Afrique et Amérique latine. 16 ans d\'expérience, 28 pays, 125,000+ bénéficiaires. Éducation, santé, environnement, agriculture.',
      keywords: 'ONG, développement durable, éducation, santé, environnement, agriculture, Afrique, Amérique latine, coopération internationale, solidarité',
      type: 'website',
      url: 'https://cjaco.org',
      image: '/assets/og-image.jpg'
    });

    // Structured data for organization
    this.seoService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'NGO',
      'name': 'CJACO',
      'url': 'https://cjaco.org',
      'logo': 'https://cjaco.org/assets/logo.svg',
      'description': 'Organisation Non Gouvernementale dédiée au développement durable et à l\'amélioration des conditions de vie',
      'foundingDate': '2008',
      'areaServed': 'Global',
      'sameAs': [
        'https://facebook.com/cjaco',
        'https://twitter.com/cjaco',
        'https://linkedin.com/company/cjaco'
      ]
    });
  }
}
