# Bolierplate avec NextJS

## Sommaire

[Démarrage](#démarrage)
[Procédure](#procédure)
[NextJS](#1---installation-de-nextjs)
[Prettier et ESLint](#2---installation-de-prettier-et-eslint)
[Husky](#3---installation-de-🐺-husky-🐺)

## Démarrage

```bash
yarn
```

## Procédure

### 1 - Installation de NextJS

Si vous êtes déjà dans un dossier de travail

```bash
yarn create next-app --typescript .
```

sinon

```bash
yarn create next-app --typescript <NOM_DE_DOSSIER>
```

### 2 - Installation de Prettier et ESLint

```bash
yarn add eslint prettier -D
```

puis tout les fichier de configuration:

```bash
yarn add @typescript-eslint/{eslint-plugin,parser} eslint-config-{airbnb,prettier} eslint-plugin-{jsx-a11y,prettier,react,react-hooks,security,simple-import-sort,sonarjs} -D
```

|                                  Nom | Description                                                                                                                                       | Lien                                                                                  |
| -----------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| @typescript-eslint/**eslint-plugin** | Un plugin ESLint qui fournit des règles lint pour les bases de code TypeScript.                                                                   |                                                                                       |
|        @typescript-eslint/**parser** | Un analyseur ESLint qui exploite TypeScript ESTree pour permettre à ESLint de lint le code source TypeScript.                                     |                                                                                       |
|             eslint-config-**airbnb** | Configuration partagée fournit par le .eslintrc d'Airnbnb                                                                                         | [Doc](https://github.com/airbnb/javascript)                                           |
|           eslint-config-**prettier** | Configuration partagée fournit par le .eslintrc Prettier                                                                                          | [Doc](https://github.com/prettier/eslint-config-prettier/blob/main/README.md)         |
|           eslint-plugin-**jsx-A11y** | Vérificateur statique AST pour les règles d'accessibilité sur les éléments JSX.                                                                   | [Doc](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#readme)                    |
|           eslint-plugin-**prettier** | Exécute Prettier comme une règle ESLint et rapporte les différences comme des problèmes individuels ESLint.                                       | [Doc](https://github.com/prettier/eslint-plugin-prettier#readme)                      |
|              eslint-plugin-**react** | Règles de linting spécifiques à React pour eslint                                                                                                 | [Doc](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md)        |
|        eslint-plugin-**react-hooks** | Plugin ESLint applique les règles des Hooks.                                                                                                      | [NPM](https://www.npmjs.com/package/eslint-plugin-react-hooks)                        |
|           eslint-plugin-**security** | Identifie les points chauds potentiels en matière de sécurité, mais trouve un grand nombre de faux positifs qui doivent être triés par un humain. | [Doc](https://github.com/nodesecurity/eslint-plugin-security#readme)                  |
| eslint-plugin-**simple-import-sort** | Facilite le triage des imports                                                                                                                    | [Doc](https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/README.md) |
|            eslint-plugin-**sonarjs** | Règles SonarJS pour ESLint afin de détecter les bogues et les modèles suspects dans votre code.                                                   | [Doc](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/README.md)     |

On ajoute le tout dans le fichier de configuration d'ESLint:

`.eslintrc`

```json
{
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeature": {
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import:/resolver": {
      "node": {
        "extensions": [".ts", ".tsx"]
      }
    }
  },
  "plugins": ["typescript-eslint", "prettier"],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "prettier",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:sonarjs/recommended",
    "plugin:security/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    // Ce que vous avez réellement besoin.
  }
}
```

On teste le tout avec une commande `yarn lint`

### 3 - Installation de 🐺 Husky 🐺

```bash
yarn add husky -D
```

Puis on lance Husky

```bash
npm set-script prepare "husky install"
yarn prepare
```

Ecriture du pre-commit
`package.json`
```json
{
  ...
  "husky": {
    "hooks": {
      "pre-commit": "npx tsc --noEmit && npx eslint --fix ."
    }
  }
}
```

Test de premier commit

```bash
git add . && git commit -m "test(Husky) Test pre-commit"
```

> Si vous avez correctement écris votre code vous ne devriez pas avoir de message.
