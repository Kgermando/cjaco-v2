import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'fs';
import { existsSync, mkdirSync } from 'fs';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

// Détecter si on est en mode développement ou production
const isProduction = process.env['NODE_ENV'] === 'production' || !serverDistFolder.includes('.angular');
const projectRoot = isProduction 
  ? resolve(serverDistFolder, '../..') 
  : resolve(serverDistFolder, '..');

const databasePath = resolve(projectRoot, 'public', 'database.json');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware pour parser le JSON
app.use(express.json());

// Interface pour les données d'analytics
interface PageVisit {
  page: string;
  title: string;
  visits: number;
  lastVisited: string;
}

interface Database {
  analytics: PageVisit[];
  lastUpdated: string | null;
}

// Fonction pour lire la base de données
async function readDatabase(): Promise<Database> {
  try {
    const data = await fs.readFile(databasePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Fichier database.json non trouvé, création d\'une nouvelle base de données');
    // Si le fichier n'existe pas, créer une structure par défaut
    const defaultDb: Database = {
      analytics: [],
      lastUpdated: null
    };
    await writeDatabase(defaultDb);
    return defaultDb;
  }
}

// Fonction pour écrire dans la base de données
async function writeDatabase(data: Database): Promise<void> {
  try {
    data.lastUpdated = new Date().toISOString();
    
    // S'assurer que le dossier public existe
    const publicDir = resolve(projectRoot, 'public');
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }
    
    await fs.writeFile(databasePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Erreur lors de l\'écriture de la base de données:', error);
    throw error;
  }
}

/**
 * API endpoints pour les analytics
 */

// Track page visit
app.post('/api/analytics/track', async (req, res) => {
  try {
    const { page, title } = req.body;
    
    if (!page || !title) {
      res.status(400).json({ error: 'Page et title sont requis' });
      return;
    }

    const db = await readDatabase();
    const timestamp = new Date().toISOString();
    
    // Trouver ou créer l'entrée
    const existingPage = db.analytics.find(item => item.page === page);
    if (existingPage) {
      existingPage.visits++;
      existingPage.lastVisited = timestamp;
      existingPage.title = title;
    } else {
      db.analytics.push({
        page,
        title,
        visits: 1,
        lastVisited: timestamp
      });
    }
    
    await writeDatabase(db);
    res.json({ success: true, message: 'Visite enregistrée' });
  } catch (error) {
    console.error('Erreur lors du tracking:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get analytics
app.get('/api/analytics/stats', async (req, res) => {
  try {
    const db = await readDatabase();
    res.json(db.analytics);
  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Clear analytics
app.delete('/api/analytics/clear', async (req, res) => {
  try {
    const db = await readDatabase();
    db.analytics = [];
    await writeDatabase(db);
    res.json({ success: true, message: 'Données effacées' });
  } catch (error) {
    console.error('Erreur lors de l\'effacement:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Export analytics
app.get('/api/analytics/export', async (req, res) => {
  try {
    const db = await readDatabase();
    const filename = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.json(db.analytics);
  } catch (error) {
    console.error('Erreur lors de l\'export:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Import analytics
app.post('/api/analytics/import', async (req, res) => {
  try {
    const importedData = req.body;
    
    // Valider la structure des données
    if (!Array.isArray(importedData)) {
      res.status(400).json({ error: 'Les données doivent être un tableau' });
      return;
    }
    
    // Valider chaque élément
    const isValid = importedData.every(item => 
      typeof item.page === 'string' &&
      typeof item.title === 'string' &&
      typeof item.visits === 'number' &&
      typeof item.lastVisited === 'string'
    );
    
    if (!isValid) {
      res.status(400).json({ error: 'Structure de données invalide' });
      return;
    }
    
    const db = await readDatabase();
    db.analytics = importedData;
    await writeDatabase(db);
    
    res.json({ success: true, message: 'Données importées avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'import:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get database info
app.get('/api/analytics/info', async (req, res) => {
  try {
    const db = await readDatabase();
    const totalVisits = db.analytics.reduce((sum, page) => sum + page.visits, 0);
    
    let mostVisitedPage: PageVisit | null = null;
    if (db.analytics.length > 0) {
      mostVisitedPage = db.analytics.reduce((max, page) => 
        page.visits > max.visits ? page : max
      );
    }
    
    res.json({
      totalPages: db.analytics.length,
      totalVisits,
      mostVisitedPage,
      lastUpdated: db.lastUpdated
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des infos:', error);
    res.status(500).json({ error: 'Erreur serveur' });  }
});

// Debug endpoint pour vérifier les chemins
app.get('/api/debug/paths', (req, res) => {
  res.json({
    serverDistFolder,
    browserDistFolder,
    projectRoot,
    databasePath,
    databaseExists: existsSync(databasePath)
  });
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
