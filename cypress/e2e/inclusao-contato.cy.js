describe("Inclusao de contato", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("deve incluir um novo contato", () => {
    const nome = "Jailson";
    const email = "jailson@mail.com";
    const telefone = "11912345678";

    cy.get('[type="text"]').clear().type(nome);
    cy.get('[type="email"]').clear().type(email);
    cy.get('[type="tel"]').clear().type(telefone);
    cy.get("button.adicionar").click();

    cy.contains(".contato", nome).should("be.visible");
    cy.contains(".contato", email).should("be.visible");
    cy.contains(".contato", telefone).should("be.visible");
  });
});
