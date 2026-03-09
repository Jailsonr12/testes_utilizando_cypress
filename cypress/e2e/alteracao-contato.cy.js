describe("Alteracao de contato", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("deve alterar o primeiro contato para Suyanne", () => {
    const nomeAtualizado = "Suyanne";

    cy.get(".contato").first().within(() => {
      cy.get("li").eq(0).invoke("text").as("nomeOriginal");
    });

    cy.get(".contato").first().find(".edit").click();
    cy.get('input[placeholder="Nome"]').clear().type(nomeAtualizado);
    cy.get("button.alterar").click();

    cy.get(".contato").first().should("contain", nomeAtualizado);
  });
});
