import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getOrganizationStats() {
    return {
      experience: '16+',
      countries: 28,
      beneficiaries: '125,000+',
      projects: '380+',
      staff: 95,
      volunteers: 450,
      partnerships: 180
    };
  }

  getMainPrograms() {
    return [
      {
        id: 'education',
        name: 'Éducation & Formation',
        description: 'Améliorer l\'accès à une éducation de qualité et développer les compétences professionnelles',
        icon: 'fas fa-graduation-cap',
        color: '#1A237E',
        stats: {
          schools: 145,
          teachers: 2400,
          students: 67000,
          countries: 15
        },
        subPrograms: [
          'Construction et rénovation d\'écoles',
          'Formation des enseignants',
          'Alphabétisation des adultes',
          'Éducation numérique',
          'Bourses d\'études',
          'Formation professionnelle'
        ]
      },
      {
        id: 'health',
        name: 'Santé & Nutrition',
        description: 'Renforcer les systèmes de santé et améliorer l\'état nutritionnel des populations',
        icon: 'fas fa-heartbeat',
        color: '#1565C0',
        stats: {
          healthCenters: 68,
          healthWorkers: 890,
          patients: 156000,
          countries: 12
        },
        subPrograms: [
          'Centres de santé communautaires',
          'Formation agents de santé',
          'Programmes de vaccination',
          'Santé maternelle et infantile',
          'Lutte contre la malnutrition',
          'Télémédecine rurale'
        ]
      },
      {
        id: 'environment',
        name: 'Environnement & Climat',
        description: 'Protéger l\'environnement et accompagner l\'adaptation au changement climatique',
        icon: 'fas fa-leaf',
        color: '#3949AB',
        stats: {
          treesPlanted: 320000,
          hectaresRestored: 15600,
          carbonOffset: '45000 tonnes',
          countries: 18
        },
        subPrograms: [
          'Reforestation et agroforesterie',
          'Gestion des déchets',
          'Énergies renouvelables',
          'Conservation de la biodiversité',
          'Adaptation climatique',
          'Éducation environnementale'
        ]
      },
      {
        id: 'agriculture',
        name: 'Agriculture Durable',
        description: 'Promouvoir des pratiques agricoles durables et la sécurité alimentaire',
        icon: 'fas fa-seedling',
        color: '#2196F3',
        stats: {
          farmers: 28500,
          cooperatives: 156,
          yieldIncrease: '+45%',
          countries: 20
        },
        subPrograms: [
          'Techniques agroécologiques',
          'Irrigation et gestion de l\'eau',
          'Banques de semences',
          'Transformation agroalimentaire',
          'Commercialisation équitable',
          'Adaptation climatique agricole'
        ]
      }
    ];
  }

  getCountriesOfIntervention() {
    return {
      'Afrique de l\'Ouest': [
        { name: 'Mali', since: 2008, programs: ['Éducation', 'Santé', 'Agriculture'], status: 'Actif' },
        { name: 'Burkina Faso', since: 2011, programs: ['Éducation', 'Agriculture', 'Environnement'], status: 'Actif' },
        { name: 'Sénégal', since: 2011, programs: ['Santé', 'Éducation'], status: 'Actif' },
        { name: 'Côte d\'Ivoire', since: 2015, programs: ['Agriculture', 'Environnement'], status: 'Actif' },
        { name: 'Niger', since: 2016, programs: ['Santé', 'Agriculture'], status: 'Actif' },
        { name: 'Guinée', since: 2018, programs: ['Éducation', 'Santé'], status: 'Actif' }
      ],
      'Afrique Centrale': [
        { name: 'République Démocratique du Congo', since: 2017, programs: ['Santé', 'Éducation'], status: 'Actif' },
        { name: 'Cameroun', since: 2019, programs: ['Agriculture', 'Environnement'], status: 'Actif' },
        { name: 'Tchad', since: 2020, programs: ['Santé', 'Agriculture'], status: 'Actif' }
      ],
      'Afrique de l\'Est': [
        { name: 'Kenya', since: 2014, programs: ['Éducation', 'Environnement'], status: 'Actif' },
        { name: 'Ouganda', since: 2016, programs: ['Santé', 'Agriculture'], status: 'Actif' },
        { name: 'Tanzanie', since: 2018, programs: ['Éducation', 'Santé'], status: 'Actif' }
      ],
      'Amérique du Sud': [
        { name: 'Brésil', since: 2022, programs: ['Environnement', 'Éducation'], status: 'Actif' },
        { name: 'Pérou', since: 2023, programs: ['Agriculture', 'Environnement'], status: 'Actif' },
        { name: 'Colombie', since: 2023, programs: ['Éducation', 'Environnement'], status: 'Actif' },
        { name: 'Équateur', since: 2024, programs: ['Environnement'], status: 'Nouveau' }
      ]
    };
  }

  getImpactStories() {
    return [
      {
        title: 'Transformation de l\'éducation au Mali',
        location: 'Région de Kayes, Mali',
        year: 2023,
        description: 'Le programme "École pour Tous" a permis la scolarisation de 3,200 enfants supplémentaires grâce à la construction de 12 nouvelles écoles et la formation de 150 enseignants.',
        impact: '89% de taux de réussite au certificat d\'études',
        testimonial: {
          text: 'Nos enfants ont maintenant accès à une éducation de qualité dans leur propre village.',
          author: 'Mamadou Traoré, Chef de village'
        },
        image: '/assets/impact/mali-education.jpg'
      },
      {
        title: 'Révolution agricole au Burkina Faso',
        location: 'Province du Yatenga, Burkina Faso',
        year: 2024,
        description: 'L\'introduction de techniques agroécologiques a permis à 300 agriculteurs d\'augmenter leurs rendements de 45% tout en préservant les sols.',
        impact: '1,800 familles sorties de l\'insécurité alimentaire',
        testimonial: {
          text: 'Grâce aux nouvelles techniques, nous nourrissons nos familles et vendons le surplus au marché.',
          author: 'Salimata Ouédraogo, Agricultrice'
        },
        image: '/assets/impact/burkina-agriculture.jpg'
      },
      {
        title: 'Reforestation en Amazonie',
        location: 'État d\'Acre, Brésil',
        year: 2024,
        description: 'Le projet de reforestation a permis de restaurer 500 hectares de forêt amazonienne avec des espèces indigènes, impliquant 50 jeunes de la communauté.',
        impact: '25,000 arbres plantés, 50 emplois créés',
        testimonial: {
          text: 'Ce projet nous a permis de réconcilier développement économique et protection de notre forêt.',
          author: 'Carlos Santos, Leader communautaire'
        },
        image: '/assets/impact/bresil-reforestation.jpg'
      }
    ];
  }

  getPartners() {
    return {
      institutional: [
        { name: 'Union Européenne', logo: '/assets/partners/eu.png', type: 'Bailleur principal' },
        { name: 'Agence Française de Développement', logo: '/assets/partners/afd.png', type: 'Financement' },
        { name: 'UNESCO', logo: '/assets/partners/unesco.png', type: 'Partenaire technique' },
        { name: 'OMS', logo: '/assets/partners/oms.png', type: 'Santé publique' },
        { name: 'UNICEF', logo: '/assets/partners/unicef.png', type: 'Protection enfance' }
      ],
      foundations: [
        { name: 'Fondation Bill & Melinda Gates', logo: '/assets/partners/gates.png', type: 'Santé globale' },
        { name: 'Fondation de France', logo: '/assets/partners/fondation-france.png', type: 'Programmes sociaux' },
        { name: 'Open Society Foundations', logo: '/assets/partners/open-society.png', type: 'Gouvernance' }
      ],
      corporate: [
        { name: 'Total Énergies Foundation', logo: '/assets/partners/total.png', type: 'Environnement' },
        { name: 'Orange Foundation', logo: '/assets/partners/orange.png', type: 'Numérique éducatif' },
        { name: 'Danone Communities', logo: '/assets/partners/danone.png', type: 'Nutrition' }
      ],
      local: [
        { name: 'Ministère Éducation Mali', type: 'Gouvernement' },
        { name: 'INERA Burkina Faso', type: 'Recherche agricole' },
        { name: 'Universidade São Paulo', type: 'Recherche environnementale' }
      ]
    };
  }

  constructor() { }
}
