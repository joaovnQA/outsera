const organizationId = Cypress.config("organizationId");

class ConsultSites {
  constructor() {
    this.firstId = null;
  }

  getSites() {
    return cy
      .api({
        method: 'GET',
        url: 'organizations/' + organizationId + '/sites',
        headers: {
          Authorization: `Bearer ${Cypress.env('AUTH_TOKEN')}`,
        },
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        response.body.forEach((item) => {
          expect(item.id).to.be.a('string');
          this.firstId = response.body[0].id;
        });
        return this.firstId;
      });
  }

  getFirstId() {
    return this.firstId;
  }
}

export default new ConsultSites();
