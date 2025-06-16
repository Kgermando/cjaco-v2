import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-organisation',
  imports: [CommonModule, RouterModule],
  templateUrl: './organisation.component.html',
  styleUrl: './organisation.component.scss'
})
export class OrganisationComponent implements OnInit {
  teamMembers = [
    {
      name: 'Dr. Mariam Konaté',
      role: 'Directrice Générale',
      image: '/assets/team/mariam-konate.jpg',
      bio: 'Docteure en développement international (Sorbonne), 22 ans d\'expérience en coopération internationale. Ancienne consultante Banque Mondiale.'
    },
    {
      name: 'Jean-Baptiste Ouédraogo',
      role: 'Directeur des Programmes',
      image: '/assets/team/jean-baptiste-ouedraogo.jpg',
      bio: 'Ingénieur agronome et expert en gestion de projets. 15 ans d\'expérience terrain en Afrique de l\'Ouest. Spécialiste en développement rural.'
    },
    {
      name: 'Isabella Rodriguez',
      role: 'Responsable Amérique Latine',
      image: '/assets/team/isabella-rodriguez.jpg',
      bio: 'Master en Relations Internationales (Sciences Po). Coordinatrice régionale basée à São Paulo. Experte en programmes environnementaux.'
    },
    {
      name: 'Dr. Amadou Diallo',
      role: 'Directeur Santé & Nutrition',
      image: '/assets/team/amadou-diallo.jpg',
      bio: 'Médecin de santé publique, ancien coordinateur OMS. Spécialiste en santé maternelle et infantile en zones rurales.'
    },
    {
      name: 'Sophie Laurent',
      role: 'Directrice Financière',
      image: '/assets/team/sophie-laurent.jpg',
      bio: 'Expert-comptable, 12 ans dans le secteur associatif. Responsable de la transparence financière et des audits externes.'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Coordinateur Innovation',
      image: '/assets/team/carlos-mendoza.jpg',
      bio: 'Ingénieur en technologies numériques. Développement de solutions tech pour l\'éducation et la santé en zones isolées.'
    }
  ];

  financialData = {
    year: 2024,
    totalBudget: '3,8M€',
    programsPercentage: 87,
    administrationPercentage: 8,
    fundraisingPercentage: 5,
    fundingSources: [
      { source: 'Subventions publiques', percentage: 45 },
      { source: 'Fondations privées', percentage: 30 },
      { source: 'Dons individuels', percentage: 20 },
      { source: 'Partenariats entreprises', percentage: 5 }
    ]
  };

  certifications = [
    {
      name: 'ISO 9001:2015',
      description: 'Système de management de la qualité',
      validUntil: '2026'
    },
    {
      name: 'Don en Confiance',
      description: 'Label de transparence financière',
      validUntil: '2025'
    },
    {
      name: 'Statut consultatif ONU',
      description: 'Conseil économique et social',
      validUntil: 'Permanent'
    }
  ];

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Notre Organisation - CJACO | Structure, Équipe et Gouvernance',
      description: 'Découvrez la structure organisationnelle de CJACO, notre équipe dirigeante et notre gouvernance. Une organisation transparente au service de nos missions.',
      keywords: 'organisation CJACO, équipe direction, gouvernance ONG, structure organisationnelle, transparence',
      type: 'article',
      url: 'https://cjaco.org/organisation'
    });
  }
}
