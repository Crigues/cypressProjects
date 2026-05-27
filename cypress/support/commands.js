import { locLogin } from './locators/exemple'// Pasta Locators

Cypress.Commands.add('gerarEvidencia', (nome) => {
  cy.wait(500) // opcional, para estabilizar tela
  cy.screenshot(nome, { capture: 'viewport' })
})

Cypress.Commands.add('realizarLoginFalse', (dados) => {
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
  cy.get(locLogin.login.campoLogin).type(dados.email)
  cy.get(locLogin.login.campoSenha).type(dados.senha)
  cy.get(locLogin.login.btnAcessar).click()
  cy.gerarEvidencia('Dados válidos de login preenchidos')
})

Cypress.Commands.add('realizarCadastroAdmin', (dados) => {

  cy.get(locLogin.barraOpcoes.cadastrarUsuarios).click()

  for (let index = 0; index < dados.quantidadeLoops; index++) {

    cy.get(locLogin.login.cadastro.campoEmail).clear().type(`${dados.email}`)
    cy.get(locLogin.login.cadastro.campoNome).clear().type(`${dados.nome}`)
    cy.get(locLogin.login.cadastro.campoSenha).clear().type(`${dados.senha}`)
    cy.log(`Executando loop ${index + 1}`)
    cy.get(locLogin.cadastrarUsuarios.btnCadastrar).click()
  }
})

Cypress.Commands.add('navegarListarUsuarios', (dados) => {

  cy.get(locLogin.barraOpcoes.listarUsuarios).click()
  cy.contains('Lista dos usuários').should('be.visible')
  cy.gerarEvidencia('Tela de listagem de usuários exibida com sucesso')

  cy.get(locLogin.listarUsuarios.linha).each(($linha, index) => {
    cy.get(locLogin.listarUsuarios.colunaNome).eq(index).then(($nome) => {
      cy.log(`Valor da coluna Nome da linha ${index}: ${$nome.text()}`)
    })
  })
})

Cypress.Commands.add('excluirUsuario', (dados) => {

  cy.get(locLogin.barraOpcoes.listarUsuarios).click()
  cy.contains('Lista dos usuários').should('be.visible')
  cy.gerarEvidencia('Tela de listagem de usuários exibida com sucesso')

  cy.get(locLogin.listarUsuarios.linha).each(($linha, index) => {
    cy.get(locLogin.listarUsuarios.colunaNome).eq(index).then(($nome) => {
      if ($nome.text() === dados) {
        cy.get(locLogin.listarUsuarios.btnExcluir).eq(index).click()
      } else {
        cy.log(`O usuário ${dados} não foi encontrado na linha ${index}`)
      }
    })
  })
})