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

> Si vous avez respecté la procédure et correctemment écrit votre code vous ne devriez pas avoir de message.
> Ne fonctionne pas si vous créer pas le script prepare...

### Installation de SASS

```bash
yarn add sass -D
```

Les règles de style sont la base de Sass, tout comme elles le sont pour CSS. Elles fonctionnent de la même manière : vous choisissez les éléments à styliser à l'aide d'un sélecteur et vous déclarez les propriétés qui affectent l'apparence de ces éléments.

#### Empilement
CSS
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav li {
  display: inline-block;
}

nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```
SCSS
```scss
nav {
  & ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

 & li { display: inline-block; }

 & a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

> # Avertissement de la documentation
> Les règles imbriquées sont très utiles, mais elles peuvent aussi rendre difficile la visualisation de la quantité de CSS que vous générez réellement. Plus l'imbrication est profonde, plus la bande passante nécessaire pour servir votre CSS est importante et plus le navigateur a besoin de travail pour le rendre. Gardez ces sélecteurs peu profonds !<br>
> Dans les fait, en prod, on peut transpiler le tout pour faire un ou des fichiers css natif:
> ```bash
> yarn set-script transpile-css "sass <chemin/vers/source> <chemin/vers/destination> --style compressed"
> yarn transpile-css
> ```

#### Fichier partiels

Vous pouvez créer des fichiers Sass partiels contenant de petits fragments de CSS que vous pouvez inclure dans d'autres fichiers Sass. C'est un excellent moyen de modulariser votre CSS et d'en faciliter la maintenance. Un fichier partiel est un fichier Sass nommé avec un underscore. Vous pouvez le nommer comme `_partial.scss`. Le trait de soulignement indique à Sass que le fichier n'est qu'un fichier partiel et qu'il ne doit pas être généré dans un fichier CSS. Les partiels de Sass sont utilisés avec la règle `@use`.

#### Modules

Vous n'êtes pas obligé d'écrire tout votre Sass dans un seul fichier. Vous pouvez le diviser comme bon vous semble avec la règle @use. Cette règle charge un autre fichier Sass comme un module, ce qui signifie que vous pouvez faire référence à ses variables, mixins et fonctions dans votre fichier Sass avec un espace de nom basé sur le nom du fichier. L'utilisation d'un fichier inclut également le CSS qu'il génère dans votre sortie compilée !

`_base.scss`
```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

`styles.scss`
```scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

Donne en CSS
```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
```

#### Mixines 
En réalité des functions

Certaines choses en CSS sont un peu fastidieuses à écrire, surtout avec CSS3 et les nombreux préfixes de moteur de navigateur qui existent. Un mixin vous permet de créer des groupes de déclarations CSS que vous souhaitez réutiliser dans votre site. Cela vous aide à garder votre Sass très DRY. Vous pouvez même passer des valeurs pour rendre votre mixin plus flexible.

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

Donne en CSS
```css
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```

#### Héritage
L'utilisation de @extend vous permet de partager un ensemble de propriétés CSS d'un sélecteur à un autre. Dans notre exemple, nous allons créer une série simple de messages pour les erreurs, les avertissements et les réussites en utilisant une autre fonctionnalité qui va de pair avec extend, les classes placeholder. Une classe de type placeholder est un type spécial de classe qui ne s'imprime que lorsqu'elle est étendue, et peut vous aider à garder votre CSS compilé propre et net.

```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```
 Donne en css

 ```css
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
  border-color: green;
}

.error {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
  border-color: red;
}

.warning {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
  border-color: yellow;
}
 ```


#### Operator

Il est très utile de faire des mathématiques dans votre CSS. Sass dispose d'une poignée d'opérateurs mathématiques standard comme +, -, *, math.div() et %. Dans notre exemple, nous allons faire quelques calculs mathématiques simples pour calculer la largeur d'un article et d'un côté.

> En css, il existe une valeur calc() bien moins pratique, puisque ça force le navigateur a faire le calcul lui-même du coup peut ralentir les smartphones.

SCSS
```scss
@use "sass:math";

.container {
  display: flex;
}

article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}

aside[role="complementary"] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```
CSS
```css
.container {
  display: flex;
}

article[role="main"] {
  width: 62.5%;
}

aside[role="complementary"] {
  width: 31.25%;
  margin-left: auto;
}
```

Plus de possibilité dans la documentation [ici](https://sass-lang.com/documentation/).