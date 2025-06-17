# Configuration du Service d'Email pour CJACO

## Vue d'ensemble

Le formulaire de contact de CJACO utilise EmailJS pour envoyer les messages directement vers `contact@cjaco.org`. Ce système permet d'envoyer des emails sans avoir besoin d'un serveur backend.

## Configuration EmailJS

### 1. Créer un compte EmailJS

1. Visitez [EmailJS.com](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Confirmez votre adresse email

### 2. Configurer un service email

1. Dans le dashboard EmailJS, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
4. Configurez avec l'adresse `contact@cjaco.org`
5. Notez le **Service ID** généré

### 3. Créer un template d'email

1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Configurez le template avec les variables suivantes :

```
Subject: {{subject}} - Nouveau message de {{from_name}}

De: {{from_name}} ({{from_email}})
Sujet: {{subject}}

Message:
{{message}}

---
Ce message a été envoyé via le formulaire de contact du site CJACO.
Répondre à: {{reply_to}}
```

4. Notez le **Template ID** généré

### 4. Obtenir la clé publique

1. Allez dans "Account" > "General"
2. Copiez votre **Public Key**

### 5. Mettre à jour la configuration

Modifiez le fichier `src/app/services/email.service.ts` :

```typescript
private emailJSConfig = {
  serviceId: 'VOTRE_SERVICE_ID', // Remplacez par votre Service ID
  templateId: 'VOTRE_TEMPLATE_ID', // Remplacez par votre Template ID
  publicKey: 'VOTRE_PUBLIC_KEY' // Remplacez par votre Public Key
};
```

## Variables du template EmailJS

Le service envoie les variables suivantes au template :

- `from_name` : Nom de l'expéditeur
- `from_email` : Email de l'expéditeur
- `to_email` : Email de destination (contact@cjaco.org)
- `subject` : Sujet du message
- `message` : Contenu du message
- `reply_to` : Email pour la réponse (même que from_email)

## Limitations

- **Quota gratuit** : 200 emails/mois avec le plan gratuit
- **Sécurité** : Les clés sont visibles côté client
- **Fiabilité** : Dépend du service tiers EmailJS

## Alternative recommandée pour la production

Pour un environnement de production, il est recommandé d'implémenter une API backend qui gère l'envoi d'emails de manière plus sécurisée :

1. Créer une API REST `/api/contact`
2. Utiliser un service comme SendGrid, Mailgun ou Amazon SES
3. Valider et nettoyer les données côté serveur
4. Implémenter une protection anti-spam (CAPTCHA, rate limiting)

## Test du formulaire

Une fois configuré :

1. Démarrez l'application : `npm start`
2. Naviguez vers `/contact`
3. Remplissez et soumettez le formulaire
4. Vérifiez la réception dans `contact@cjaco.org`

## Dépannage

### Erreur "Service not found"
- Vérifiez que le Service ID est correct
- Assurez-vous que le service est actif dans EmailJS

### Erreur "Template not found"
- Vérifiez que le Template ID est correct
- Assurez-vous que le template est publié

### Emails non reçus
- Vérifiez les dossiers spam/indésirables
- Vérifiez la configuration du service email dans EmailJS
- Consultez les logs EmailJS dans le dashboard
