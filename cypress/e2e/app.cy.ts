import UserModel from '../../model/abstract/user/User.model';

const TEST_PROPERTIES = (index: number, valueToTest: string) => {
  cy.get('.list-group-item').eq(index).should('include.text', valueToTest);
};

describe('Navigation', () => {
  const PROTOCOL = 'http';
  const BASE_URL = 'localhost';
  const PORT = 3000;

  const DATA: Promise<Array<UserModel>> = fetch('https://jsonplaceholder.typicode.com/users/').then(response => response?.json());

  beforeEach(() => {
    // Démarrage sur la page d'index
    cy.visit(`${PROTOCOL}://${BASE_URL}:${PORT}`);
  });

  context('From Home Page', () => {
    it('should navigate to the about page', () => {
      // Trouver un lien avec l'attribut href contenant "about" et clique dessus.
      cy.get('#main-nav a[href*="about"]').click();

      // Se situant dans une url incluant "/about"
      cy.url().should('include', '/about');

      // La page nouvellement chargée contient un intitulé du nom de 'About Page'
      cy.contains('h1', 'About Page');
    });

    it('should navigate between users and select random user', async () => {
      const USERS: Array<UserModel> = await DATA;
      const RANDOM: number = Math.round(Math.random() * USERS.length);
      const NAVIGATION: number = RANDOM !== USERS.length ? RANDOM - 1 : RANDOM;
      // eslint-disable-next-line security/detect-object-injection
      const USER: UserModel = USERS[NAVIGATION];

      // Chercher un utilisateur au hasard et on clique dessus.
      // eslint-disable-next-line security/detect-object-injection
      cy.get('#users > ul').children('li').eq(NAVIGATION).contains(USERS[NAVIGATION]?.username).click();

      // Vérifie l'url.
      cy.url().should('include', `/user/${RANDOM}`);

      // On vérifie les titres.
      cy.contains('h1', `${USER?.username}`);
      cy.contains('h2', 'Address');

      // On vérifie toutes les données.
      TEST_PROPERTIES(0, USER?.address?.street);
      TEST_PROPERTIES(1, USER?.address?.suite);
      TEST_PROPERTIES(2, USER?.address?.zipcode);
      TEST_PROPERTIES(3, USER?.address?.city);
      TEST_PROPERTIES(4, USER?.email);
      TEST_PROPERTIES(5, USER?.website);
      TEST_PROPERTIES(6, USER?.phone);
    });
  });
});

const asModule = {};
export default asModule;
