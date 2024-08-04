describe('ArcDetails Component', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://onepiecearcsapi3d2y-0729a9eea5cc.herokuapp.com/api/data', { fixture: 'arcs.json' }).as('getArcs');
    cy.visit('/arcs/romance-dawn-arc');
    cy.wait('@getArcs');
  });

  it('renders correctly with required props', () => {
    cy.contains('Romance Dawn Arc').should('be.visible');
    cy.contains('Start on Chapter: 1').should('be.visible');
    cy.contains('Total Chapters: 7').should('be.visible');
    cy.contains('Start on Episode: 1').should('be.visible');
    cy.contains('Total Episodes: 3').should('be.visible');
    cy.contains('Major Players:').should('be.visible');
    cy.contains('Luffy, Zoro, Nami').should('be.visible');
  });

  it('toggles the visibility of the Importance section', () => {
    cy.contains('Show Importance').click();
    cy.contains('Introduction to the main characters and their motivations.').should('be.visible');
    cy.contains('Hide Importance').click();
    cy.contains('Introduction to the main characters and their motivations.').should('not.exist');
  });

  it('toggles the visibility of the Major Spoiler Moment section', () => {
    cy.contains('Show Major Spoiler Moment').click();
    cy.contains('Luffy defeats Alvida.').should('be.visible');
    cy.contains('Hide Major Spoiler Moment').click();
    cy.contains('Luffy defeats Alvida.').should('not.exist');
  });

  it('navigates back to the home page when clicking the back link', () => {
    cy.contains('Back to Home').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
