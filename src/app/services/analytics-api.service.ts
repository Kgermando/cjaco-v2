import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageVisit } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsApiService {
  private readonly API_BASE_URL = '/api/analytics'; // URL de votre future API

  constructor(private http: HttpClient) {}

  /**
   * Envoie une visite de page au serveur
   */
  trackPageVisit(path: string, title: string): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/track`, {
      page: path,
      title: title,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Récupère toutes les statistiques depuis le serveur
   */
  getAnalytics(): Observable<PageVisit[]> {
    return this.http.get<PageVisit[]>(`${this.API_BASE_URL}/stats`);
  }

  /**
   * Efface toutes les statistiques sur le serveur
   */
  clearAnalytics(): Observable<any> {
    return this.http.delete(`${this.API_BASE_URL}/clear`);
  }

  /**
   * Exporte les données au format JSON depuis le serveur
   */
  exportAnalytics(): Observable<Blob> {
    return this.http.get(`${this.API_BASE_URL}/export`, {
      responseType: 'blob'
    });
  }

  /**
   * Importe des données JSON sur le serveur
   */
  importAnalytics(data: PageVisit[]): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/import`, data);
  }
}

/*
EXEMPLE D'API BACKEND (Node.js/Express)

const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const ANALYTICS_FILE = path.join(__dirname, 'public', 'analytics.json');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Track page visit
app.post('/api/analytics/track', async (req, res) => {
  try {
    const { page, title, timestamp } = req.body;
    
    // Lire le fichier existant
    let analytics = [];
    try {
      const data = await fs.readFile(ANALYTICS_FILE, 'utf8');
      analytics = JSON.parse(data);
    } catch (error) {
      // Fichier n'existe pas encore
    }
    
    // Trouver ou créer l'entrée
    const existingPage = analytics.find(item => item.page === page);
    if (existingPage) {
      existingPage.visits++;
      existingPage.lastVisited = timestamp;
      existingPage.title = title;
    } else {
      analytics.push({
        page,
        title,
        visits: 1,
        lastVisited: timestamp
      });
    }
    
    // Sauvegarder
    await fs.writeFile(ANALYTICS_FILE, JSON.stringify(analytics, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics
app.get('/api/analytics/stats', async (req, res) => {
  try {
    const data = await fs.readFile(ANALYTICS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.json([]);
  }
});

// Clear analytics
app.delete('/api/analytics/clear', async (req, res) => {
  try {
    await fs.writeFile(ANALYTICS_FILE, JSON.stringify([]));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export analytics
app.get('/api/analytics/export', async (req, res) => {
  try {
    const data = await fs.readFile(ANALYTICS_FILE, 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=analytics.json');
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Import analytics
app.post('/api/analytics/import', async (req, res) => {
  try {
    await fs.writeFile(ANALYTICS_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
*/
