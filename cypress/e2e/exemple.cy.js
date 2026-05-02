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

    it.only('Deve realizar o cadastro de credenciais válidas', () => {
        let currentDadosLogin = {}
        currentDadosLogin.dadosLogin = {}

        currentDadosLogin.dadosLogin.email = 'ercastro.qa@gmail.com'
        currentDadosLogin.dadosLogin.senha = 'Testqa..'
        currentDadosLogin.dadosLogin.senhaFalse = '12345678'
        currentDadosLogin.dadosLogin.emailFalse = 'ercastro.qa@gmail.com.br'
        currentDadosLogin.dadosLogin.nome = 'Eduardo Castro'

        cy.realizarCadastro(currentDadosLogin.dadosLogin)
    });
});