# Bolierplate avec NextJS

## Sommaire

  - [Démarrage](#démarrage)
  - [Procédure](#procédure)
    - [1 - Installation de NextJS](#1---installation-de-nextjs)
    - [2 - Installation de Prettier et ESLint](#2---installation-de-prettier-et-eslint)
    - [3 - Installation de 🐺 Husky 🐺](#3---installation-de--husky-)
    - [4 - Installation de SASS](#4---pr-processeur-de-sass)
      - [Empilement](#empilement)
      - [Fichier partiels](#fichier-partiels)
      - [Modules](#modules)
      - [Mixines](#mixines)
      - [Héritage](#hritage)
      - [Operator](#operator)
  - [CSSComb](#csscomb)

## Démarrage

```bash
yarn
```

## Procédure
[Retour au sommaire](#sommaire)<br>
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
[Retour au sommaire](#sommaire)<br>
```bash
yarn add eslint prettier -D
```

puis tout les fichier de configuration:

```bash
yarn add @typescript-eslint/{eslint-plugin,parser} eslint-config-{airbnb,prettier} eslint-plugin-{jsx-a11y,prettier,react,react-hooks,security,simple-import-sort,sonarjs} -D
```

|                                  Nom | Description                                                                                                                                       | Lien                                                                                  |
|-------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------|
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
[Retour au sommaire](#sommaire)<br>
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

### 4 - Pré-processeur de SASS
[Retour au sommaire](#sommaire)<br>
```bash
yarn add sass -D
```

Les règles de style sont la base de Sass, tout comme elles le sont pour CSS. Elles fonctionnent de la même manière : vous choisissez les éléments à styliser à l'aide d'un sélecteur et vous déclarez les propriétés qui affectent l'apparence de ces éléments.

#### **Empilement**
[Retour au sommaire](#sommaire)<br>
<div style="columns: 2">

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

</div>

> # Avertissement de la documentation
> Les règles imbriquées sont très utiles, mais elles peuvent aussi rendre difficile la visualisation de la quantité de CSS que vous générez réellement. Plus l'imbrication est profonde, plus la bande passante nécessaire pour servir votre CSS est importante et plus le navigateur a besoin de travail pour le rendre. Gardez ces sélecteurs peu profonds !<br>
> Dans les fait, en prod, on peut transpiler le tout pour faire un ou des fichiers css natif:
> ```bash
> yarn set-script transpile-css "sass <chemin/vers/source> <chemin/vers/destination> --style compressed"
> yarn transpile-css
> ```

#### **Fichier partiels**
[Retour au sommaire](#sommaire)<br>
Vous pouvez créer des fichiers Sass partiels contenant de petits fragments de CSS que vous pouvez inclure dans d'autres fichiers Sass. C'est un excellent moyen de modulariser votre CSS et d'en faciliter la maintenance. Un fichier partiel est un fichier Sass nommé avec un underscore. Vous pouvez le nommer comme `_partial.scss`. Le trait de soulignement indique à Sass que le fichier n'est qu'un fichier partiel et qu'il ne doit pas être généré dans un fichier CSS. Les partiels de Sass sont utilisés avec la règle `@use`.

#### **Modules**
[Retour au sommaire](#sommaire)<br>
Vous n'êtes pas obligé d'écrire tout votre Sass dans un seul fichier. Vous pouvez le diviser comme bon vous semble avec la règle @use. Cette règle charge un autre fichier Sass comme un module, ce qui signifie que vous pouvez faire référence à ses variables, mixins et fonctions dans votre fichier Sass avec un espace de nom basé sur le nom du fichier. L'utilisation d'un fichier inclut également le CSS qu'il génère dans votre sortie compilée !

<div style="columns: 2">

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
</div>


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

#### **Mixines** 
[Retour au sommaire](#sommaire)<br>
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

#### **Héritage**
[Retour au sommaire](#sommaire)<br>
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


#### **Operator**
[Retour au sommaire](#sommaire)<br>
Il est très utile de faire des mathématiques dans votre CSS. Sass dispose d'une poignée d'opérateurs mathématiques standard comme +, -, *, math.div() et %. Dans notre exemple, nous allons faire quelques calculs mathématiques simples pour calculer la largeur d'un article et d'un côté.

> En css, il existe une valeur calc() bien moins pratique, puisque ça force le navigateur a faire le calcul lui-même du coup peut ralentir les smartphones.

<div style="columns: 2;">

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

</div>

Plus de possibilités dans la documentation [ici](https://sass-lang.com/documentation/).

### 5 - CSSComb

CSSComb est un module exxentiellement pour trier les propriétés css il devenu tellement populaire qu'il a été utlisé sur le Framework CSS Facebook Bootstrap 3. Puis est devenu un linter.

Aujourd'hui, le projet d'origine a été abandonné au profit de `csscombjs`. Il a pas beaucoup bougé depuis 2019, le site n'a pas été mis à jour et été migré [Official Website](https://csscomb.herokuapp.com/) qui permet de faire **PARTIELLEMENT** son propre fichier de configuration.

Il permet de garder du code Source SCSS/SASS, le plus propre possible. J'ai personnellement un choix très arrêté pour l'ordre des propriétés CSS. Elle se base à l'origine comme si vous prenez un crayon (pas de stylo, pinceaux etc) et que vous vous mettiez à dessiner avec aussi des ordres de placements venant de certaines conventions. Ca permet **essentiellement** de s'y retrouver parmis les nombreuses propriétés et d'avoir un ordre le plus logique possible.

`csscomb.json`
```json
{
  ...
      "sort-order": [
        [
            /* Contenu
             * En tête de tableau, souvent utilisé sur les pseudos-élément ::before et ::after
             * par convention on le laissse en haut. 
            */
            "content"
        ],
        [
            /* Nature d'un élement, visibilté, disparu du flux, opacité, supperposition */
            "display",
            "visibility",
            "opacity",
            "float",
            "clear",
            "overflow",
            "-ms-overflow-x",
            "-ms-overflow-y",
            "overflow-x",
            "overflow-y",
            "clip",
            "zoom"
        ],
        [
            /* Positionnements */
            "position",
            "z-index",
            "top",
            "right",
            "bottom",
            "left"
        ],
        [
            /* Flexbox, 
             * est le utilisé actuellement je pense qu'il est préférable de le mettre devant 
             */
            "-webkit-align-content",
            "-ms-flex-line-pack",
            "align-content",
            "-webkit-box-align",
            "-moz-box-align",
            "-webkit-align-items",
            "align-items",
            "-ms-flex-align",
            "-webkit-align-self",
            "-ms-flex-item-align",
            "-ms-grid-row-align",
            "align-self",
            "-webkit-box-flex",
            "-webkit-flex",
            "-moz-box-flex",
            "-ms-flex",
            "flex",
            "-webkit-flex-flow",
            "-ms-flex-flow",
            "flex-flow",
            "-webkit-flex-basis",
            "-ms-flex-preferred-size",
            "flex-basis",
            "-webkit-box-orient",
            "-webkit-box-direction",
            "-webkit-flex-direction",
            "-moz-box-orient",
            "-moz-box-direction",
            "-ms-flex-direction",
            "flex-direction",
            "-webkit-flex-grow",
            "-ms-flex-positive",
            "flex-grow",
            "-webkit-flex-shrink",
            "-ms-flex-negative",
            "flex-shrink",
            "-webkit-flex-wrap",
            "-ms-flex-wrap",
            "flex-wrap",
            "-webkit-box-pack",
            "-moz-box-pack",
            "-ms-flex-pack",
            "-webkit-justify-content",
            "justify-content",
            "-webkit-box-ordinal-group",
            "-webkit-order",
            "-moz-box-ordinal-group",
            "-ms-flex-order",
            "order"
        ],
        [
            /* Grid Layout,
             * apparu le 17 Sept. 2015 est plus adpaté au colonnage
             * Avantage:
             *  - plus facile à utilisé que flexbox.
             *  - Très bon pour faire des grilles statiques
             *  - plus facilement gérable avec des @mediaquery.
             * Défaut: 
             *  - on ne peut pas déplacé les éléments comme on le souhaite avec des @keyframes.
             * Déjà testé.
             */
            "grid",
            "grid-area",
            "grid-auto-columns",
            "grid-auto-flow",
            "grid-column",
            "grid-column-end",
            "grid-column-gap",
            "grid-column-start",
            "grid-gap",
            "grid-row",
            "grid-row-end",
            "grid-row-gap",
            "grid-row-start",
            "grid-template",
            "grid-template-areas",
            "grid-template-rows",
            "grid-template-columns",
            "row-gap",
            "handling-puctuation"
        ],
        [
          /*
           *  Multi-Colummn
           *  Permet de faire des colonnages comme en imprimerie, de gérer les gouttière 'gap'
           *  et de remplir avec un filet vertical 'column-rule'.
           */
            "columns",
            "column-count",
            "column-fill",
            "column-gap",
            "column-rule",
            "column-rule-color",
            "column-rule-style",
            "column-rule-width",
            "column-span",
            "column-width"
        ],
        [
            /*
             * Modèle de boîte, généralement à éviter de touche sinon ça crée des soucis.
            */
            "-webkit-box-sizing",
            "-moz-box-sizing",
            "box-sizing"
        ],
        [
            /*
             *  Les dimensions selon le modèle de boîte
             */
            "width",
            "min-width",
            "max-width",
            "height",
            "min-height",
            "max-height"
        ],
        [
            /*
             * Contour, mais spécifique au élément interactif comme les:
             * Input,
             * Checkbox (techniquement s'en ai)
             * Radio (aussi)
             * Textarea
             * Bouton
            */
            "outline",
            "outline",
            "outline-width",
            "outline-style",
            "outline-color",
            "outline-offset"
        ],
        [
            /*
             * Marge extérieur selon le modèle de boîte
             */
            "margin",
            "margin-top",
            "margin-right",
            "margin-bottom",
            "margin-left"
        ],
        [
            /* 
             * Bord selon le modèle de boîte
             */
            "border",
            "border-width",
            "border-style",
            "border-color",
            "border-top",
            "border-top-width",
            "border-top-style",
            "border-top-color",
            "border-right",
            "border-right-width",
            "border-right-style",
            "border-right-color",
            "border-bottom",
            "border-bottom-width",
            "border-bottom-style",
            "border-bottom-color",
            "border-left",
            "border-left-width",
            "border-left-style",
            "border-left-color"
        ],
        [
            /*
             * J'isole le contour de bord, pour qu'il soit plus facilement repérable.
            */
            "-webkit-border-radius",
            "-moz-border-radius",
            "border-radius",
            "-webkit-border-top-left-radius",
            "-moz-border-radius-topleft",
            "border-top-left-radius",
            "-webkit-border-top-right-radius",
            "-moz-border-radius-topright",
            "border-top-right-radius",
            "-webkit-border-bottom-right-radius",
            "-moz-border-radius-bottomright",
            "border-bottom-right-radius",
            "-webkit-border-bottom-left-radius",
            "-moz-border-radius-bottomleft",
            "border-bottom-left-radius"
        ],
        [
           /*
            * Le remplacement des filets technique des bords par une image.
            */
            "-webkit-border-image",
            "-moz-border-image",
            "-o-border-image",
            "border-image",
            "-webkit-border-image-source",
            "-moz-border-image-source",
            "-o-border-image-source",
            "border-image-source",
            "-webkit-border-image-slice",
            "-moz-border-image-slice",
            "-o-border-image-slice",
            "border-image-slice",
            "-webkit-border-image-width",
            "-moz-border-image-width",
            "-o-border-image-width",
            "border-image-width",
            "-webkit-border-image-outset",
            "-moz-border-image-outset",
            "-o-border-image-outset",
            "border-image-outset",
            "-webkit-border-image-repeat",
            "-moz-border-image-repeat",
            "-o-border-image-repeat",
            "border-image-repeat"
        ],
        [
            /*
             * La marge intérieur selon le modèle de boîte. 
             * En respectant, cette ordre il est plus aisé de se représenter 
             * le modèles de boîte mentalement depuis l'extérieur vers l'intérieur. 
            */
            "padding",
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left"
        ],
        [
            /*
             * Le fond de notre élément.
            */
            "background",
            "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader",
            "background-color",
            "background-image",
            "background-repeat",
            "background-attachment",
            "background-position",
            "background-position-x",
            "-ms-background-position-x",
            "background-position-y",
            "-ms-background-position-y",
            "-webkit-background-clip",
            "-moz-background-clip",
            "background-clip",
            "background-origin",
            "-webkit-background-size",
            "-moz-background-size",
            "-o-background-size",
            "background-size",
            "box-decoration-break",
            "backdrop-filter", // Les effets sur le fond de la boite: blur, brightness, drop-shadow, opacity, sans toucher au contenu.
            "backface-visibility", // Un peu claqué au sol fait disparaître les élément dessous. A activer pour mon consommé de ressource.
            "background-blend-mode" // Permet d'appliquer des filtres exactement comme les modes de fusion de Photoshop.
        ],
        [
            /* J'isole volontairement l'effet d'ombré il ne modifie pas le modèle de boîte du flux HTML */
            "-webkit-box-shadow",
            "-moz-box-shadow",
            "box-shadow"
        ],
        [
           /*
            * La typo,
            * à partir d'ici on commence à éditer le contenu de l'élément.
           */
            "font",
            "font-family",
            "font-feature-settings",
            "font-krening",
            "font-size",
            "font-weight",
            "font-style",
            "font-variant",
            "font-size-adjust",
            "font-stretch",
            "font-smooth",
            "line-height"
        ],
        [
            /*
             * Manipulation du texte,
             * sur l'enssemble d'un élement balise ou d'un sous-élément spécifique.
             * En principe ne cassse pas le modèle de boîte. 
            */
            "-webkit-hyphens",
            "-ms-hyphens",
            "hyphens",
            "text-indent",
            "text-align",
            "text-align-last",
            "text-justify",
            "text-decoration",
            "text-decoration-color",
            "text-decoration-line",
            "text-decoration-style",
            "text-decoration-thickness",
            "text-emphasis",
            "text-emphasis-position",
            "texte-emphasis-style",
            "text-overflow",
            "vertical-align",
            "white-space",
            "word-break",
            "word-spacing",
            "word-wrap",
            "tab-size",
            "quotes",
            "direction",
            "unicode-bidi",
            "writing-mode"
        ],
        [
            /*
             * Effet spécifique sur le texte, increment, les transformations de texte et ombre portée.
            */
            "counter-increment", // Créer une incrémentation sur tous les élément spécifique d'un document.
            "counter-reset", // Permet une remise à zéro de l'incrémentation.
            /* 
               Capitalize, Uppercase Lowercase etc. En français, on voit pas une grand différence.
               en Allemand les 'ß' devient SS en Majuscules,
               en Néerlandais, le digraphe ij devient IJ, y compris avec 'capitalize'. ex: ijsvrij yoghurt (Yaourt sans glace :) ) devient IJsvrij Yoghurt.
               en grecque, les voyelles perdent leur accent lorsque tout le mot est en capitale: ά => A sauf quelques exceptions.
            */ 
            "text-transform", 
            "filter:progid:DXImageTransform.Microsoft.gradient",
            "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
            "text-shadow"
        ],
        [
            /*
             * Gestion du contenu des images et video.
             * Un peu comme les background-image, background-position, background-size.
            */
            "object-fit",
            "object-position"
        ],
        [
            /*
             * Gestion des tableaux
            */
            "table-layout",
            "empty-cells",
            "caption-side",
            "border-spacing",
            "border-collapse"
        ],
        [
            /*
             * Gestion des listes
            */
            "list-style",
            "list-style-position",
            "list-style-type",
            "list-style-image"
        ],
        [
            /*
             * Gestion spéfique des élément interactifs
            */
            "resize"
        ],
        [
            /*
             * Gestion des différents pointeurs 
            */
            "carret-color", // Pointeur quand on écrit.
            "cursor", // Changer le pointeur par defaut.
            "pointer-events", // Laisser en auto.
            /* 'all', un clic sélectionne tout le texte;
             * 'text', un clic sélectionne un mot, deux clic sélectionne le paragraphe;
             * 'none', impossible de selectionner.
             *  Sinon laisser an auto. 
             */
            "user-select" 
        ],
        [ 
            /*
             * Propriété CSS essentiellement utilisé pour le Print.
             * à Utilisé avec media Query 
             * @media (print) {  }  
            */

            /*
             * Orphelins, termes pour désigner la ligne qui passe tout seul sur une autre colonne ou page.
             * Valeur numérique attendu, laisser à 2 minimun mais le mieux reste 3 à 5.
             * C'est une solution cache misère.
             */ 
            "orphans",
            /*
             * Veuves, termes pour désigner les lignes qui qui sont rester sur la page, colonnes précédentes.
             * Valeur numérique attendu, laisser à 2, parque une ligne c'est pas très heureux...
             * C'est aussi une solution cache misère.
            */
            "widows",
            /*
             * Saut de page, de créer automatiquement des sauts de pages
             * avec un élément parent sur tous ses enfants si un coupure
             * intervient.  
            */
            "page-break-after",
            "page-break-before",
            "page-break-inside"
        ],
        [
            /*
             * Les transformations, déformation, filtres et les masques
             * Ultra casse-gueule quand on s'est pas trop ce que l'on fait.
             * mask étant la seul spec. qui n'a pas de super-propriété.
            */
            "transform",
            "transform-origin",
            "transform-style",
            "mix-blend-mode",
            "filter",
            "mask-origin",
            "mask-position",
            "mask-size",
            "mask-image",
            "mask-mode",
            "mask-repeat",
            "perspective",
            "perspective-origin",
            "scroll-behavior"
        ],
        [
            /*
             * Transition, entre les états d'un élément
             * par exemple: hover, focus, active, visited, target 
             *
            */
            "transition",
            "transition-duration",
            "transition-property",
            "transition-timing-function"
        ],
        [
            /*
             * Animation pur à utiliser conjointement avec les @keyframes 
             * Compliqué quand on maîtrise pas.
            */
            "animation",
            "animation-delay",
            "animation-direction",
            "animation-duration",
            "animation-fill-mode",
            "animation-iteration-count",
            "animation-name",
            "animation-play-state",
            "animation-timeline",
            "animation-timing-function"
        ]
    ]
}
```

> ## Note à propos de CSSComb
> Il subsiste des linefeeds avec csscomb quand on groupe les propriétés avec un tbbleau à deux dimension.
> Qui est génant selon **les goûts des gens** qui aime pas **avoir de petites roues sur leur bicyclette**. 
> Pour l'éviter, il suffit de faire un tableau à une dimension. 

### 6 - Test unitaire et test bout-en-bout

```bash
yarn add jest ts-jest @types/jest \ 
eslint-plugin-jest-dom @testing-library/{jest-dom,react} @types/testing-library__jest-dom \
@typescript-eslint/eslint-plugin \
cypress -D
```

|                             Name | Description                                                                                               | Lien                                                                                             |
|---------------------------------:|:----------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------|
|                             jest | Fast interactive mode can switch between running all tests or only test files related to changed files.   | [site](https://jestjs.io/), [doc](https://jestjs.io/docs/getting-started)                        |
|                          ts-jest | A Jest transformer with source map support that lets you use Jest to test projects written in TypeScript. | [site](https://kulshekhar.github.io/ts-jest/), [doc](https://kulshekhar.github.io/ts-jest/docs/) |
|           eslint-plugin-jest-dom | ESLint plugin to follow best practices and anticipate common mistakes when writing tests with jest-dom.   | [repo](https://github.com/testing-library/eslint-plugin-jest-dom#readme)                         |
|    @testing-library/**jest-dom** | Custom jest matchers to test the state of the DOM.                                                        | [repo](https://github.com/testing-library/)                                                      |
|       @testing-library/**react** | Simple and complete React DOM testing utilities that encourage good testing practices.                    | [repo](https://github.com/testing-library/react-testing-library)                                 |
|                  @types/**jest** | Type definitions for Jest                                                                                 | [repo](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jest)                |
| @types/testing-library__jest-dom | Type definitions for Jest Dom                                                                             |                                                                                                  |
| @typescript-eslint/eslint-plugin | An ESLint plugin which provides lint rules for TypeScript codebases.                                      | [repo](https://github.com/typescript-eslint/typescript-eslint)                                   |
|                          cypress | Fast, easy and reliable testing for anything that runs in a browser.                                      | [site](https://www.cypress.io/), [repo](https://github.com/cypress-io/cypress)                   |

#### Configurer Cypress

`package.json`
```json
{
  "scripts": {
    "test": "jest --watch",
    "test:ci": "jest --ci",
    "test:e2e": "cypress open"
  }
}
```

#### Lancer Cypress la première fois

Il suffit de lancer la commande `yarn cypress open` et de suivre les instructions sur la fenêtre electron qui vient de s'ouvrir :

![https://docs.cypress.io/_nuxt/img/launchpad.fcc7cac.png](https://docs.cypress.io/_nuxt/img/launchpad.fcc7cac.png)

Cliquer sur E2E Testing, s'ensuit la création des différents fichiers de configurations :

![https://docs.cypress.io/_nuxt/img/scaffolded-files.a797120.png](https://docs.cypress.io/_nuxt/img/scaffolded-files.a797120.png)

Une fois que les fichiers ont été correctement été généré :

![https://docs.cypress.io/_nuxt/img/select-browser.b7ecf05.png](https://docs.cypress.io/_nuxt/img/select-browser.b7ecf05.png)

> Le choix peut différer selon les navigateurs que vous avez installés sur votre machine.
> 
> > ### Important
> > À l'heure actuelle, les tests de composant sont encore en beta en août 2022.

Par la suite, il est possible de créer notre premier test bout-en-bout. En cliquant sur `Create new empty spec` :

![https://docs.cypress.io/_nuxt/img/create-new-empty-spec.08c8dab.png](https://docs.cypress.io/_nuxt/img/create-new-empty-spec.08c8dab.png)

le nommer comme suit `cypress/e2e/<NOM_A_DONNER>.cy.ts`

![https://docs.cypress.io/_nuxt/img/enter-path-for-new-spec.474c3f4.png](https://docs.cypress.io/_nuxt/img/enter-path-for-new-spec.474c3f4.png)

Puis, il est proposé un exemple pour démarrer :

![https://docs.cypress.io/_nuxt/img/new-spec-added-confirmation.bb3adda.png](https://docs.cypress.io/_nuxt/img/new-spec-added-confirmation.bb3adda.png)

#### Les tests

##### 1ère méthodes
Un task runner IJ a été créer pur l'occasion `end to end`, il lance le mode dev et ensuite la cypress

##### 2ème méthodes
On lance la commande `yarn dev`, puis la command `cypress run`:

```bash
cypress run --browser chrome
```
> Si chrome est installé sur votre système et est dans votre environnement de variable, le nom du navigateur **TOUJOURS en minuscule**. Sinon :
> ```bash
> cypress run --browser path/to/binary/for/your/browser
> ```

Une des commandes les plus pratiques à utiliser :

```bash
cypres run --record --group 2x-chrome --browser chrome --parallel
```

Permet essentiellement de créer un groupe de test sur Chrome sur deux navigateurs.
Si les tests échecs échoue, shoot une capture dans le dossier `cypress/screenshots`.
En cas de réussite, il stocke une vidéo mp4 dans le dossier `cypress/videos`.

> Les contenus des dossiers ont été ignorés sur le repo.

