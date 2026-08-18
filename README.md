# Équilibre Santé — GitHub Pages

Page responsive proposant des repères nutritionnels éducatifs, un choix entre maintien et perte progressive, un calculateur de portions, un répertoire d’aliments à IG bas et dix menus-types.

## Publier sur GitHub Pages

1. Créez un dépôt GitHub vide, par exemple `equilibre-sante`.
2. Décompressez cette archive et envoyez tout son contenu à la racine du dépôt.
3. Dans **Settings → Pages**, choisissez **GitHub Actions** comme source.
4. Envoyez les fichiers sur la branche `main`. Le workflow publiera automatiquement le site.

L’adresse finale sera généralement :

```text
https://VOTRE-NOM.github.io/equilibre-sante/
```

## Développement local

Node.js 22 ou supérieur est recommandé.

```bash
npm install
npm run dev
```

Pour vérifier la version de production :

```bash
npm run build
npm run preview
```

## Avertissement

Le site fournit des estimations éducatives et ne remplace pas un avis médical ou diététique personnalisé.
