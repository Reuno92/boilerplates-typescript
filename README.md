# Google Typescript Style

Génère un projet depuis [gts](https://github.com/google/gts).
Permet de linter et de magnifier le code.

## Description
GTS part d'un guide en interne chez Google concernant TypeScript. Disponible [ici](https://google.github.io/styleguide/tsguide.html).

## Installation
Nécessite d'installer NodeJS et NPM.

Depuis votre terminal ou votre invite de commande
```bash
npx gts init
```

## Usage
Pour lancer le linter, utiliser la commande :

```bash
yarn lint
```

Pour lancer le linter sur un fichier unique ou multiple spécifiquement:
```bash
yarn lint index.ts trashed_code.ts
```

Pour corriger le code automatiquement (pas forcment recommandé dans tout les cas) :

```bash
yarn fix
```

## Support
[Renaud Racinet](mailto:renaud.racinet@viseo.com)
