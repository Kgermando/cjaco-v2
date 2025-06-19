# Backend API pour Analytics - CJACO

## Vue d'ensemble

Le backend API est intégré dans le serveur Angular SSR (`server.ts`) et utilise un fichier JSON (`public/database.json`) pour stocker les données d'analytics.

## Structure de la Base de Données

### Fichier: `public/database.json`
```json
{
  "analytics": [
    {
      "page": "/",
      "title": "Accueil - CJACO",
      "visits": 45,
      "lastVisited": "2025-06-19T20:30:00.000Z"
    }
  ],
  "lastUpdated": "2025-06-19T20:30:00.000Z"
}
```

## Endpoints API

### 1. Tracker une visite de page
**POST** `/api/analytics/track`

**Body:**
```json
{
  "page": "/about",
  "title": "À Propos - CJACO"
}
```

**Réponse:**
```json
{
  "success": true,
  "message": "Visite enregistrée"
}
```

### 2. Obtenir les statistiques
**GET** `/api/analytics/stats`

**Réponse:**
```json
[
  {
    "page": "/",
    "title": "Accueil - CJACO",
    "visits": 45,
    "lastVisited": "2025-06-19T20:30:00.000Z"
  }
]
```

### 3. Effacer toutes les données
**DELETE** `/api/analytics/clear`

**Réponse:**
```json
{
  "success": true,
  "message": "Données effacées"
}
```

### 4. Exporter les données
**GET** `/api/analytics/export`

Télécharge un fichier JSON avec toutes les données d'analytics.

### 5. Importer des données
**POST** `/api/analytics/import`

**Body:** Tableau de données d'analytics
```json
[
  {
    "page": "/",
    "title": "Accueil",
    "visits": 10,
    "lastVisited": "2025-06-19T20:00:00.000Z"
  }
]
```

### 6. Informations sur la base de données
**GET** `/api/analytics/info`

**Réponse:**
```json
{
  "totalPages": 6,
  "totalVisits": 137,
  "mostVisitedPage": {
    "page": "/",
    "title": "Accueil - CJACO",
    "visits": 45,
    "lastVisited": "2025-06-19T20:30:00.000Z"
  },
  "lastUpdated": "2025-06-19T20:30:00.000Z"
}
```

## Service Hybride

Le `HybridAnalyticsService` peut basculer automatiquement entre:
- **API Backend** (par défaut)
- **LocalStorage** (fallback si l'API est indisponible)

### Utilisation
```typescript
// Basculer vers localStorage
analyticsService.setUseApi(false);

// Basculer vers l'API
analyticsService.setUseApi(true);

// Obtenir le mode actuel
const info = analyticsService.getStorageInfo();
console.log(info.mode); // "API Backend" ou "LocalStorage"
```

## Avantages du Backend API

1. **Persistance des données** entre différents navigateurs/appareils
2. **Partage des données** entre plusieurs utilisateurs admin
3. **Sauvegarde automatique** dans le fichier JSON
4. **Export/Import** via l'API
5. **Fallback automatique** vers localStorage si l'API est indisponible

## Démarrage

1. **Démarrer le serveur:**
   ```bash
   npm run build
   npm run serve:ssr:cjaco
   ```

2. **Accéder à l'admin:**
   - URL: `http://localhost:4000/admin/login`
   - Identifiants: `admin` / `admin123`

3. **Tester l'API directement:**
   ```bash
   # Obtenir les stats
   curl http://localhost:4000/api/analytics/stats
   
   # Tracker une visite
   curl -X POST http://localhost:4000/api/analytics/track \
     -H "Content-Type: application/json" \
     -d '{"page":"/test","title":"Page de test"}'
   ```

## Sécurité et Production

⚠️ **Important pour la production:**

1. **Authentification API:** Ajouter des tokens d'authentification
2. **Validation des données:** Renforcer la validation côté serveur
3. **Rate limiting:** Limiter les requêtes par IP
4. **CORS:** Configurer les domaines autorisés
5. **Base de données:** Migrer vers PostgreSQL/MongoDB pour de meilleures performances
6. **Backup:** Sauvegarder régulièrement le fichier `database.json`

## Développement

### Structure des fichiers:
- `src/server.ts` - Serveur Express avec endpoints API
- `src/app/services/hybrid-analytics.service.ts` - Service Angular hybride
- `public/database.json` - Base de données JSON
- `src/app/pages/admin/` - Interface d'administration

### Logs:
Les erreurs serveur sont affichées dans la console du serveur Node.js.
