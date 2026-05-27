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

    it('Não deve realizar login por credenciais inválidas', () => {
        let currentDadosLogin = {}
        currentDadosLogin.dadosLogin = {}

        currentDadosLogin.dadosLogin.email = 'ercastro.qa@gmail.com'
        currentDadosLogin.dadosLogin.senha = 'Testqa..'
        currentDadosLogin.dadosLogin.senhaFalse = '12345678'
        currentDadosLogin.dadosLogin.emailFalse = 'ercastro.qa@gmail.com.br'

        cy.realizarLoginFalse(currentDadosLogin.dadosLogin)
    });

    it('Deve realizar o cadastro de credenciais válidas deslogado', () => {
        let currentDadosLogin = {}
        currentDadosLogin.dadosLogin = {}

        currentDadosLogin.dadosLogin.email = 'ercastro.qa@gmail.com'
        currentDadosLogin.dadosLogin.senha = 'Testqa..'
        currentDadosLogin.dadosLogin.nome = 'Emerson Castro'

        cy.realizarCadastro(currentDadosLogin.dadosLogin)
    });

    it('Deve realizar o cadastro de usuários com login administrador logado', () => {
        let currentDadosLogin = {}
        currentDadosLogin.dadosLogin = {}

        currentDadosLogin.dadosLogin.email = 'ercastro.qa@gmail.com'
        currentDadosLogin.dadosLogin.senha = 'Testqa..'

        const dados = {
            quantidadeLoops: 1,
            email: `ercastro.qa+${Date.now()}@gmail.com`,
            nome: `${faker.person.firstName()} ${faker.person.lastName()}`,
            senha: '0123456789'
        }

        cy.realizarLogin(currentDadosLogin.dadosLogin)
        cy.realizarCadastroAdmin(dados, currentDadosLogin.dadosLogin)
    });

    it('Deve navegação na lista de usuários', () => {
        let currentDadosLogin = {}
        currentDadosLogin.dadosLogin = {}

        currentDadosLogin.dadosLogin.email = 'ercastro.qa@gmail.com'
        currentDadosLogin.dadosLogin.senha = 'Testqa..'

        cy.realizarLogin(currentDadosLogin.dadosLogin)
        cy.navegarListarUsuarios()
    });

    it.only('Deve excluir um usuário', () => {
        let currentDadosLogin = {}
        currentDadosLogin.dadosLogin = {}

        currentDadosLogin.dadosLogin.email = 'ercastro.qa@gmail.com'
        currentDadosLogin.dadosLogin.senha = 'Testqa..'

        const usuarios = {
            nomeUsuario: 'Emerson Castro'
        }

        cy.realizarLogin(currentDadosLogin.dadosLogin)
        cy.excluirUsuario(usuarios.nomeUsuario)
    });
});