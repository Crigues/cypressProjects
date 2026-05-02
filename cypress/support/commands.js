import { locLogin } from './locators/exemple'// Pasta Locators

Cypress.Commands.add('gerarEvidencia', (nome) => {
  cy.wait(500) // opcional, para estabilizar tela
  cy.screenshot(nome, { capture: 'viewport' })
})

// Cypress.Commands.add('realizarLogin', (cpf, senha) => {
//   cy.visit('https://front.serverest.dev/login')
//   cy.gerarEvidencia('Tela de login exbida com sucesso')
// })

Cypress.Commands.add('realizarLoginFalse', (dados) => {
  cy.visit('https://front.serverest.dev/login')
  cy.gerarEvidencia('Tela de login exibida com sucesso')
  cy.get(locLogin.login.campoLogin).type(dados.emailFalse)
  cy.get(locLogin.login.campoSenha).type(dados.senha)
  cy.get(locLogin.login.btnAcessar).click()
  cy.get(locLogin.login.alertError).should('contain.text', 'Email e/ou senha inválidos')
  cy.gerarEvidencia('Dados invalidos de login preenchidos')
  cy.get(locLogin.login.closeAlert).click()
  cy.get(locLogin.login.campoLogin).clear().type(dados.email)
  cy.get(locLogin.login.campoSenha).clear().type(dados.senhaFalse)
  cy.get(locLogin.login.btnAcessar).click()
  cy.get(locLogin.login.alertError).should('contain.text', 'Email e/ou senha inválidos')
  cy.gerarEvidencia('Dados invalidos de login preenchidos')
})

Cypress.Commands.add('realizarCadastro', (dados) => {
  cy.visit('https://front.serverest.dev/login')
  cy.gerarEvidencia('Tela de login exibida com sucesso')
  cy.get(locLogin.login.campoLogin).type(dados.email)
  cy.get(locLogin.login.campoSenha).type(dados.senha)
  cy.get(locLogin.login.btnAcessar).click()
  cy.gerarEvidencia('Dados invalidos de login preenchidos')
  cy.get(locLogin.login.btnCadastrar).click()
  cy.get(locLogin.login.cadastro.titulo).should('contain.text', 'Cadastro')
  cy.get(locLogin.login.cadastro.campoNome).type(dados.nome)
  cy.get(locLogin.login.cadastro.campoEmail).type(dados.email)
  cy.get(locLogin.login.cadastro.campoSenha).type(dados.senha)
  cy.get(locLogin.login.cadastro.checkbox).check()
  cy.get(locLogin.login.cadastro.btnCadastrar).click()
  cy.get(locLogin.login.cadastro.alertSuccess).should('contain.text', 'Cadastro realizado com sucesso')
  cy.gerarEvidencia('Dados válidos de login preenchidos')
})

Cypress.Commands.add('realizarLogin', (dados) => {
  cy.visit('https://front.serverest.dev/login')
  cy.gerarEvidencia('Tela de login exibida com sucesso')
  cy.get(locLogin.login.campoLogin).type(dados.email)
  cy.get(locLogin.login.campoSenha).type(dados.senha)
  cy.get(locLogin.login.btnAcessar).click()
  cy.gerarEvidencia('Dados válidos de login preenchidos')
})