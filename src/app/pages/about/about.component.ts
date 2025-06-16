import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  values = [
    {
      icon: 'fas fa-heart',
      title: 'Compassion',
      description: 'Nous agissons avec empathie et bienveillance envers toutes les communautés que nous servons.'
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Équité',
      description: 'Nous croyons en l\'égalité des chances et œuvrons pour réduire les inégalités.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Intégrité',
      description: 'Nous agissons avec transparence et honnêteté dans toutes nos actions.'
    },
    {
      icon: 'fas fa-users',
      title: 'Collaboration',
      description: 'Nous travaillons en partenariat avec les communautés et les organisations locales.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: 'Nous développons des solutions créatives pour répondre aux défis contemporains.'
    },
    {
      icon: 'fas fa-globe',
      title: 'Durabilité',
      description: 'Nous intégrons les principes du développement durable dans tous nos projets.'
    }
  ];
  timeline = [
    {
      year: '2008',
      title: 'Fondation de CJACO',
      description: 'Création de l\'organisation par un collectif de professionnels du développement international. Première mission exploratoire au Mali.'
    },
    {
      year: '2009',
      title: 'Premier programme éducatif',
      description: 'Lancement du programme "École pour Tous" au Mali, construction de 3 écoles et formation de 15 enseignants.'
    },
    {
      year: '2011',
      title: 'Expansion régionale',
      description: 'Extension des activités au Burkina Faso et au Sénégal. Création du programme de santé maternelle et infantile.'
    },
    {
      year: '2014',
      title: 'Diversification des programmes',
      description: 'Lancement des programmes environnement et agriculture durable. Partenariat avec l\'Union Européenne.'
    },
    {
      year: '2016',
      title: 'Certification internationale',
      description: 'Obtention de la certification ISO 9001 et reconnaissance par les Nations Unies. Ouverture de bureaux régionaux.'
    },
    {
      year: '2018',
      title: 'Innovation technologique',
      description: 'Développement de solutions numériques pour l\'éducation à distance et la télémédecine rurale.'
    },
    {
      year: '2020',
      title: 'Adaptation COVID-19',
      description: 'Mise en place de protocoles sanitaires et programmes d\'urgence. Formation de 500 agents de santé communautaire.'
    },
    {
      year: '2023',
      title: 'Expansion Amérique latine',
      description: 'Ouverture de programmes au Brésil, Pérou et Colombie. Focus sur la protection de l\'Amazonie.'
    },
    {
      year: '2025',
      title: 'Vision 2030',
      description: 'Stratégie décennale : atteindre 500,000 bénéficiaires directs et être neutre en carbone d\'ici 2030.'
    }
  ];

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'À Propos de CJACO - Notre Mission, Vision et Valeurs | ONG',
      description: 'Découvrez l\'histoire, la mission et les valeurs de CJACO. Depuis 2008, nous œuvrons pour le développement durable et l\'amélioration des conditions de vie des communautés.',
      keywords: 'CJACO histoire, mission ONG, valeurs humanitaires, développement durable, organisation caritative',
      type: 'article',
      url: 'https://cjaco.org/about'
    });
  }
}
