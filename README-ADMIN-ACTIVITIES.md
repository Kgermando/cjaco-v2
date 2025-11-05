# Admin Activities Dashboard - Documentation

## Vue d'ensemble

Ce module permet la gestion complète (CRUD) des activités via un dashboard d'administration Angular connecté à l'API backend Go (Fiber).

## Structure du projet

```
src/app/
├── models/
│   └── activity.interface.ts          # Interface TypeScript pour Activity
├── services/
│   └── activity.service.ts            # Service pour interagir avec l'API
├── pages/
│   └── admin/
│       └── admin-activities/
│           ├── admin-activities.component.ts      # Logique du composant
│           ├── admin-activities.component.html    # Template
│           └── admin-activities.component.scss    # Styles
└── app.routes.ts                      # Configuration des routes
```

## Fonctionnalités implémentées

### 1. Service Activity (activity.service.ts)

Le service fournit toutes les méthodes nécessaires pour interagir avec l'API backend:

- **getPaginatedActivities(page, pageSize)**: Récupère les activités avec pagination
- **getAllActivities()**: Récupère toutes les activités
- **getLimitedActivities()**: Récupère les 3 dernières activités (pour la page d'accueil)
- **getActivityBySlug(slug)**: Récupère une activité par son slug
- **getActivitiesByCategory(category)**: Récupère les activités d'une catégorie
- **createActivity(formData)**: Crée une nouvelle activité
- **updateActivity(slug, formData)**: Met à jour une activité existante
- **deleteActivity(slug)**: Supprime une activité (soft delete)
- **createFormData(activity, imageFile, galleryFiles)**: Helper pour créer FormData

### 2. Composant Admin Activities

#### Fonctionnalités principales:

- **Liste paginée** des activités avec aperçu
- **Création** d'activités avec formulaire modal
- **Modification** d'activités existantes
- **Suppression** d'activités avec confirmation
- **Upload d'images** (image principale + galerie)
- **Prévisualisation** des images avant upload
- **Validation** des formulaires
- **Pagination** avec navigation

#### Champs du formulaire:

- **Requis:**
  - Titre (min. 3 caractères)
  - Catégorie (liste prédéfinie)
  - Description courte (min. 10 caractères)
  - Description complète (min. 50 caractères)
  - Image principale (uniquement à la création)

- **Optionnels:**
  - Date de l'activité
  - Lieu
  - Auteur
  - Partenaires (séparés par ";")
  - Activités liées (slugs séparés par ";")
  - Galerie d'images (multiple)

### 3. Interface Activity

```typescript
export interface Activity {
  id: string;
  slug: string;                    // Clé primaire (généré automatiquement)
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;                   // URL Backblaze B2
  location?: string;
  partners?: string[];
  gallery?: string[];              // URLs Backblaze B2
  relatedActivities?: string[];    // Liste de slugs
  date?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
```

### 4. Routes

```typescript
// Route publique - Accessible sans authentification
/admin/login                    // Page de connexion

// Routes protégées - Nécessite authentification (AdminGuard)
/admin/dashboard                // Tableau de bord principal
/admin/activities               // Gestion des activités (CRUD)
```

## Configuration API

L'URL de l'API est configurée dans:
```typescript
// src/environments/environment.ts
export const environment = {
  product: true,
  apiUrl: 'https://api.cjaco.org/v1'
};
```

### Endpoints API utilisés:

```
GET    /api/cjaco/activities/all/paginate?page=1&page_size=9
GET    /api/cjaco/activities/all
GET    /api/cjaco/activities/all/limit
GET    /api/cjaco/activities/get/:slug
GET    /api/cjaco/activities/category/:category
POST   /api/cjaco/activities/create
PUT    /api/cjaco/activities/update/:slug
DELETE /api/cjaco/activities/delete/:slug
```

## Utilisation

### Accéder au dashboard

1. Connectez-vous à l'administration: `/admin/login`
2. Une fois authentifié, cliquez sur "Gérer les activités" ou allez à `/admin/activities`

### Créer une activité

1. Cliquez sur "+ Créer une activité"
2. Remplissez le formulaire (champs obligatoires marqués par *)
3. Uploadez une image principale (obligatoire)
4. Optionnel: Ajoutez des images à la galerie
5. Cliquez sur "Créer"

### Modifier une activité

1. Cliquez sur l'icône "crayon" sur l'activité à modifier
2. Modifiez les champs souhaités
3. Optionnel: Changez l'image principale ou ajoutez des images à la galerie
4. Cliquez sur "Mettre à jour"

### Supprimer une activité

1. Cliquez sur l'icône "corbeille"
2. Confirmez la suppression
3. L'activité sera soft-deleted (marquée comme supprimée mais conservée en base)

## Fonctionnalités du tableau

- **Tri**: Les activités sont triées par date de mise à jour (plus récentes en premier)
- **Pagination**: Navigation par page avec 9 activités par page
- **Recherche visuelle**: Aperçu de l'image, titre et description courte
- **Badge catégorie**: Affichage visuel de la catégorie
- **Actions rapides**: Édition et suppression accessibles directement

## Gestion des images

Les images sont uploadées vers **Backblaze B2** via l'API backend. Le service génère automatiquement:
- Des noms de fichiers uniques
- Des URLs de téléchargement publiques
- La gestion des erreurs d'upload

### Format supporté:
- Tous les formats image (`image/*`)
- Multiples fichiers pour la galerie

## Validation

### Côté frontend (Angular):
- Validation des champs requis
- Validation de longueur minimale
- Affichage des erreurs en temps réel

### Côté backend (Go):
- Validation des champs requis
- Vérification de l'unicité du slug
- Validation des fichiers uploadés
- Authentification des requêtes (à implémenter)

## Responsive Design

Le dashboard est entièrement responsive:
- **Desktop** (> 1024px): Vue tableau complète
- **Tablet** (768-1024px): Vue tableau optimisée
- **Mobile** (< 768px): Vue carte empilée

## Améliorations futures suggérées

1. **Authentification**:
   - Ajouter JWT token dans les headers
   - Middleware d'authentification côté API

2. **Recherche et filtres**:
   - Recherche par titre/description
   - Filtrage par catégorie
   - Tri personnalisé

3. **Éditeur riche**:
   - Remplacer textarea par éditeur WYSIWYG
   - Support Markdown ou HTML

4. **Prévisualisation**:
   - Prévisualiser l'activité avant publication
   - Mode brouillon

5. **Optimisation images**:
   - Compression automatique
   - Redimensionnement côté client
   - Formats WebP

6. **Analytics**:
   - Statistiques par activité
   - Vues, likes, partages

7. **Drag & drop**:
   - Upload d'images par drag & drop
   - Réorganisation de la galerie

8. **Notifications**:
   - Toast notifications au lieu d'alert()
   - Feedback visuel amélioré

## Dépannage

### Erreur CORS
Si vous rencontrez des erreurs CORS, vérifiez la configuration du backend:
```go
app.Use(cors.New(cors.Config{
    AllowOrigins: "http://localhost:4200, https://cjaco.org",
    AllowMethods: "GET,POST,PUT,DELETE",
    AllowHeaders: "Origin, Content-Type, Accept",
}))
```

### Images non chargées
Vérifiez:
1. Les credentials Backblaze B2 dans l'API
2. Les permissions du bucket
3. Les URLs générées dans la réponse API

### Pagination ne fonctionne pas
Assurez-vous que l'API retourne bien l'objet `pagination` dans la réponse.

## Support

Pour toute question ou problème:
1. Vérifiez les logs du navigateur (Console)
2. Vérifiez les logs de l'API backend
3. Consultez la documentation de l'API

## Licence

Ce projet fait partie du système CJACO.
