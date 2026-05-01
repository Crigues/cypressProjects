import { locLogin } from './support/locators/exemple'// Pasta Locators

Cypress.Commands.add('login', (cpf, senha) => {
  cy.get('#cpf').type(cpf)
  cy.get('#senha').type(senha)
})