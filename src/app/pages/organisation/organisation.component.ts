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
      name: 'Danny Cibangu',
      role: 'Coordonnateur National',
      image: '/assets/images/teams/danny.jpg',
      bio: 'Chercheur en économie publique et sociale avec 8 ans d\'expérience en gouvernance ONG. Spécialiste en planification financière et stratégique.'
    },
    {
      name: 'Mary Banza',
      role: 'Responsable Administratif et Financier',
      image: '/assets/images/teams/mary.jpg',
      bio: 'Financière spécialisée en micro-crédits, expérimentée des environnements multiculturels. Passionnée et rigoureuse.'
    },
    {
      name: 'Godelieve Mushiya',
      role: 'Responsable de la Communication et Relations Publiques',
      image: '/assets/images/about.png',
      bio: 'Communicologue professionnelle, attachée de presse expérimentée. Spécialiste des NTICs et réseaux sociaux.'
    },
    {
      name: 'Grâce Kashama',
      role: 'Chargée de Programme',
      image: '/assets/images/teams/grace.jpg',
      bio: 'Avocat près la cour d\'appel de Kinshasa Matete. Chercheur en droit public et consultant en matières électorales.'
    },
    {
      name: 'Melchior Kayumba',
      role: 'Coordonnateur Provincial du Kasaï-Oriental',
      image: '/assets/images/teams/melchior.jpg',
      bio: 'Ingénieur agronome expérimenté en projets ruraux. Animateur et sensibilisateur, membre fondateur du CJACO.'
    },
    {
      name: 'Smith Masela',
      role: 'Coordonnateur Provincial du Haut-Katanga',
      image: '/assets/images/teams/smith.jpeg',
      bio: 'Criminologue spécialisé en sécurité intérieure. Leader d\'opinion militant pour la justice sociale et les plus fragiles.'
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
