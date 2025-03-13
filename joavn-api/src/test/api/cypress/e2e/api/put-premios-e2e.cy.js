import { faker } from "@faker-js/faker";
describe("Consulta de vencedores da categoria Pior Filme do Golden Raspberry Awards", () => {
  let movieId;
  let movieData;
  it("Consultar um Filme", () => {
    cy.api({
      method: "GET",
      url: `/movies/1886`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      movieData = response.body;
      movieId = movieData.id;
      expect(movieData).to.have.all.keys(
        "id",
        "year",
        "title",
        "studios",
        "producers",
        "winner"
      );
    });
  });
  it("Atualizar os dados do Filme consultado", () => {
    const updatedData = {
      ...movieData,
      title: "Novo Título Atualizado",
      year: 2025,
    };
    cy.api("PUT", `/movies/${movieId}`, updatedData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("Novo Título Atualizado");
      expect(response.body.year).to.eq(2025);
    });
  });
  it("Validar que a atualização foi aplicada no GET", () => {
    cy.api("GET", `/movies/${movieId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("Novo Título Atualizado");
      expect(response.body.year).to.eq(2025);
    });
  });
  it("Tentar atualizar um filme inexistente", () => {
    const updatedData = {
      title: "Filme Não Existente",
      studios: "Studio Teste",
      producers: "Produtor Teste",
      year: 2023,
      winner: true,
    };
    cy.api({
      method: "PUT",
      url: "/movies/$$$$",
      body: updatedData,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq("Bad Request");
    });
  });
  it("Atualizar apenas um campo", () => {
    cy.api("PUT", `/movies/1886`, { title: "Novo Título Simples" }).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("Novo Título Simples");
      }
    );
  });
  it("Deve responder em menos de 500ms", () => {
    const updatedData = {
      title: "Título Rápido",
      studios: "Studio Teste",
      producers: "Produtor Teste",
      year: 2024,
      winner: false,
    };
    cy.api("PUT", `/movies/1886`, updatedData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(500);
    });
  });
});
