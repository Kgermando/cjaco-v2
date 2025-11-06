# Migration vers l'API Backend - Documentation

## Vue d'ensemble

Ce document détaille la migration complète des composants Angular pour utiliser l'API backend au lieu des données statiques.

## Changements effectués

### ✅ 1. Service Activity (`activity.service.ts`)

**Nouveau service créé** avec toutes les méthodes pour interagir avec l'API backend Go/Fiber:

- `getPaginatedActivities(page, pageSize)` - Récupération paginée
- `getAllActivities()` - Toutes les activités
- `getLimitedActivities()` - 3 dernières activités (homepage)
- `getActivityBySlug(slug)` - Une activité par slug
- `getActivitiesByCategory(category)` - Activités par catégorie
- `createActivity(formData)` - Créer une activité
- `updateActivity(slug, formData)` - Mettre à jour une activité
- `deleteActivity(slug)` - Supprimer une activité (soft delete)
- `createFormData(activity, imageFile, galleryFiles)` - Helper FormData

**Interface ApiResponse:**
```typescript
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  pagination?: {
    total_pages: number;
    page: number;
    page_size: number;
    length: number;
  };
}
```

### ✅ 2. Modèle Activity (`activity.interface.ts`)

**Mise à jour de l'interface** pour correspondre aux données API:

```typescript
export interface Activity {
  id: string;
  slug: string;                    // ✨ Nouveau - Clé primaire
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  location?: string;
  partners?: string[];
  gallery?: string[];
  relatedActivities?: string[];
  date?: string;
  author?: string;
  createdAt?: string;              // ✨ Nouveau
  updatedAt?: string;              // ✨ Nouveau
  deletedAt?: string;              // ✨ Nouveau
}
```

### ✅ 3. Composant Activities (`activities.component.ts`)

**Avant:**
```typescript
loadActivities() {
  setTimeout(() => {
    this.activities = this.dataService.getActivities() as Activity[];
    this.isLoading = false;
  }, 300);
}
```

**Après:**
```typescript
loadActivities() {
  this.isLoading = true;
  this.activityService.getAllActivities().subscribe({
    next: (response) => {
      if (response.status === 'success') {
        this.activities = response.data;
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error loading activities:', error);
      this.isLoading = false;
      this.activities = [];
    }
  });
}
```

**Changements:**
- ✅ Remplacement de `DataService` par `ActivityService`
- ✅ Utilisation d'Observable avec gestion des erreurs
- ✅ Appel API réel au lieu de données mock

### ✅ 4. Composant Activity View (`activity-view.component.ts`)

**Avant:**
```typescript
loadActivity(id: string) {
  setTimeout(() => {
    const activityData = this.dataService.getActivityById(id);
    this.activity = activityData as Activity;
    this.loadRelatedActivities();
  }, 300);
}

loadRelatedActivities() {
  if (this.activity?.relatedActivities) {
    this.relatedActivities = this.activity.relatedActivities
      .map((relId: string) => this.dataService.getActivityById(relId))
      .filter((act: any): act is Activity => act !== undefined);
  }
}
```

**Après:**
```typescript
loadActivity(slug: string) {
  this.isLoading = true;
  
  this.activityService.getActivityBySlug(slug).subscribe({
    next: (response) => {
      if (response.status === 'success' && response.data) {
        this.activity = response.data;
        this.loadRelatedActivities();
        this.updateSEO();
      } else {
        this.router.navigate(['/activities']);
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error loading activity:', error);
      this.router.navigate(['/activities']);
    }
  });
}

loadRelatedActivities() {
  if (this.activity?.relatedActivities && this.activity.relatedActivities.length > 0) {
    const relatedRequests = this.activity.relatedActivities.map(slug => 
      this.activityService.getActivityBySlug(slug)
    );
    
    forkJoin(relatedRequests).subscribe({
      next: (responses) => {
        this.relatedActivities = responses
          .filter(response => response.status === 'success' && response.data)
          .map(response => response.data);
      },
      error: (error) => {
        console.error('Error loading related activities:', error);
        this.relatedActivities = [];
      }
    });
  }
}
```

**Changements:**
- ✅ Remplacement de `DataService` par `ActivityService`
- ✅ Utilisation de `slug` au lieu de `id`
- ✅ Chargement parallèle des activités liées avec `forkJoin`
- ✅ Gestion des erreurs avec redirection
- ✅ Import de `forkJoin` depuis RxJS

### ✅ 5. Composant Home (`home.component.ts`)

**Avant:**
```typescript
loadRecentActivities() {
  const allActivities = this.dataService.getActivities();
  this.recentActivities = allActivities.slice(-3).reverse();
}
```

**Après:**
```typescript
loadRecentActivities() {
  this.activityService.getLimitedActivities().subscribe({
    next: (response) => {
      if (response.status === 'success') {
        this.recentActivities = response.data;
      }
    },
    error: (error) => {
      console.error('Error loading recent activities:', error);
      this.recentActivities = [];
    }
  });
}
```

**Changements:**
- ✅ Remplacement de `DataService` par `ActivityService`
- ✅ Utilisation de l'endpoint `/all/limit` qui retourne déjà les 3 dernières
- ✅ Gestion des erreurs

### ✅ 6. Dashboard Admin Activities

**Nouveau composant créé** avec CRUD complet:
- `/admin/activities` - Route protégée par `AdminGuard`
- Interface complète pour gérer les activités
- Upload d'images vers Backblaze B2
- Pagination
- Formulaires de création/édition

## Architecture API

### Endpoints utilisés

```
Backend API: https://api.cjaco.org/v1

GET    /api/cjaco/activities/all/paginate?page=1&page_size=9
GET    /api/cjaco/activities/all
GET    /api/cjaco/activities/all/limit
GET    /api/cjaco/activities/get/:slug
GET    /api/cjaco/activities/category/:category
POST   /api/cjaco/activities/create
PUT    /api/cjaco/activities/update/:slug
DELETE /api/cjaco/activities/delete/:slug
```

### Configuration

```typescript
// src/environments/environment.ts
export const environment = {
  product: true,
  apiUrl: 'https://api.cjaco.org/v1'
};
```

## Gestion des erreurs

Chaque composant gère les erreurs de manière appropriée:

1. **Activities Component**: Affiche un tableau vide en cas d'erreur
2. **Activity View**: Redirige vers la liste des activités
3. **Home Component**: Affiche un tableau vide (pas de crash de la page)
4. **Admin Dashboard**: Affiche des messages d'erreur utilisateur

## Avantages de la migration

### ✅ Données en temps réel
- Les activités sont chargées depuis la base de données
- Mises à jour immédiates après création/modification/suppression

### ✅ Évolutivité
- Pagination côté serveur
- Gestion de gros volumes de données
- Recherche et filtrage performants

### ✅ Sécurité
- Upload sécurisé vers Backblaze B2
- Soft delete (données conservées)
- Validation côté serveur

### ✅ Performance
- Chargement optimisé avec pagination
- Images servies depuis CDN (Backblaze)
- Requêtes parallèles avec forkJoin

### ✅ Flexibilité
- Facile d'ajouter de nouveaux endpoints
- Gestion des erreurs robuste
- Type-safety avec TypeScript

## Tests recommandés

### Tests unitaires
```bash
ng test
```

### Tests de composants
1. ✅ Activities - Chargement de la liste
2. ✅ Activity View - Affichage d'une activité
3. ✅ Home - Affichage des 3 dernières
4. ✅ Admin Dashboard - CRUD complet

### Tests d'intégration
1. ✅ Création d'activité avec images
2. ✅ Modification d'activité existante
3. ✅ Suppression d'activité
4. ✅ Chargement des activités liées

### Tests E2E (recommandé)
```bash
ng e2e
```

## Prochaines étapes (optionnel)

### 1. Cache et optimisation
- Ajouter un cache pour les activités
- Implémenter infinite scroll
- Lazy loading des images

### 2. Recherche avancée
- Barre de recherche
- Filtres par catégorie
- Tri personnalisé

### 3. Analytics
- Tracking des vues par activité
- Statistiques dans l'admin
- Activités les plus populaires

### 4. Internationalization
- Support multilingue
- Traductions des activités
- Détection de langue

### 5. Notifications
- Toast notifications au lieu d'alert()
- Messages de succès/erreur élégants
- Confirmations modales

## Support et dépannage

### Erreur CORS
Vérifier la configuration du backend:
```go
app.Use(cors.New(cors.Config{
    AllowOrigins: "http://localhost:4200, https://cjaco.org",
    AllowMethods: "GET,POST,PUT,DELETE",
    AllowHeaders: "Origin, Content-Type, Accept",
}))
```

### Images non chargées
1. Vérifier les credentials Backblaze B2
2. Vérifier les permissions du bucket
3. Vérifier les URLs dans les réponses API

### Activités non affichées
1. Vérifier la connexion API
2. Vérifier les logs backend
3. Vérifier la console navigateur
4. Vérifier que les données existent en DB

## Rollback (si nécessaire)

En cas de problème, vous pouvez restaurer `DataService`:

1. Réactiver les méthodes commentées dans `data.service.ts`
2. Remplacer `ActivityService` par `DataService` dans les composants
3. Ajuster les méthodes pour retourner des données synchrones

## Conclusion

✅ **Migration complète réussie!**

Tous les composants utilisent maintenant l'API backend pour:
- Afficher les activités
- Créer de nouvelles activités
- Modifier des activités existantes
- Supprimer des activités
- Gérer les images via Backblaze B2

Le système est maintenant **entièrement dynamique** et prêt pour la production! 🚀
