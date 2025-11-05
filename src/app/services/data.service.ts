import { Injectable } from '@angular/core';
import { Activity } from '../models/activity.interface';

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

  // getActivities(): Activity[] {
  //   return [
  //     {
  //       id: 'participation-autochtones',
  //       title: 'Participation des populations autochtones',
  //       category: 'Gouvernance',
  //       shortDescription: 'Des communautés d\'exclus sont sensibilisées et participent au processus de gouvernance par leurs votes.',
  //       description: 'Ce projet vise à renforcer la participation citoyenne des populations autochtones marginalisées dans les processus démocratiques. À travers des campagnes de sensibilisation et d\'éducation civique, nous permettons à ces communautés de comprendre leurs droits et de participer activement aux élections et aux processus de gouvernance locale. Plus de 12,500 personnes ont été sensibilisées et 85% d\'entre elles ont participé aux dernières élections locales, contre seulement 35% précédemment.',
  //       image: '/assets/images/projets/p1.jpg',
  //       location: 'Kasaï, République Démocratique du Congo',
  //       partners: ['Union Européenne', 'PNUD', 'Gouvernement Provincial du Kasaï'],
  //       gallery: [
  //         '/assets/images/projets/p1.jpg',
  //         '/assets/images/projets/p2.jpg',
  //         '/assets/images/about.png'
  //       ],
  //       relatedActivities: ['formation-gouvernance', 'plaidoyer-economique'],
  //       date: '2022-01-15',
  //       author: 'CJACO Team'
  //     },
  //     {
  //       id: 'formation-gouvernance',
  //       title: 'Formation à la gouvernance décentralisée',
  //       category: 'Participation citoyenne',
  //       shortDescription: 'Des jeunes comprennent et discutent activement de la gouvernance des entités décentralisées, donc leurs communautés directes.',
  //       description: 'Programme complet de formation destiné aux jeunes pour comprendre et participer aux mécanismes de gouvernance décentralisée. Ce projet permet aux jeunes de s\'approprier les enjeux de développement de leurs communautés et de devenir des acteurs du changement au niveau local. 420 jeunes ont été formés et 12 clubs de gouvernance ont été créés dans les établissements d\'enseignement, touchant plus de 2,000 étudiants.',
  //       image: '/assets/images/projets/p2.jpg',
  //       location: 'Kinshasa et provinces, RDC',
  //       partners: ['UNESCO', 'Ministère de la Jeunesse', 'Open Society Foundations'],
  //       gallery: [
  //         '/assets/images/projets/p2.jpg',
  //         '/assets/images/projets/p1.jpg',
  //         '/assets/images/about.png'
  //       ],
  //       relatedActivities: ['participation-autochtones', 'plaidoyer-economique'],
  //       date: '2023-03-20',
  //       author: 'CJACO Team'
  //     },
  //     {
  //       id: 'plaidoyer-economique',
  //       title: 'Plaidoyer pour les initiatives économiques privées',
  //       category: 'Développement socio-économique',
  //       shortDescription: 'Un plaidoyer pour le développement des initiatives économiques privées est lancé et des contacts sont établis avec l\'autorité publique pour la matérialisation des dispositions.',
  //       description: 'Initiative de plaidoyer visant à créer un environnement favorable au développement des petites et moyennes entreprises. Ce projet travaille avec les autorités publiques pour simplifier les procédures administratives, faciliter l\'accès au financement et créer des opportunités d\'entrepreneuriat pour les jeunes et les femmes. 3 réformes réglementaires importantes ont été adoptées. 780 entrepreneurs ont été formés et 145 startups accompagnées, créant plus de 600 emplois.',
  //       image: '/assets/images/about.png',
  //       location: 'Kinshasa et villes principales, RDC',
  //       partners: ['Agence Française de Développement', 'Ministère des PME', 'Banque Mondiale', 'Chambre de Commerce'],
  //       gallery: [
  //         '/assets/images/about.png',
  //         '/assets/images/projets/p1.jpg',
  //         '/assets/images/projets/p2.jpg'
  //       ],
  //       relatedActivities: ['formation-gouvernance', 'participation-autochtones'],
  //       date: '2023-06-10',
  //       author: 'CJACO Team'
  //     }
  //   ];
  // }

  // getActivityById(id: string) {
  //   const activities = this.getActivities();
  //   // Chercher d'abord par ID, puis par titre
  //   return activities.find(activity => 
  //     activity.id === id || activity.title === id
  //   );
  // }

  constructor() { }
}
