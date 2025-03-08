class liveblog {
  constructor() {
    this.cardLiveblog = '[class="events--item--info"] a';
    this.liveblog = '[class="new-post-body"]';
    this.posts = '[class*="LivePlayByPlayContainer"]';
    this.dropdown = '[class="arena-dropdown--icon ion-android-more-vertical"]';
    this.editPosts = '[class="arena-dropdown--item"]';
    this.modalDeletePerson =
      '[class*="LiveNewPostActionsPlayerOptionInputWrapper"] [class*="LiveNewPostActionsPlayerClearIcon"]';
    this.clickSalvar = '[class="ladda-button btn btn-arena"]';
  }
  consultLiveblog() {
    cy.get(this.cardLiveblog).first().click({ force: true });
    cy.get(this.liveblog).should('be.visible');
  }
  liveblogPosts() {
    cy.get(this.posts).should('be.visible');
    cy.get(this.dropdown).first().click({ force: true });
    cy.get(this.editPosts).contains('Editar Post').click({ force: true });
    cy.get(this.modalDeletePerson).click({ force: true });
    cy.get(this.clickSalvar).last().click({ force: true });
  }
}

export default new liveblog();
