// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// const common = require('../fixtures/Pages/common-elements').elements
const baseURLDash = Cypress.config("baseURLDash");
const common = require('../support/pages/common/elements').elements;
Cypress.Commands.add('search', (term) => {
  cy.get('input[type="text"]')
    .should('be.visible')
    .clear()
    .type(`${term}{enter}`);
});
Cypress.Commands.add('token', () => {
  cy.fixture('login.json').then((login) => {
    const CLIENT_ID = login.CLIENT_ID;
    const CLIENT_SECRET = login.CLIENT_SECRET;
    cy.log(`Running against ${Cypress.env('environment')} environment`);
    cy.intercept('GET', '**/search**').as('getStories');
    cy.clearCookies();
    cy.api({
      method: 'POST',
      url: 'oauth/tokens',
      body: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      const token = response.body.access_token;
      Cypress.env('AUTH_TOKEN', token);
    });
  });
});

Cypress.Commands.add('visitDash', () => {
  cy.visit(baseURLDash);
  cy.fixture('login.json').then((loginDash) => {
    const email = loginDash.user;
    const password = loginDash.password;
    cy.get(common.typeEmail).type(email);
    cy.get(common.typePassword).type(password);
  });
  cy.get(common.clickLogin).click({ force: true });
  cy.get('[class*="OverviewModuleWelcomeBoxContainer-sc"]').should('be.visible');
});

Cypress.Commands.add('logoff', () => {
  cy.get('[class="profile-menu"]').click({ force: true });
  cy.get('[class="profile-menu--logout"]').click({ force: true });
});

Cypress.Commands.add('deleteLivechat', () => {});
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
