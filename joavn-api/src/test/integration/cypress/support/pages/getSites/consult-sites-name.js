const organizationId = Cypress.config("organizationId");

class ConsultSitesName {
  constructor() {
    this.nameSite = null;
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
          expect(item.name).to.be.a('string');
          this.nameSite = response.body[0].name;
        });
        return this.nameSite;
      });
  }

  getNameSite() {
    return this.nameSite;
  }
}

export default new ConsultSitesName();
