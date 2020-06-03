describe('Searching with a query', () => {
  beforeEach(() => {
    return cy.visit('/');
  });

  it('should list repositories from github and traverse pages', () => {
    cy.findByPlaceholderText('Search Github ...')
      .type('react')
      .type('{enter}');
    cy.findByTestId('loading').should('not.be.visible');
    cy.findAllByText('facebook').should('be.visible');
    cy.findAllByText('react-router').should('be.visible');
    cy.findAllByLabelText('Go to next page').click();
    cy.findByTestId('loading').should('not.be.visible');
    cy.findAllByText('next.js').should('be.visible');
    cy.findAllByLabelText('Go to page 4').click();
    cy.findAllByText('reaction').should('be.visible');
  });

  it('clicks on repository and open page', () => {
    cy.findByPlaceholderText('Search Github ...')
      .type('vue')
      .type('{enter}');
    cy.findAllByText('vue').first().click();
    cy.assertRoute('/repos/vuejs/vue');
    cy.findAllByText('vuejs/vue').should('be.visible');
    cy.findAllByText('README.md').should('be.visible');
  });
});
