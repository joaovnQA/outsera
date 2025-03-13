import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import elements from "../../../fixtures/sign-up/elements";
const typeFirstName = faker.person.firstName();
const typeLastName = faker.person.lastName();
const typeUserName = faker.internet.userName({ typeFirstName, typeLastName });
const typePassword = "Test-6090";
Given("Visito uma pagina web", () => {
  cy.intercept("GET", "**/api/book/GetCategoriesList").as("getCategories");
  cy.visitWebPage();
  cy.wait("@getCategories");
});
When("Verifico que a pagina foi acessada com sucesso", () => {
  cy.contains("button", " Book Cart ");
});
Then("Acesso a pagina de login", () => {
  cy.contains("button", " Login ").click();
});
When("Valido que a pagina foi acessada com sucesso", () => {
  cy.url().should("include", "/login");
});
When("Clico em Register", () => {
  cy.contains("button", "Register").wait(800).click();
});
When("Valido que a pagina de register foi acessada com sucesso", () => {
  cy.url().should("include", "/register");
});
Then("Preencho o formulado de signup", () => {
  cy.get(elements.firstName).type(typeFirstName);
  cy.get(elements.lastName).type(typeLastName);
  cy.get(elements.userName).type(typeUserName);
  cy.get(elements.passwordName).type(typePassword, { log: false });
  cy.get(elements.confirmPasswordName).type(typePassword, { log: false });
  cy.get(elements.checkGender).check();
});
When("Valido que a conta foi criada com sucesso", () => {
  cy.contains("Registration successful");
});
