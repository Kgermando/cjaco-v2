# Documentation - Automatisation des Activités

## Vue d'ensemble

Le système d'activités a été automatisé pour permettre une gestion dynamique des articles basée sur l'interface `Activity`.

## Structure

### 1. Interface Activity (`src/app/models/activity.interface.ts`)

```typescript
interface Activity {
  id: string;                    // Identifiant unique
  title: string;                 // Titre de l'activité
  category: string;              // Catégorie (Gouvernance, Formation, etc.)
  shortDescription: string;      // Description courte pour la liste
  description: string;           // Description complète
  image: string;                 // Image principale
  location?: string;             // Localisation (optionnel)
  duration?: string;             // Durée du projet (optionnel)
  budget?: string;               // Budget (optionnel)
  status?: string;               // Statut (En cours, Terminé, etc.)
  objectives?: string[];         // Liste des objectifs
  achievements?: Achievement[];  // Réalisations avec métriques
  impact?: string;               // Impact du projet
  beneficiaries?: string;        // Bénéficiaires
  partners?: string[];           // Partenaires
  gallery?: string[];            // Galerie d'images
  testimonials?: Testimonial[];  // Témoignages
  relatedActivities?: string[];  // IDs des activités liées
}
```

### 2. Composants

#### `activities.component.ts`
- **Rôle** : Affiche la liste de toutes les activités
- **Source de données** : `DataService.getActivities()`
- **Fonctionnalités** :
  - Chargement dynamique des activités
  - État de chargement (spinner)
  - État vide (aucune activité)
  - Navigation vers les détails

#### `activity-view.component.ts`
- **Rôle** : Affiche les détails d'une activité spécifique
- **Source de données** : `DataService.getActivityById(id)`
- **Fonctionnalités** :
  - Affichage complet des informations
  - Galerie d'images avec modal
  - Activités liées
  - Partage sur réseaux sociaux
  - SEO optimisé

### 3. Service de données (`data.service.ts`)

```typescript
class DataService {
  // Retourne toutes les activités
  getActivities(): Activity[]
  
  // Retourne une activité spécifique par son ID
  getActivityById(id: string): Activity | undefined
}
```

## Comment ajouter une nouvelle activité

### Étape 1 : Ajouter les données dans `data.service.ts`

```typescript
getActivities(): Activity[] {
  return [
    {
      id: 'mon-nouveau-projet',
      title: 'Mon Nouveau Projet',
      category: 'Éducation',
      shortDescription: 'Description courte...',
      description: 'Description complète...',
      image: '/assets/images/projets/nouveau.jpg',
      location: 'Kinshasa, RDC',
      duration: '2024 - 2026',
      budget: '500,000 USD',
      status: 'En cours',
      objectives: [
        'Objectif 1',
        'Objectif 2',
        'Objectif 3'
      ],
      achievements: [
        {
          metric: '100',
          label: 'Bénéficiaires',
          icon: 'fas fa-users'
        }
      ],
      impact: 'Description de l\'impact...',
      beneficiaries: '500 personnes',
      partners: ['Partenaire 1', 'Partenaire 2'],
      gallery: [
        '/assets/images/projets/img1.jpg',
        '/assets/images/projets/img2.jpg'
      ],
      testimonials: [
        {
          text: 'Un témoignage inspirant...',
          author: 'Nom Prénom',
          role: 'Bénéficiaire'
        }
      ],
      relatedActivities: ['autre-projet-id']
    }
  ];
}
```

### Étape 2 : Ajouter les images

Placez vos images dans :
- `/public/assets/images/projets/` pour les images principales
- Utilisez des images optimisées (WebP recommandé)
- Résolution recommandée : 1200x800px

### Étape 3 : L'activité apparaît automatiquement

L'activité sera automatiquement :
- ✅ Listée sur la page `/activities`
- ✅ Accessible via l'URL `/activities/mon-nouveau-projet`
- ✅ Indexée par les moteurs de recherche (SEO)
- ✅ Partageable sur les réseaux sociaux

## Catégories disponibles

Les catégories courantes :
- Gouvernance
- Participation citoyenne
- Développement socio-économique
- Éducation
- Santé
- Environnement
- Agriculture

## Icônes disponibles (Font Awesome)

Pour les achievements :
- `fas fa-users` - Personnes
- `fas fa-graduation-cap` - Éducation
- `fas fa-briefcase` - Emploi
- `fas fa-building` - Infrastructure
- `fas fa-heartbeat` - Santé
- `fas fa-leaf` - Environnement
- `fas fa-dollar-sign` - Finance
- `fas fa-chart-line` - Croissance
- `fas fa-users-cog` - Communauté
- `fas fa-book` - Formation
- `fas fa-rocket` - Innovation

## Routes

- `/` - Page d'accueil (affiche les 3 dernières activités)
- `/activities` - Liste de toutes les activités
- `/activities/:id` - Détails d'une activité spécifique

## Affichage sur la page d'accueil

La page d'accueil affiche automatiquement les **3 dernières activités** de la liste. Ces activités sont chargées dynamiquement depuis le `DataService` et affichées dans la section "Actions Concrètes, Impact Réel".

### Comment ça fonctionne ?

```typescript
// Dans home.component.ts
loadRecentActivities() {
  const allActivities = this.dataService.getActivities();
  this.recentActivities = allActivities.slice(-3).reverse(); // Les 3 dernières
}
```

Les activités sont affichées en **ordre inverse** pour que la plus récente apparaisse en premier.

## Fonctionnalités futures

### Prêt pour intégration backend
Le code est structuré pour faciliter l'intégration avec une API :

```typescript
// Dans data.service.ts
getActivities(): Observable<Activity[]> {
  return this.http.get<Activity[]>('/api/activities');
}

getActivityById(id: string): Observable<Activity> {
  return this.http.get<Activity>(`/api/activities/${id}`);
}
```

### Filtrage et recherche
Possibilité d'ajouter :
- Filtrage par catégorie
- Recherche par mots-clés
- Tri par date, budget, etc.
- Pagination

### Gestion admin
Interface d'administration pour :
- Créer/Éditer/Supprimer des activités
- Gérer les images
- Publier/Dépublier des activités

## Optimisations SEO

Chaque activité bénéficie de :
- Meta tags dynamiques (title, description)
- Open Graph pour partage social
- URL SEO-friendly
- Images optimisées avec alt text
- Structure de données JSON-LD (à venir)

## Support et questions

Pour toute question ou suggestion d'amélioration, contactez l'équipe de développement.
