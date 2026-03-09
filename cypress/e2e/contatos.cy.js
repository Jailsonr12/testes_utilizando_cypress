function novoContato(prefixo) {
  const id = Date.now();

  return {
    nome: `${prefixo} ${id}`,
    email: `teste${id}@mail.com`,
    telefone: `1199${String(id).slice(-6)}`
  };
}

function preencherFormulario(contato) {
  cy.get('input[placeholder="Nome"]').clear().type(contato.nome);
  cy.get('input[placeholder="E-mail"]').clear().type(contato.email);
  cy.get('input[placeholder="Telefone"]').clear().type(contato.telefone);
}

function adicionarContato(contato) {
  preencherFormulario(contato);
  cy.get("button.adicionar").click();
}

function cardDoContato(nome) {
  return cy.contains(".contato", nome);
}

describe("Agenda de contatos", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("deve incluir um novo contato", () => {
    const contato = novoContato("Contato Inclusao");

    adicionarContato(contato);

    cardDoContato(contato.nome).within(() => {
      cy.contains(contato.telefone).should("be.visible");
      cy.contains(contato.email).should("be.visible");
    });
  });

  it("deve alterar um contato existente", () => {
    const original = novoContato("Contato Edicao");
    const atualizado = {
      nome: `${original.nome} Atualizado`,
      email: original.email.replace("@mail.com", ".edit@mail.com"),
      telefone: "11988887777"
    };

    adicionarContato(original);
    cardDoContato(original.nome).contains("button", "Editar").click();

    preencherFormulario(atualizado);
    cy.get("button.alterar").click();

    cardDoContato(atualizado.nome).within(() => {
      cy.contains(atualizado.telefone).should("be.visible");
      cy.contains(atualizado.email).should("be.visible");
    });
  });

  it("deve remover um contato", () => {
    const contato = novoContato("Contato Remocao");

    adicionarContato(contato);
    cardDoContato(contato.nome).contains("button", "Deletar").click();

    cy.contains(".contato", contato.nome).should("not.exist");
  });
});
