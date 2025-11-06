# Interface d'Administration CJACO

## Accès à l'administration

L'interface d'administration est accessible via l'URL `/admin` ou en cliquant sur le lien "Admin" dans le footer du site.

## Connexion

**Identifiants par défaut :**
- Nom d'utilisateur : `admin`
- Mot de passe : `admin123`

## Fonctionnalités

### 1. Système de Login
- Interface de connexion sécurisée
- Protection des routes administratives
- Session persistante (localStorage)

### 2. Tableau de Bord Analytics
- **Statistiques globales :**
  - Nombre total de visites
  - Nombre de pages visitées
  - Page la plus visitée

- **Tableau détaillé par page :**
  - URL de la page
  - Titre de la page
  - Nombre de visites
  - Pourcentage du trafic total
  - Date de dernière visite

### 3. Tracking Automatique
- Tracking automatique de toutes les pages visitées
- Mise à jour en temps réel des statistiques
- Stockage local des données (localStorage)

### 4. Import/Export de Données
- **Export JSON :** Téléchargement des statistiques au format JSON
- **Import JSON :** Importation de données depuis un fichier JSON
- **Validation :** Vérification de la structure des données importées

## Utilisation

1. **Accéder à l'admin :** Naviguer vers `/admin/login`
2. **Se connecter :** Utiliser les identifiants par défaut
3. **Consulter les stats :** Le tableau de bord s'affiche automatiquement
4. **Actualiser :** Cliquer sur "Actualiser" pour mettre à jour les données
5. **Exporter :** Utiliser "Exporter JSON" pour télécharger les statistiques
6. **Importer :** Sélectionner un fichier JSON et cliquer sur "Importer" pour charger des données
7. **Effacer les données :** Utiliser le bouton "Effacer les données" pour remettre à zéro
8. **Se déconnecter :** Cliquer sur "Déconnexion"

## Stockage des Données

### Solution Actuelle (Client-side)
Les données sont stockées dans le `localStorage` du navigateur. Cette solution :
- ✅ Fonctionne immédiatement sans backend
- ✅ Rapide et simple à implémenter
- ❌ Données limitées au navigateur local
- ❌ Peuvent être effacées par l'utilisateur

### Solution Recommandée (Backend)
Pour un environnement de production, vous devriez implémenter un backend API qui :
- Stocke les données dans un fichier JSON dans le dossier `public/`
- Ou utilise une base de données (MySQL, PostgreSQL, MongoDB)
- Permet l'accès multi-utilisateurs
- Assure la persistance des données

Un exemple d'API backend est fourni dans `analytics-api.service.ts`

### Format du Fichier JSON
```json
[
  {
    "page": "/",
    "title": "Accueil - CJACO",
    "visits": 45,
    "lastVisited": "2025-06-19T20:30:00.000Z"
  },
  {
    "page": "/about",
    "title": "À Propos - CJACO",
    "visits": 23,
    "lastVisited": "2025-06-19T19:45:00.000Z"
  }
]
```

## Développement

Les fichiers principaux de l'administration se trouvent dans :
- `src/app/services/auth.service.ts` - Gestion de l'authentification
- `src/app/services/analytics.service.ts` - Gestion des statistiques (localStorage)
- `src/app/services/analytics-api.service.ts` - API pour backend futur
- `src/app/guards/admin.guard.ts` - Protection des routes admin
- `src/app/pages/admin/` - Composants de l'interface admin

## Sécurité

⚠️ **Important :** Dans un environnement de production, vous devriez :
- Changer les identifiants par défaut
- Implémenter une authentification côté serveur
- Utiliser une base de données pour stocker les statistiques
- Ajouter une protection CSRF
- Implémenter un système de gestion des sessions plus robuste

## Technologies Utilisées

- Angular 19
- TypeScript
- RxJS pour la gestion des états
- LocalStorage pour la persistance des données
- CSS/SCSS pour le styling
