# Débogage de la soumission de formulaire - Activités

## Problème identifié

Lorsque vous soumettez le formulaire de création d'activité, il n'y a **aucune réponse du backend**.

## Causes possibles

### 1. **URL de l'API incorrecte** ✅ CORRIGÉ
- **Ancien**: `http://localhost:8000/api`
- **Nouveau**: `https://api.cjaco.org/v1/api`
- L'URL complète pour créer une activité est: `https://api.cjaco.org/v1/api/cjaco/activities/create`

### 2. **Image requise manquante** ✅ CORRIGÉ
Le backend Go exige une image lors de la création:
```go
image, err := c.FormFile("image")
if err != nil {
    return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
        "status":  "error",
        "message": "Image is required",
    })
}
```

**Solution appliquée**: Validation côté client avant l'envoi.

### 3. **Problèmes CORS**
Le backend doit autoriser les requêtes depuis votre domaine Angular:
```go
app.Use(cors.New(cors.Config{
    AllowOrigins: "http://localhost:4200, https://votre-domaine.com",
    AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
    AllowHeaders: "Origin, Content-Type, Accept, Authorization",
}))
```

### 4. **Champs requis manquants**
Le backend attend ces champs **obligatoires**:
- `title` (string)
- `category` (string)
- `shortDescription` (string)
- `description` (string)
- `image` (fichier)

Champs **optionnels**:
- `location` (string)
- `author` (string)
- `date` (string, format: YYYY-MM-DD)
- `partners` (string séparé par `;`)
- `relatedActivities` (string séparé par `;`)
- `gallery` (fichiers multiples)

## Tests à effectuer

### Test 1: Vérifier la disponibilité de l'API
```bash
node test-api.js
```

### Test 2: Tester la création avec cURL
```bash
curl -X POST https://api.cjaco.org/v1/api/cjaco/activities/create \
  -F "title=Test Activity" \
  -F "category=Education" \
  -F "shortDescription=Short description test" \
  -F "description=This is a longer description for testing purposes" \
  -F "image=@/path/to/image.jpg"
```

### Test 3: Vérifier les logs dans la console du navigateur
Après soumission, vérifiez:
1. **Console** → Onglet "Console"
   - Recherchez `=== FormData Contents ===`
   - Recherchez `Sending create request to:`
   - Vérifiez les erreurs

2. **Network** → Onglet "Réseau"
   - Filtrez par "XHR" ou "Fetch"
   - Cherchez la requête vers `activities/create`
   - Vérifiez:
     - Status code (200, 400, 404, 500, etc.)
     - Request Headers
     - Request Payload (FormData)
     - Response (si présente)

## Améliorations apportées

### 1. Validation de l'image
```typescript
if (!this.isEditMode() && !this.imageFile) {
  alert('L\'image principale est requise pour créer une activité.');
  return;
}
```

### 2. Logs de débogage
```typescript
console.log('=== FormData Contents ===');
formData.forEach((value, key) => {
  console.log(`${key}:`, value);
});
```

### 3. Gestion d'erreurs améliorée
```typescript
error: (error) => {
  console.error('=== Error Details ===');
  console.error('Status:', error.status);
  console.error('Status Text:', error.statusText);
  console.error('Error:', error.error);
  
  let errorMsg = 'Erreur de connexion au serveur';
  if (error.status === 0) {
    errorMsg = 'Impossible de contacter le serveur';
  } else if (error.status === 404) {
    errorMsg = 'Endpoint non trouvé (404)';
  }
  // ...
}
```

### 4. Nettoyage des tableaux vides
```typescript
partners: formValue.partners 
  ? formValue.partners.split(';').map((p: string) => p.trim()).filter((p: string) => p) 
  : []
```

## Checklist de vérification

- [x] URL de l'API corrigée
- [x] Validation de l'image requise
- [x] Logs de débogage ajoutés
- [x] Gestion d'erreurs améliorée
- [ ] Vérifier que le backend est accessible
- [ ] Vérifier les CORS du backend
- [ ] Tester la création d'une activité
- [ ] Vérifier les logs dans la console
- [ ] Vérifier l'onglet Network

## Prochaines étapes

1. **Démarrer l'application Angular**:
   ```bash
   npm start
   ```

2. **Ouvrir dans le navigateur**: http://localhost:4200/admin/activities

3. **Ouvrir les DevTools** (F12):
   - Aller dans l'onglet "Console"
   - Aller dans l'onglet "Network"

4. **Créer une activité**:
   - Cliquer sur "Créer une activité"
   - Remplir tous les champs requis
   - **IMPORTANT**: Sélectionner une image
   - Cliquer sur "Créer"

5. **Observer les logs**:
   - Dans la Console: voir les logs de FormData et les erreurs éventuelles
   - Dans Network: voir la requête HTTP et sa réponse

## Questions à vérifier

1. **Le backend est-il démarré et accessible?**
   ```bash
   curl https://api.cjaco.org/v1/api/cjaco/activities/all
   ```

2. **Les CORS sont-ils configurés?**
   - Le backend doit autoriser votre origine (localhost:4200)

3. **L'authentification est-elle requise?**
   - Si oui, vérifiez que le token JWT est inclus dans les headers

4. **Le format de la date est-il correct?**
   - Format attendu: `YYYY-MM-DD`

## Contact Support Backend

Si le problème persiste, partagez ces informations avec l'équipe backend:

1. L'URL complète utilisée
2. Les logs de la console (FormData contents)
3. Le status code reçu (visible dans Network tab)
4. Le message d'erreur complet
5. Les headers de la requête (visible dans Network tab)
