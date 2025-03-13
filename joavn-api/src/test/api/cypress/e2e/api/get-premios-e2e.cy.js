describe("Consulta de vencedores da categoria Pior Filme do Golden Raspberry Awards", () => {
  const id = "1";
  it("Validar o schema da resposta da API movies", () => {
    cy.api({
      method: "GET",
      url: "/movies/" + id,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.be.a("number");
      expect(response.body.year).to.be.a("number");
      expect(response.body.title).to.be.a("string");
      expect(response.body.studios).to.be.a("string");
      expect(response.body.producers).to.be.a("string");
      expect(response.body.winner).to.be.a("boolean");
    });
  });
  it("Validar os dados retornados na api movie", () => {
    cy.api({
      method: "GET",
      url: "/movies/" + id,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body.year).to.eq(1980);
      expect(response.body.title).to.eq("Can't Stop the Music");
      expect(response.body.studios).to.eq("Associated Film Distribution");
      expect(response.body.producers).to.eq("Allan Carr");
      expect(response.body.winner).to.eq(true);
    });
  });
  it("Tentar buscar um filme inexistente", () => {
    cy.api({
      failOnStatusCode: false,
      method: "GET",
      url: "/movies/0",
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
  it("Tentar buscar um filme com ID inválido", () => {
    cy.api({
      failOnStatusCode: false,
      method: "GET",
      url: "/movies/$$",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq("Bad Request");
    });
  });
  it("Realizar busca por filme vencedor", () => {
    cy.api({
      method: "GET",
      url: "/movies/" + id,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.winner).to.eq(true);
    });
  });
  it("Validar que a API responde em menos de 500ms", () => {
    cy.api({
      method: "GET",
      url: "/movies/" + id,
    }).then((response) => {
      expect(response.duration).to.be.lessThan(500);
    });
  });
});
