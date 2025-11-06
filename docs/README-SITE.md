# CJACO - Site Web de l'Organisation Non Gouvernementale

## 🎯 Description

Site web moderne et élégant pour CJACO (Collectif des Jeunes Ambassadeurs du Congo), une organisation non gouvernementale dédiée au développement durable et à l'amélioration des conditions de vie des communautés.

## ✨ Fonctionnalités

### 🏠 Pages Principales
- **Accueil** : Présentation générale, statistiques d'impact, témoignages
- **À Propos** : Histoire, mission, vision, valeurs, chronologie
- **Organisation** : Structure, équipe dirigeante, gouvernance
- **Activités** : Programmes et projets en cours
- **Contact** : Formulaire de contact et informations

### 🚀 Optimisations SEO
- Meta tags optimisés pour chaque page
- Structured Data (Schema.org)
- Open Graph et Twitter Cards
- Sitemap automatique
- URLs canoniques
- Optimisation des performances

### 🎨 Design Features
- Design moderne et responsive
- Animations fluides
- Palette de couleurs professionnelle
- Typographie optimisée
- Composants réutilisables

## 🛠️ Technologies

- **Angular 19** : Framework frontend
- **TypeScript** : Langage de développement
- **SCSS** : Préprocesseur CSS
- **SSR** : Server-Side Rendering pour le SEO
- **Font Awesome** : Icônes
- **Google Fonts** : Typographie

## 📁 Structure du Projet

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Navigation principale
│   │   └── footer/          # Pied de page
│   ├── pages/
│   │   ├── home/            # Page d'accueil
│   │   ├── about/           # À propos
│   │   ├── organisation/    # Organisation
│   │   ├── activities/      # Activités
│   │   └── contact/         # Contact
│   ├── services/
│   │   └── seo.service.ts   # Service d'optimisation SEO
│   ├── app.component.*      # Composant racine
│   ├── app.routes.ts        # Configuration des routes
│   └── app.config.ts        # Configuration de l'application
├── assets/
│   ├── images/              # Images du site
│   ├── videos/              # Vidéos
│   └── favicons/            # Icônes et manifest
├── styles.scss              # Styles globaux
└── index.html               # Point d'entrée HTML
```

## 🚀 Installation et Démarrage

1. **Installation des dépendances**
   ```bash
   npm install
   ```

2. **Démarrage du serveur de développement**
   ```bash
   npm start
   # ou
   ng serve
   ```

3. **Build de production**
   ```bash
   npm run build
   # ou
   ng build
   ```

4. **Build avec SSR**
   ```bash
   npm run build:ssr
   ```

5. **Serveur SSR**
   ```bash
   npm run serve:ssr
   ```

## 📋 Scripts Disponibles

- `npm start` : Démarrage du serveur de développement
- `npm run build` : Build de production
- `npm run build:ssr` : Build avec SSR
- `npm run serve:ssr` : Serveur de production avec SSR
- `npm test` : Exécution des tests
- `npm run lint` : Vérification du code

## 🎨 Customisation

### Couleurs
Les couleurs principales sont définies dans `src/styles.scss` :
```scss
:root {
  --primary-color: #667eea;
  --primary-dark: #764ba2;
  --secondary-color: #f093fb;
  // ...
}
```

### Contenu
- **Textes** : Modifiez directement dans les templates HTML
- **Images** : Remplacez les fichiers dans `public/assets/images/`
- **SEO** : Configurez dans chaque composant via `SeoService`

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints :
- Mobile : < 768px
- Tablette : 768px - 1024px
- Desktop : > 1024px

## ⚡ Performances

- Lazy loading des composants
- Optimisation des images
- Minification CSS/JS
- Compression gzip
- Critical CSS inline

## 🔧 Configuration SEO

Chaque page utilise le `SeoService` pour :
- Titre et meta description uniques
- Mots-clés pertinents
- Données structurées
- Open Graph tags
- URLs canoniques

## 📞 Support

Pour toute question ou problème :
- Email : contact@cjaco.org
- GitHub Issues : [Créer une issue]

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ pour CJACO**
