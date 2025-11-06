# Système de Gestion des Utilisateurs - CJACO

## Vue d'ensemble

Cette implémentation fournit un système complet de gestion des utilisateurs pour l'application CJACO, avec authentification dynamique basée sur l'API Go et une interface d'administration pour le CRUD des utilisateurs.

## Fonctionnalités Implémentées

### 1. Modèles TypeScript (`src/app/models/user.interface.ts`)
- **User**: Modèle principal utilisateur
- **UserResponse**: Réponse utilisateur (sans mot de passe)
- **UserPaginate**: Modèle pour la pagination
- **Login**: Données de connexion
- **RegisterInput**: Données d'inscription
- **ApiResponse**: Réponse générique de l'API
- **PaginationMeta**: Métadonnées de pagination
- **Enums**: UserRole et UserPermission

### 2. Service d'Authentification (`src/app/services/auth.service.ts`)

#### Méthodes principales :
- `login(loginData: Login)`: Connexion avec backend API
- `loginStatic(username, password)`: Méthode statique pour compatibilité
- `register(userData: RegisterInput)`: Inscription nouvel utilisateur
- `verifyToken(token)`: Vérification du token JWT
- `updateProfile(updateData)`: Mise à jour profil utilisateur
- `changePassword(passwordData)`: Changement mot de passe
- `logout()`: Déconnexion
- `getCurrentUser()`: Obtenir utilisateur actuel
- `getToken()`: Obtenir token d'authentification

#### Gestion des états :
- `isAuthenticated$`: Observable du statut d'authentification
- `currentUser$`: Observable de l'utilisateur actuel
- Stockage automatique du token dans localStorage
- Vérification automatique du token au démarrage

### 3. Service Utilisateurs (`src/app/services/user.service.ts`)

#### CRUD complet :
- `getAllUsers()`: Récupérer tous les utilisateurs
- `getPaginatedUsers(page, pageSize)`: Récupération avec pagination
- `getUser(id)`: Récupérer un utilisateur par ID
- `createUser(userData)`: Créer nouvel utilisateur
- `updateUser(id, userData)`: Mettre à jour utilisateur
- `deleteUser(id)`: Supprimer utilisateur

#### Fonctionnalités avancées :
- `searchUsers(searchTerm, page, pageSize)`: Recherche utilisateurs
- `toggleUserStatus(id, status)`: Activer/désactiver utilisateur
- `updateUserRole(id, role, permission)`: Mettre à jour rôle
- `getUserStats()`: Statistiques utilisateurs

### 4. Composant Admin Login (`src/app/pages/admin/admin-login/`)

#### Fonctionnalités :
- **Mode hybride** : Switch entre méthode statique et dynamique
- **Méthode statique** : Identifiants de démonstration (admin@admin.com / Admin@2025!)
- **Méthode dynamique** : Connexion via API backend
- **Interface utilisateur** : Toggle pour changer de mode
- **Gestion des erreurs** : Messages d'erreur contextuels
- **État de chargement** : Indicateur visuel de progression

### 5. Composant Admin Users (`src/app/pages/admin/admin-users/`)

#### Interface de gestion :
- **Tableau utilisateurs** : Affichage avec pagination
- **Recherche** : Recherche en temps réel
- **Tri et filtres** : Par statut, rôle, etc.
- **Actions en ligne** : Éditer, activer/désactiver, supprimer

#### Modales :
- **Création** : Formulaire complet avec validation
- **Édition** : Modification des données utilisateur
- **Suppression** : Confirmation avant suppression
- **Validation** : Validation réactive des formulaires

#### Pagination :
- **Navigation** : Précédent/Suivant + numéros de page
- **Information** : Affichage X sur Y utilisateurs
- **Taille configurable** : 15 utilisateurs par page par défaut

### 6. Navigation Admin

#### Menu sidebar :
- Ajout de l'entrée "Utilisateurs" avec icône 👥
- Route `/admin/users` configurée
- Integration dans AdminLayoutComponent

## Configuration API

### URL Backend
```typescript
// Dans auth.service.ts et user.service.ts
private readonly API_URL = 'http://localhost:8000/api/...';
```

### Endpoints utilisés :
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/auth/user` - Vérification token
- `PUT /api/auth/profil/info` - Mise à jour profil
- `PUT /api/auth/change-password` - Changement mot de passe
- `POST /api/auth/logout` - Déconnexion

- `GET /api/users/all` - Tous les utilisateurs
- `GET /api/users/all/paginate` - Utilisateurs paginés
- `GET /api/users/get/:id` - Utilisateur par ID
- `POST /api/users/create` - Créer utilisateur
- `PUT /api/users/update/:id` - Mettre à jour utilisateur
- `DELETE /api/users/delete/:id` - Supprimer utilisateur

## Utilisation

### 1. Mode Statique (Démonstration)
```
Email: admin@admin.com
Mot de passe: Admin@2025!
```

### 2. Mode Dynamique (API)
- Assurer que le backend Go est démarré sur le port 8000
- Utiliser les identifiants créés via l'API
- L'utilisateur admin par défaut est créé automatiquement

### 3. Navigation
1. Se connecter sur `/admin/login`
2. Accéder au dashboard `/admin/dashboard`
3. Naviguer vers "Utilisateurs" dans le menu sidebar
4. Gérer les utilisateurs via l'interface CRUD

## Sécurité

- **Tokens JWT** : Authentification basée sur des tokens
- **Guards** : Protection des routes admin avec AdminGuard
- **Validation** : Validation côté client et serveur
- **Hachage mot de passe** : Mots de passe hachés avec bcrypt (backend)
- **CORS** : Configuration CORS nécessaire sur le backend

## Responsive Design

L'interface est entièrement responsive avec :
- Grilles flexibles pour les formulaires
- Tableau adaptatif pour mobile
- Modales responsive
- Navigation sidebar collapsible

## Prochaines étapes

1. **Tests** : Ajouter tests unitaires et e2e
2. **Internationalisation** : Support multilingue
3. **Filtres avancés** : Filtres par date, rôle, statut
4. **Export** : Export CSV/Excel des utilisateurs
5. **Notifications** : Toast notifications pour les actions
6. **Logs** : Historique des actions utilisateur