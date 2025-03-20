import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import elements from "../../../fixtures/sign-up/elements";
const typeUserName = "joaovn_1";
const typePassword = "jna-3040";
let bookName;

When("realizo login", () => {
  cy.get(elements.loginUserName).wait(600).type(typeUserName);
  cy.get(elements.loginPassword).type(typePassword, { log: false });
  cy.contains(elements.registerButton, "Log in").click({ force: true });
});

Given("Adiciono produto no carrinho", () => {
  cy.get('[class="hrefch"]')
    .first()
    .invoke("text")

    .then((text) => {
      bookName = text.trim();
    });
  cy.get('[class="card-img-top img-fluid"]').first().click({ force: true });
});
When("Valido que o produto selecionado foi armazenado corretamente", () => {
  cy.contains(bookName);
});
When("Clico em Add to cart", () => {
  cy.contains("a", "Add to cart").click();
  cy.on("window:alert", (text) => {
    expect(text).to.equal("Product added");
  });
});
When("Clico em cart no menu da pagina", () => {
  cy.contains("a", "Cart").click();
});
