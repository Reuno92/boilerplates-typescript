describe('Navigation', () => {
  const PROTOCOL = 'http';
  const BASE_URL = 'localhost';
  const PORT = 3000;

  it('should navigate to the about page', () => {
    // Démarrage sur la page d'index
    cy.visit(`${PROTOCOL}://${BASE_URL}:${PORT}`);

    // Trouver un lien avec l'attribut href contenant "about" et clique dessus.
    cy.get('#main-nav a[href*="about"]').click();

    // Se situant dans une url incluant "/about"
    cy.url().should('include', '/about');

    // La page nouvellement chargée contient un intitulé du nom de 'About Page'
    cy.contains('h1', 'About Page');
  });
});

const asModule = {};
export default asModule;
