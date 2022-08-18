# Share Dev Meta Info - From Scratch

> **Auteur**  : [Renaud Racinet](mailto:renaud.racinet@viseo.com?subject=J'ai%20question%20sur%20ton%20boilerplate%20NodeJS%20From%20Scratch&body=Merci%20de%20contacter%20au%20plaisir%20de%20discuter%20autour%20d'un%20café.)<br>
> **Plaforme**: NodeJS<br>
> **Langage** : ECMAScript toutes versions.<br>
> **branch**  : FFP-5-Mixed<br>
> **Original Parent Branch** : FFP-5

Un boilerplate pour NodeJS avec Typescript entièrement configurable et partiellement mutliple IDE.

## Sommaire
* [Démarrage](#démarrage)
* [Dépendances](#dépendances)
* [Explication de la procédure](#explication-de-la-procédure)
* [Explication de la configuration .prettierrc](#explication-de-la-configuration-prettierrc)
* [Pourquoi utiliser Husky](#pourquoi-utiliser-🐺-husky-🐺)
* [Un fichier pour tout les IDE](#🧙‍♂️-un-fichier-de-configuration-pour-les-gouverner-tous-💍)
* [Testons tout ça](#testons-tous-ça)

## Démarrage 
```bash
yarn
```

## Dépendances

|Nom                                  |Description                                                                     |
|:------------------------------------|:-------------------------------------------------------------------------------|
|eslint                               | ESLint est un outil permettant d'identifier et de signaler les motifs trouvés dans le code ECMAScript/JavaScript. À bien des égards, il est similaire à JSLint et JSHint, à quelques exceptions près.|
|@typescript-eslint/**eslint-plugin** | Un plugin ESLint qui fournit des règles lint pour les bases de code TypeScript.|
|@typescript-eslint/**parser**        | Un plugin ESLint qui fournit des règles lint pour les bases de code TypeScript.|
|eslint-**config**-prettier           | Désactive toutes les règles qui sont inutiles ou qui pourraient entrer en conflit avec [Prettier]. Cela vous permet d'utiliser votre configuration partageable préférée sans que ses choix stylistiques n'entravent l'utilisation de Prettier.|
|eslint-**plugin**-prettier           | Exécute Prettier comme une règle ESLint et rapporte les différences comme des problèmes ESLint individuels. Si le formatage que vous souhaitez ne correspond pas à la sortie de Prettier, vous devriez utiliser un outil différent tel que prettier-eslint à la place.|
|jest                                 | Solution de test JavaScript complète et prête à être mise en place. |
|prettier                             | Prettier est un formateur de code opiniâtre. Il impose un style cohérent en analysant votre code et en le réimprimant avec ses propres règles qui tiennent compte de la longueur maximale des lignes, en enveloppant le code si nécessaire.|
|husky                                | Husky améliore vos commits et plus 🐶 woof !|
|ts-jest                              | Un transformateur Jest avec prise en charge de source map qui vous permet d'utiliser Jest pour tester des projets écrits en TypeScript.|
|typescript                           | TypeScript ajoute des types optionnels à JavaScript qui prennent en charge des outils pour des applications JavaScript à grande échelle pour tout navigateur, pour tout hôte, sur tout système d'exploitation.|



## Explication de la procédure

[Remonter au sommaire](#sommaire)

> Ne pas éditer package.json avant la fin, les différents modules font des changements notamment **Prettier** qui supprime les Array `Includes` et `Excludes`...

### 1 - Initialisation NodeJS
```bash
yarn init -y
```

### 2 - Ajout Typescript et Linter
```bash
yarn add typescript eslint @typescript-eslint/{eslint-plugin,parser} -D 
```

### 3 - Edition du script 
`package.json`
```json
{
    "scripts": {
        "build": "tsc"
    }
}
``` 

### 4 - Initialisation Typescript
```bash
yarn tsc -- --init
```

### 5 - Initialisation ESLint
```bash
yarn lint --init
```

> ## Options à sélectionner:
> 
> How would you like to use ESLint ? **Style**
>
> What type of modules does your project use? **esm**
>
> Which framework does your project use? **None of these**

### 6 - Configuration ESLint
[Remonter au sommaire](#sommaire)
`.eslintrc.json`
```json
{
    "parser": "@typescript-eslint/parser",
    "plugin": [
        "@typescript-eslint"
    ],
    "overrides": [
        "files": ["*.ts"],
        "extends": [
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking"
        ],
        "parserOptions": {
            "project": "./tsconfig.json"
        }
    ],
    "rules" : [
        "@typescript-eslint/explicit-function-return-type": ["error"]
    ]
}
```

### 7 - Edition de scripts
`package.json`
```json
{
    "scripts": {
        "lint": "eslit src/**/*.ts --color",
        "lint:fix": "eslint src/**/*.ts --fix"
    }
}
```

### 8 - Installation de Prettier
```bash
yarn add prettier -D
```

### 9 - Configuration de Prettier
`.prettierrc`
```json .prettierc
{
    "arrowParens": "always", 
    "semi": true,
    "traillingComa": "all",
    "singleQuote": true,
    "printWith": 120,
    "tabWidth": 2,
    "bracketSpacing": true,
    "bracketLine": true,
    "endOfLine": "lf"
}
```

> Pour comprendre voir [ici](#explication-de-la-configuration-prettierrc)

### 10 - Installation de Jest
```bash
yarn add jest ts-jest @types/jest -D
```

Puis

```bash
jest --init
```

> ## Options à sélectionner :
> 
> Choose the test environment that will be used for testing: **Node**
>
> Do you want Jest to add coverage reports? **Yes**

#### 11 - Configuration de Jest
`jest.config.json`
```javascript
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: [
    "<rootDir>/test/**/*.test.ts"
  ]
};
```

> Si le test n'existe pas éditer **package.json** comme suit sinon passe à la suite

Ajouter les scripts suivants:
```json
{
    ...
    "scripts": {
        ...
        "test": "jest"
        "test:watch": "jest --watch"
    }
}
```

### 12 - Installation Husky
[Remonter au sommaire](#sommaire)
```bash
yarn add husky -D
``` 

### 13 - Configuration Husky dans **package.json**
```bash
npm set-script prepare "husky install"
nom run prepare
```
Puis dans `package.json` ajouter les propriétés à la fin du fichier:
```json
{
    ...
    "husky": {
        "hooks": {
            "pre-commit": "yarn lint"
            "pre-push" : "yarn test"
        } 
    }
}
```

Ajout des hooks :
```bash
npx husky add .husky/pre-commit "yarn lint"
```
et
```bash
npx husky add husky/pre-push "yarn test"
```

Test du hook pre-commit :
```bash
git add .
git commit -m <YOUR_MESSAGE_BETWEEN_DOUBLE_QUOTES>
```

> Si il y a un erreur le commit ne sera pas effectuer.

Il faudra y remerdier avec un ```yarn lint:fix``` si il y a beaucoup de warning et recommencer. Sinon aller corriger vos erreurs.

Test du hook pre-push :
```bash
git push origin <YOUR_BRANCH_NAME>
```

> Il est possible que sous ~~Windaube~~ `Windows`, `Yarn` et `Bash`; le script échoue lamentablement... pour cela suivez ce qui suit sinon je vous souhaite un bon ✌ **Happy Coding** 🤞

Polyfill ~~Windaube~~ Windows Edition, créer un fichier common.sh dans le dossier .husky.
```bash
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Windows 10, Git Bash and Yarn workaround
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```


### 14 - Edition tsconfig.json
[Remonter au sommaire](#sommaire)
```json
{
    "compilerOptions":
        {
            "target": "es2022",   // Ou moins pour la version de sorie ECMAScript.
            "module": "commonjs", // Pour uiliser import/export à la place de require/exports
            "outdir": "build",    // Reperoire de sortie
        },
    "include": [
        "src/**/*.ts"             // Declaration du code source pour la transpilation.
    ],
    "exclude": [
        "node_modules"            // Répertoires d'exlusion pour la transpilation.
    ]
}
```

Et inclure l'inclure dans vos fichier pre-* comme suit:

*APRES la déclaration husky.sh* 
```bash
. "$(dirname -- "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh" # <-- Ici uniquement bash est un langage UNIQUEMENT procédurale. 
```

## Explication de la configuration .prettierrc
[Remonter au sommaire](#sommaire)

| Clé            | Valeurs       | Description                                                                     |
|---------------:|:------------|:--------------------------------------------------------------------------------|
| arrowParens    | Boolean | Imprimez les points-virgules à la fin des instructions.  |
| bracketSpacing | Boolean | Imprimer les espaces entre les parenthèses dans les littéraux des objets. |
| endOfLine      | `lf`, `crlf`, `cr` ou `auto` | Uniformise la séquencde de fin de ligne avec:<br> `LineFeed` (**Linux**, **MacOS** et généralement sur les repos),<br> `Carriage Return`<br> ou les deux à la fois (par defaut ~~Windaube~~ **Windows**). | 
| printWidth     | Int | Spécifiez la longueur de chaque ligne (col).<br> **50 cols** préhistoriquement,<br>**80 cols** historiquement,<br> **120 cols** pour des petits écrans,<br> **200 cols** pour les écrans larges. |
| semi           | Boolean | Forcer les point-virgules à la fin de chaque instructions. |
| singleQuote    | Boolean | Remplace les guillemets **"** par des apostrophes **'**. Pour un souci d'optimisation. |
| tabWidth       | Int | Spécifiez le nombre d'espaces par niveau d'indentation. |
| traillingComa  | `as-needed`, `consistent` ou `preserve` | `as-needed` - Only add quotes around object properties where required.<br> `consistent` - If at least one property in an object requires quotes, quote all properties.<br> `preserve` - Respect the input use of quotes in object properties. |

*Toutes les explications se trouve sur la [documentation](https://prettier.io/docs/en/options.html) UNIQUEMENT en anglais.*

## Pourquoi utiliser 🐺 Husky 🐺
[Remonter au sommaire](#sommaire)

Ca évite pendant le déploiement de déclencher le linter et les tests à chaque opération et de faire échouer Docker par exemple.

Sinon il faudrait utiliser le flag `--ignore-scripts` pendant un `npm ci`. 

Le flag peut être utile aussi quand vous installer un module package et que vous avez pas totalement confiance. A ce moment là, il peut être utile d'utiliser

NPM
```bash
npm config set ignore-scripts true
```

YARN
```bash
yarn config set ignore-scripts true
```

Ca evitera de lancer les scripts malicieux en prod:
```json
{
    "name": "Shitty-example-package",
    "scripts": {
        "postinstall": "node evil-malicious-file.js"
    }
}
```

## 🧙‍♂️ Un fichier de configuration pour les gouverner tous 💍

[Remonter au sommaire](#sommaire)

Pour pourvoir editer des règles pour tous les IDE, il existe un fichier de configuration `EditorConfig` et des paramètres/extension pour chaque IDE.

Voir la [🐭 documentation 🐭](https://editorconfig.org/)

### JetBrains
![](https://resources.jetbrains.com/help/img/idea/2022.2/ij_export_editorconfig.png)
Les IDE jetbrains prennent les options standard mais on crée leur propres options [ici](https://www.jetbrains.com/help/idea/editorconfig.html)

### VSCode
Il faut télécharger l'extension [ici](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

### Sublimtext
Extension à télécharger [ici](https://packagecontrol.io/packages/EditorConfig)

Il suffit de créer un fichier `.editorconfig` (ça ressemble à du bash) qui possède très peu de propriétés:
```bash
# EditorConfig is awesome: https://EditorConfig.org

# Règle la plus important sinon tout les IDE l'ignore.
root = true

# Tout les fichiers
[*]
end_of_line = lf
insert_final_newline = true


# Type fichier spécifique, ici python
[*.py]
indent_style = space
indent_size = 4

# Correspondance avec des fichiers multiples
[*.{js,jsx,ts,tsx}]
charset = utf-8

# Dans un dossier spécifique et tous les sous répertoires
[src/**.{ts,tsx}]
indent_style = space
indent_size = 2

# Correspondance avec le nom exact des fichiers
[{package.json, .gitlab_ci.yml}]
indent_style = space
indent_style = 2
```

Les fichiers EditorConfig sont lus de haut en bas et les règles les plus récentes trouvées sont prioritaires. Les propriétés des sections EditorConfig correspondantes sont appliquées dans l'ordre où elles ont été lues, de sorte que les propriétés des fichiers les plus proches sont prioritaires.

### Condition dans les patrons

| Occurences | Description |
|-----------:|:------------|
| *          | Corespondance avec tous les caractères, excepté les séparateurs de chemin (/) |
| **         | Corespondance avec tous les caractères |
| ?          | Corespondande avec chaque caractère unique |
| [name]     | Corespondance avec tout les occurence unique |
| [!name]    | Corespondance avec tout caractère unique ne figurant pas dans le nom |
| {s1,s2,s3} | Corespondance avec tous les caractères données, la séparation avec la virgule équivaut à OU booléen |
| {num1...num2} | Correspondance avec tout les entiers entre ``num1`` et ``num2``, où num1 et num2 peuvent être positif ou négatif. |

### Propriété supporté

| Propriété    | Valeur(s) | Description  | Support     |        |   |
|-------------:|:---------:|:-------------|:-----------:|:------:|:-:|
|              |           |              |Jetbrain IDE| VSCode | SublimText|
| indent_style | `tab`<br> ou `space` | pour utiliser respectivement des tabulations dures ou des tabulations souples.|✔️|✔️|✔️|
| indent_size | Int | Un nombre entier définissant le nombre de colonnes utilisées pour chaque niveau d'indentation et la largeur des tabulations souples (si elles sont prises en charge). Lorsqu'il est défini sur tab, la valeur de ``tab_width`` (si elle est spécifiée) sera utilisée. |✔️|✔️|✔️|
| tab_width| int | un nombre entier définissant le nombre de colonnes utilisées pour représenter un caractère de tabulation. Par défaut, il s'agit de la valeur de ``indent_size`` et il n'est généralement pas nécessaire de la spécifier. |✔️|✔️|❌|
| end_of_line | `lf`, `cr`<br>ou `crlf`| Défini les retour lignes, retour chariot ou les deux pour controler la façon de représenter les sauts de lignes. |✔️|✔️|✔️|
| charset | ``latin``,<br> ``utf-8``,<br> ``utf-8-bom``, ``utf-16be``<br> ou ``utf-16le`` | Contrôle le jeu de caractères. |✔️|✔️|✔️|
| trim_trailing_whitespace | Boolean | Supprime tous les caractères d'espacement précédant les caractères de nouvelle ligne |✔️|✔️|✔️|
| inser_final_newline | Boolean | Assure que le fichier se termine par une nouvelle ligne lors de l'enregistrement. |✔️|✔️|✔️|
| root | Boolean | Doit être spécifiée en haut du fichier, en dehors de toute section. Défini à true pour arrêter la recherche des fichiers .editorconfig sur le fichier actuel. |✔️|✔️|✔️|

### Propriété Jetbrains pour Intellij IDEA (2022.2) uniquement

*Avant que la page disparaissent*

Options génériques d'IntelliJ qui ont le préfixe ij_ et sont applicables à toutes les langues :
* ij_visual_guides
* ij_formatter_off_tag
* ij_formatter_on_tag
* ij_formatter_tags_enabled
* ij_wrap_on_typing
* ij_continuation_indent_size
* ij_smart_tabs

*Jetbrains ne communique pas sur ce que ça modifie ni les valeurs corrspondantes.*

Options IntelliJ communes prises en charge par de nombreux langages (mais pas tous). Elles commencent par le préfixe ``ij_any``, par exemple, ``ij_any_brace_style``.

Options spécifiques au langage IntelliJ commençant par le préfixe `ij_<lang>_` où `<lang>` est l'ID du domaine de langue (normalement un nom de langue en minuscule), par exemple, `ij_java_blank_lines_after_imports`.

## Testons tous ça !

[Remonter au sommaire](#sommaire)

Remplacer le fichier index.ts avec ceci:
``index.ts``
```typescript
/**
 * Je suis un développeur rebelle, je laisse des console.log partout,
 * je mets pas de point virgule, je fais pas de retour à la ligne, j'indente pas,
 * je mets des type Any partout et encore moins de retour de type dans mes fonctions.
 * Et je vais tout commité comme un cochon avec "git add src/index.ts && git commit -m "Horray ! For anarchy. Come to me, Mouhahahaha !!!"
 */
console.warn("TEST")
console.error("TEST AGAIN")
console.log("FAILED TEST")

const makeMeAString = (arg:any,options?:{[key: string]: any}) => {return arg.toString()}

export default makeMeAString;
```

Une solution s'offre à notre jeune développeur, celle de passer son code avec `yarn lint:fix` ou `yarn lint --fix`.

`ìndex.ts`
```typescript
/**
 * Mais euh ! Mon bôôôoo codeuuu.
 * Cette fois-ci, ça passe.
 */
console.warn('TEST');
console.error('TEST AGAIN');
console.log('FAILED TEST');

const makeMeAString = (arg: string|number, options?: { [key: string]: string }) => {
  return arg.toString();
};

export default makeMeAString;
```

Débouter par husky, parce qu'il suit les règles il se retrouve toujours des conflits, notamment avec un console.log en trop et pas de retour de fonction.

`index.ts`
```typescript
/**
 * Lourd de chez lourd
 */
console.warn('TEST');
console.error('TEST AGAIN');
// console.log('FAILED TEST');

const makeMeAString = (
  arg: string | number,
  options?: { [key: string]: string }
): string => {
  return arg.toString();
};

export default makeMeAString;
```

Cette fois-ci après moult effort après avoir user de son terminal ou de son invite de commande. il a fini par supprimer toutes ses error. Prettier a supprimer tout les espaces en trop, à ajouter un retour ligne à la fin.

```typescript
/**
 * Super, je vais pouvoir pousser sur le repos.
 */
console.warn('TEST');
console.error('TEST AGAIN');
// console.log('FAILED TEST');

const makeMeAString = (
  arg: string | number,
  options?: { [key: string]: string }
): string => {
  return arg.toString();
};

export default makeMeAString;

```

Mais notre jeune amis, n'est pas au bout de ses peines. Il a ensuite les tests a passer. Et quand il passa la ligne de commande:
```bash
git push origin le_nom_de_sa_branch
```

Il reçu une nouvelle missive !

Un première erreur, une date est attendu...

Mais en ajoutant le type Date, il se retrouve avec plusieurs info. 

```bash
console.warn
    TEST

      2 |  * Lourd de chez lourd
      3 |  */
    > 4 | console.warn('TEST');
        |         ^
      5 | console.error('TEST AGAIN');
      6 | // console.log('FAILED TEST');
      7 |

      at Object.<anonymous> (src/index.ts:4:9)
      at Object.<anonymous> (test/index.test.ts:1:1)
```

```bash
console.error
    TEST AGAIN

      3 |  */
      4 | console.warn('TEST');
    > 5 | console.error('TEST AGAIN');
        |         ^
      6 | // console.log('FAILED TEST');
      7 |
      8 | const makeMeAString = (

      at Object.<anonymous> (src/index.ts:5:9)
      at Object.<anonymous> (test/index.test.ts:1:1)
```


```bash
Testology
    √ should always return a string with a random number (3 ms)
    × should return human readable full date with a Date (8 ms)

  ● Testology › should return human readable full date with a Date

    expect(received).toBe(expected) // Object.is equality

    Expected: "Jeudi 7 Avril 2022"
    Received: "Thu Apr 07 2022 00:00:00 GMT+0200 (heure d’été d’Europe centrale)"

      24 |
      25 |         expect(typeof TEST).toBe("string");
    > 26 |         expect(makeMeAString(TEST)).toBe(TARGET_DATE);
         |                                     ^
      27 |     });
      28 | });

      at Object.<anonymous> (test/index.test.ts:26:37)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        1.962 s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
husky - pre-push hook exited with code 1 (error)
error: failed to push some refs to 'https://gitlab.com/viseo-pwm-poc/share-dev-meta-info.git'
```

Il faut qu'il transforme son objet date en string. Mais n'écoutant que son courage il releva le défi.

```typescript
/**
 * J'ai pour gérer un case d'usage aussi moisi. :)
 */
 console.warn('TEST');console.error('TEST AGAIN');type YearDayType="numeric"|"2-digit"|undefined;interface DateType {language:string,country: string,weekday:"long"|"short"|"narrow"|undefined,month:"long"|"short"|"narrow"|"numeric"|"2-digit"|undefined,year:YearDayType,day:YearDayType}const makeMeAString = (arg:string|number|Date,options?:DateType):string=>{if(arg instanceof Date)arg.toLocaleString(`${options?.language}-${options?.country}`,{weekday:options?.weekday,month:options?.month,year:options?.year,day:options?.day});return arg.toString();};export default makeMeAString;
```

Après une correction du linter et du correction mineur

```typescript
/**
 * J'ai pour gérer un case d'usage aussi moisi. :)
 */
console.warn('TEST');
console.error('TEST AGAIN');

type YearDayType = 'numeric' | '2-digit' | undefined;

interface DateType {
  language: string | undefined;
  country: string | undefined;
  weekday: 'long' | 'short' | 'narrow' | undefined;
  month: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' | undefined;
  year: YearDayType;
  day: YearDayType;
}

const makeMeAString = (
  arg: string | number | Date,
  options?: DateType
): string => {

  if (arg instanceof Date)
    arg.toLocaleString(
      options?.language && options?.country
        ? `${options.language}-${options.country}`
        : undefined,
      {
        weekday: options?.weekday,
        month: options?.month,
        year: options?.year,
        day: options?.day,
      }
    );
    
  return arg.toString();
};
export default makeMeAString;

```