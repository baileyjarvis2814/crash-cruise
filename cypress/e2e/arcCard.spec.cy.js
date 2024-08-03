describe('ArcCard Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/data', { fixture: 'twoArcs.json' }).as('getArcs');
    cy.visit('http://localhost:3000/');
    cy.wait('@getArcs');
  });

  it('renders correctly with required props', () => {
    cy.contains('Romance Dawn Arc').should('be.visible');
    cy.contains('Total Chapters: 7').should('be.visible');
    cy.contains('Total Episodes: 3').should('be.visible');
  });

  it('allows favoriting and unfavoriting an arc', () => {
    cy.contains('Romance Dawn Arc').parent().find('button').click();
    cy.contains('Romance Dawn Arc').parent().contains('Unfavorite').should('be.visible');
    cy.contains('Romance Dawn Arc').parent().contains('Unfavorite').click();
    cy.contains('Romance Dawn Arc').parent().contains('Favorite').should('be.visible');
  });
});
