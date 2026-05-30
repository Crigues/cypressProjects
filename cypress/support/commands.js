import { locLogin } from './locators/exemple'// Pasta Locators
import { faker } from '@faker-js/faker'

Cypress.Commands.add('gerarEvidencia', (nome) => {
  cy.wait(500) // opcional, para estabilizar tela
  cy.screenshot(nome, { capture: 'viewport' })
})

Cypress.Commands.add('realizarLoginInvalido', (dados) => {
  cy.intercept('POST', '**/login').as('postLogin')
  cy.get(locLogin.login.campoLogin).clear().type(dados.email)
  cy.get(locLogin.login.campoSenha).clear().type(dados.senha)
  cy.get(locLogin.login.btnAcessar).click()

  cy.wait('@postLogin').its('response.statusCode').should('eq', 401)

  cy.get(locLogin.login.alertError).should('be.visible').and('contain.text', 'Email e/ou senha inválidos')
  cy.gerarEvidencia(`Tentativa de login inválida - Email: ${dados.email}`)
})

Cypress.Commands.add('realizarCadastro', (dados) => {
  cy.intercept('POST', '**/usuarios').as('postUsuarios')
  cy.get(locLogin.login.btnCadastrar).click()
  cy.get(locLogin.login.cadastro.titulo).should('contain.text', 'Cadastro')
  cy.get(locLogin.login.cadastro.campoNome).type(dados.nome)
  cy.get(locLogin.login.cadastro.campoEmail).type(dados.email)
  cy.get(locLogin.login.cadastro.campoSenha).type(dados.senha)

  if (dados.admin === true) { cy.get(locLogin.login.cadastro.checkbox).check() }

  cy.get(locLogin.login.cadastro.btnCadastrar).click()
  cy.wait('@postUsuarios').its('response.statusCode').should('eq', 201)

  cy.get(locLogin.login.cadastro.alertSuccess).should('contain.text', 'Cadastro realizado com sucesso')
  cy.gerarEvidencia('Dados válidos de login preenchidos')
})

Cypress.Commands.add('realizarLogin', (dados) => {
  cy.intercept('POST', '**/login').as('postLogin')
  cy.get(locLogin.login.campoLogin).type(dados.email)
  cy.get(locLogin.login.campoSenha).type(dados.senha)
  cy.gerarEvidencia('Dados válidos de login preenchidos')
  cy.get(locLogin.login.btnAcessar).click()

  cy.wait('@postLogin').its('response.statusCode').should('eq', 200)
  cy.gerarEvidencia('Login realizado com sucesso')
})

Cypress.Commands.add('realizarCadastroAdmin', (dados) => {
  cy.intercept('POST', '**/usuarios').as('postUsuarios')

  for (let index = 0; index < dados.quantidadeLoops; index++) {

    const nome = `${faker.person.firstName()} ${faker.person.lastName()}`
    const email = `ercastro.qa+${faker.number.int(999999)}@gmail.com`

    cy.get(locLogin.barraOpcoes.cadastrarUsuarios).click()
    cy.get(locLogin.login.cadastro.campoEmail).clear().type(email)
    cy.get(locLogin.login.cadastro.campoNome).clear().type(nome)
    cy.get(locLogin.login.cadastro.campoSenha).clear().type(dados.senha)
    cy.log(`Usuário ${index + 1}: ${nome} | ${email}`)
    cy.get(locLogin.cadastrarUsuarios.btnCadastrar).click()
    cy.wait('@postUsuarios').its('response.statusCode').should('eq', 201)
  }
})

Cypress.Commands.add('navegarListarUsuarios', (dados) => {
  cy.intercept('GET', '**/usuarios').as('getUsuarios')
  cy.get(locLogin.barraOpcoes.listarUsuarios).click()
  cy.wait('@getUsuarios')
  cy.contains('Lista dos usuários').should('be.visible')
  cy.gerarEvidencia('Tela de listagem de usuários exibida com sucesso')

  cy.get(locLogin.listarUsuarios.linha).each(($linha, index) => {
    cy.get(locLogin.listarUsuarios.colunaNome).eq(index).then(($nome) => {
      cy.log(`Valor da coluna Nome da linha ${index}: ${$nome.text()}`)
    })
  })
})

Cypress.Commands.add('excluirUsuario', (dados) => {
  cy.intercept('DELETE', '**/usuarios/*').as('deleteUsuarios')
  cy.get(locLogin.barraOpcoes.listarUsuarios).click()
  cy.contains('Lista dos usuários').should('be.visible')
  cy.gerarEvidencia('Tela de listagem de usuários exibida com sucesso')

  let usuarioEncontrado = false

  cy.get(locLogin.listarUsuarios.linha).each(($linha, index) => {

    cy.get(locLogin.listarUsuarios.colunaNome).eq(index).then(($nome) => {

      if ($nome.text() === dados) {
        usuarioEncontrado = true
        cy.gerarEvidencia(`Usuário ${$nome.text()} encontrado`)
        cy.get(locLogin.listarUsuarios.btnExcluir).eq(index).click()
        cy.wait('@deleteUsuarios').its('response.statusCode').should('eq', 200)
        cy.gerarEvidencia(`Usuário ${$nome.text()} excluído com sucesso`)
      } else {
        cy.log(`O usuário ${dados} não foi encontrado na linha ${index}`)
      }
    })

  }).then(() => {
    if (!usuarioEncontrado) {
      throw new Error('Usuário não encontrado para exclusão')
    }
  })
})

Cypress.Commands.overwrite('click', (originalFn, subject, options) => {

  Cypress.$(subject).css('border', '2px solid blue')

  return originalFn(subject, options)

})

Cypress.Commands.overwrite('type', (originalFn, subject, text, options) => {

  Cypress.$(subject)
    .css('border', '2px solid blue')
    .css('transition', '0.2s')

  return originalFn(subject, text, options)

})