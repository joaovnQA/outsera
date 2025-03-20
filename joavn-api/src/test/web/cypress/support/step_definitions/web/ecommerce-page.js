import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import elements from "../../../fixtures/sign-up/elements";
const typeFirstName = faker.person.firstName();
const typeLastName = faker.person.lastName();
const typeUserName = faker.internet.userName({ typeFirstName, typeLastName });
const typePassword = "Test-6090";
Given("Visito uma pagina web", () => {
  cy.visitWebPage();
});
When("Verifico que a pagina foi acessada com sucesso", () => {
  cy.contains("a", "PRODUCT STORE");
});
Then("Acesso a pagina de login", () => {
  cy.get("#login2").click();
});
When("Valido que a pagina foi acessada com sucesso", () => {
  cy.contains('div [class="modal-title"]', "Log in");
});
When("Acesso a pagina de signup", () => {
  cy.get("#signin2").click();
});
Then("Preencho o formulario de signup", () => {
  cy.contains("div #signInModalLabel", "Sign up");
  cy.get(elements.userName).type(typeUserName);
  cy.get(elements.passwordName).type(typePassword, { log: false });
  cy.contains(elements.registerButton, "Sign up").click({ force: true });
});
When("Valido que a conta foi criada com sucesso", () => {
  cy.on("window:alert", (text) => {
    expect(text).to.equal("Sign up successful.");
  });
});
When("valido que a pagina cart foi acessada", () => {
  cy.url().should("include", "cart");
});
When("Clico em Place Order", () => {
  cy.contains("button", "Place Order").click();
  cy.contains(elements.placeOrderTitle, "Place order");
});

When("Preencho o Place order", () => {
  cy.get(elements.placeOrderName).wait(600).type(typeFirstName);
  cy.get(elements.placeOrderCountry).type(faker.location.country());
  cy.get(elements.placeOrderCity).type(faker.location.city());
  cy.get(elements.placeOrderCreditCard).type(faker.finance.creditCardNumber());
  cy.get(elements.placeOrderMonth).type(faker.date.month());
  cy.get(elements.placeOrderYear).type(
    faker.date.future().getFullYear().toString()
  );
});

When("Clico em Purchase", () => {
  cy.contains("button", "Purchase").click();
});
When("Confirmo que a compra foi realizada com sucesso", () => {
  cy.contains("Thank you for your purchase!");
});
