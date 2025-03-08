describe("Consulta de vencedores da categoria Pior Filme do Golden Raspberry Awards", () => {
  it("Validar que a API retorna dados do produtor com maior intervalo entre dois prêmios consecutivos", () => {
    cy.api({
      method: "GET",
      url: "/movies/award-intervals",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("max");
      const maxIntervals = response.body.max;
      expect(maxIntervals).to.be.an("array").that.is.not.empty;
      expect(maxIntervals[0]).to.have.all.keys(
        "producer",
        "interval",
        "previousWin",
        "followingWin"
      );
      const minIntervals = response.body.min;
      expect(minIntervals[0].interval).to.be.at.most(maxIntervals[0].interval);
    });
  });
  it("Validar que a API retorna dados do produtor que obteve dois prêmios mais rápido", () => {
    cy.api({
      method: "GET",
      url: "/movies/award-intervals",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("min");
      const minIntervals = response.body.min;
      expect(minIntervals).to.be.an("array").that.is.not.empty;
      expect(minIntervals[0]).to.have.all.keys(
        "producer",
        "interval",
        "previousWin",
        "followingWin"
      );
      const maxIntervals = response.body.max;
      expect(minIntervals[0].interval).to.be.at.most(maxIntervals[0].interval);
    });
  });
  it("Tentar consultar os intervalos de premios dos produtos consultando em um endpoint invalido", () => {
    cy.api({
      method: "GET",
      failOnStatusCode: false,
      url: "/movies/award-",
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
  it("Validar o performance da API para a resposta da consulta", () => {
    const maxResponseTime = 100;
    cy.api({
      method: "GET",
      url: "/movies/award-intervals",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(maxResponseTime);
      cy.log(`API Response Time: ${response.duration} ms`);
    });
  });
  const NUM_REQUESTS = 100;
  it("Deve validar o tempo de resposta para múltiplas requisições", () => {
    const requests = [];

    for (let i = 0; i < NUM_REQUESTS; i++) {
      requests.push(
        cy.api("/movies/award-intervals").then((response) => {
          expect(response.status).to.eq(200);
          expect(response.duration).to.be.lessThan(1000);
        })
      );
    }
    Promise.all(requests).then(() => {
      cy.log(`Executadas ${NUM_REQUESTS} requisições simultâneas com sucesso.`);
    });
  });

  it("Deve medir o tempo médio de resposta da API", () => {
    const responseTimes = [];
    for (let i = 0; i < NUM_REQUESTS; i++) {
      cy.api("/movies/award-intervals").then((response) => {
        responseTimes.push(response.duration);
      });
    }
    cy.wrap(responseTimes).then((durations) => {
      const totalDuration = durations.reduce((acc, val) => acc + val, 0);
      const avgDuration = totalDuration / durations.length;
      cy.log(`Tempo médio de resposta: ${avgDuration.toFixed(2)} ms`);
      expect(avgDuration).to.be.lessThan(1000);
    });
  });
});
