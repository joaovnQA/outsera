import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import elements from "../../../fixtures/sign-up/elements";
const typeUserName = "joaovn_";
const typePassword = "Jna-9060";
import { faker } from "@faker-js/faker";
let bookName;
Given("Adiciono um produto no carinho", () => {
  cy.get('[class="card-title my-2"] a strong')
    .first()
    .invoke("text")

    .then((text) => {
      bookName = text.trim();
    });
  cy.get('button:contains("Add to Cart")').first().click({ force: true });
});
When("Clico no botão do carinho", () => {
  cy.get(elements.clickCarrinho).last().click();
});
When("Valido que o produto selecionado foi armazenado corretamente", () => {
  cy.contains(bookName);
});
When("Clico no botão checkout", () => {
  cy.contains("button", " CheckOut ").click();
});
Then("Realizo login", () => {
  cy.get(elements.loginUserName).type(typeUserName, { log: false });
  cy.get(elements.loginPassword).type(typePassword, { log: false });
  cy.get(elements.loginButton).last().click({ force: true });
});
When("Valido que a tela de checkout foi acessada", () => {
  cy.url().should("include", "/checkout");
});

When("Adiciono um livro no carrinho", () => {
  cy.get('button:contains("Add to Cart")').first().click({ force: true });
  cy.get(elements.clickCarrinho).last().click();
  cy.contains("button", " CheckOut ").click();
  cy.url().should("include", "/checkout");
});
When("Preencho os dados para entrega", () => {
  cy.get(elements.addressName).type(faker.location.streetAddress());
  cy.get(elements.address1).type(faker.location.secondaryAddress());
  cy.get(elements.address2).type(faker.location.city());
  cy.get(elements.pincode).type("123456");
  cy.get(elements.state).type(faker.location.state());
});
When("Clico em  Place Order", () => {
  cy.contains("button", " Place Order ").click();
});
When("Valido que a ordem foi gerada com sucesso", () => {
  cy.url().should("include", "/myorders");
  cy.get('[class*="orderId"]').eq(1).should("be.visible");
});
