describe("Remocao de contato", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("deve remover o primeiro contato da lista", () => {
    cy.get(".contato").its("length").as("totalAntes");

    cy.get(".contato").first().find(".delete").click();

    cy.get("@totalAntes").then((totalAntes) => {
      cy.get(".contato").should("have.length", Number(totalAntes) - 1);
    });
  });
});
