# Équilibre Santé — version statique compilée

Cette version est prête à être servie directement par GitHub Pages, sans Node.js, Vite ni GitHub Actions.

## Corriger le dépôt existant

1. Remplacez le fichier `index.html` situé à la racine du dépôt.
2. Ajoutez le dossier `assets` complet à la racine.
3. Dans **Settings → Pages**, sélectionnez **Deploy from a branch**.
4. Choisissez la branche **main** et le dossier **/(root)**, puis enregistrez.
5. Attendez une à deux minutes, puis rechargez la page sans cache.

Les anciens fichiers `src`, `package.json`, `vite.config.ts` et `tsconfig*.json` peuvent rester dans le dépôt : GitHub Pages les ignorera.
