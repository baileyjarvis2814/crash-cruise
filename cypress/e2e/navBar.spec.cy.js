describe('NavBar Search and Favorite Filter Functionality', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/data', { fixture: 'twoArcs.json' }).as('getArcs');
    cy.visit('https://crash-cruise-5fvu17yu0-jarvis-projects-77e68e1c.vercel.app/');
    cy.wait('@getArcs');
  });

  it('renders both arcs initially', () => {
    cy.contains('Romance Dawn Arc').should('be.visible');
    cy.contains('Orange Town Arc').should('be.visible');
  });

  it('filters arcs based on search input', () => {
    cy.get('input[placeholder="Search for an arc..."]').type('Romance');
    cy.contains('Romance Dawn Arc').should('be.visible');
    cy.contains('Orange Town Arc').should('not.exist');

    cy.get('input[placeholder="Search for an arc..."]').clear();

    cy.get('input[placeholder="Search for an arc..."]').type('Orange');
    cy.contains('Romance Dawn Arc').should('not.exist');
    cy.contains('Orange Town Arc').should('be.visible');
  });

  it('displays no arcs when search input does not match any arc', () => {
    cy.get('input[placeholder="Search for an arc..."]').type('Nonexistent Arc');
    cy.contains('Romance Dawn Arc').should('not.exist');
    cy.contains('Orange Town Arc').should('not.exist');
    cy.contains('No arcs found').should('be.visible');
  });

  it('filters arcs to show only favorites', () => {
    cy.contains('Romance Dawn Arc').parent().find('button').click();
    cy.contains('Unfavorite').should('be.visible');

    cy.contains('Show Favorite Arcs').click();
    cy.contains('Romance Dawn Arc').should('be.visible');
    cy.contains('Orange Town Arc').should('not.exist');

    cy.contains('Show All Arcs').click();
    cy.contains('Romance Dawn Arc').should('be.visible');
    cy.contains('Orange Town Arc').should('be.visible');
  });
});
