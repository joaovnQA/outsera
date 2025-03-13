import { faker } from "@faker-js/faker";
describe("Consulta de vencedores da categoria Pior Filme do Golden Raspberry Awards", () => {
  let movieId;
  const body = {
    title: faker.lorem.words(3),
    studios: faker.company.name(),
    producers: faker.person.fullName(),
    year: faker.number.int({ min: 1980, max: 2024 }),
    winner: faker.datatype.boolean(),
  };
  it("Validar que um novo filme é criado com sucesso", () => {
    cy.api({
      method: "POST",
      url: "/movies",
      body: body,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.id).to.be.a("number");
      expect(response.body.year).to.be.a("number");
      expect(response.body.title).to.be.a("string");
      expect(response.body.studios).to.be.a("string");
      expect(response.body.producers).to.be.a("string");
      expect(response.body.winner).to.be.a("boolean");

      movieId = response.body.id;
    });
  });
  it("Validar que o filme foi criado no GET movies", () => {
    cy.api({
      method: "GET",
      url: `/movies/${movieId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(movieId);
    });
  });
  it("Tentar criar um novo filme não enviando o body", () => {
    cy.api({
      method: "POST",
      url: "/movies",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq("Bad Request");
    });
  });
  it("Deve responder em menos de 500ms", () => {
    cy.api({
      method: "POST",
      url: "/movies",
      body: body,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.duration).to.be.lessThan(500);
    });
  });
});
