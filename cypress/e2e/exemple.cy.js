import { faker } from '@faker-js/faker'

beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.window().then((win) => {
        win.sessionStorage.clear()
    })
    cy.visit('https://front.serverest.dev/login')
    cy.gerarEvidencia('Tela de login exibida com sucesso')
})

describe('Automação site serverest', () => {

    //OK
    it('[REGRA][LOGIN] - Não deve realizar login com email inválido', () => {

        const dadosLogin = {
            email: 'ercastro.qa@gmail.com.br',
            senha: 'Testqa..'
        }
        cy.realizarLoginInvalido(dadosLogin)
    })

    //OK
    it('[REGRA][LOGIN]  - Não deve realizar login com senha inválida', () => {

        const dadosLogin = {
            email: 'ercastro.qa@gmail.com',
            senha: '12345678'
        }
        cy.realizarLoginInvalido(dadosLogin)
    })

    //OK
    it('[FLUXO][LOGIN] - Deve realizar o cadastro de credenciais', () => {

        const dadosLogin = {
            email: `ercastro.qa@gmail.com`,
            senha: 'Testqa..',
            nome: 'Emerson Castro',
            admin: true
        }
        cy.realizarCadastro(dadosLogin)
    });

    //OK
    it('[REGRA][LOGIN]  - Deve realizar login com email e senha válidos', () => {

        const dadosLogin = {
            email: 'ercastro.qa@gmail.com',
            senha: 'Testqa..'
        }
        cy.realizarLogin(dadosLogin)
    })

    //OK
    it('[FLUXO][LOGIN] - Deve realizar o cadastro de usuários com login administrador logado', () => {

        const dadosLogin = {
            email: 'ercastro.qa@gmail.com',
            senha: 'Testqa..'
        }

        const dados = {
            quantidadeLoops: 3,
            senha: '0123456789'
        }
        cy.realizarLogin(dadosLogin)
        cy.realizarCadastroAdmin(dados)
    });

    //OK
    it('[REGRA][LOGIN] - Deve navegar na lista de usuários', () => {
        
        const dadosLogin = {
            email: 'ercastro.qa@gmail.com',
            senha: 'Testqa..'
        }
        cy.realizarLogin(dadosLogin)
        cy.navegarListarUsuarios()
    });

    //OK
    it.skip('[FLUXO][LOGIN] - Deve excluir um usuário', () => {
        const dadosLogin = {
            email: 'ercastro.qa@gmail.com',
            senha: 'Testqa..'
        }

        const usuarios = {
            nomeUsuario: 'Audrey Feest'
        }

        cy.realizarLogin(dadosLogin)
        cy.excluirUsuario(usuarios.nomeUsuario)
    });
});