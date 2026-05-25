export const locLogin = {

  login: {
    campoLogin: '[data-testid="email"]',
    campoSenha: '[data-testid="senha"]',
    btnAcessar: '[data-testid="entrar"]',
    btnCadastrar: '[data-testid="cadastrar"]',
    alertError: '.alert > :nth-child(2)',
    closeAlert: '.close > span',
        cadastro: {
          titulo: 'h2.font-robot',
          campoNome: '[data-testid="nome"]',
          campoEmail: '[data-testid="email"]',
          campoSenha: '[data-testid="password"]',
          btnCadastrar: '[data-testid="cadastrar"]',
          checkbox: '[data-testid="checkbox"]',
          alertSuccess: '.alert-link',
    },
  },
  barraOpcoes:{
    home: '[data-testid="home"]',
    cadastrarUsuarios: '[data-testid="cadastrar-usuarios"]',
    listarUsuarios: '[data-testid="listar-usuarios"]',
    cadastrarProdutos: '[data-testid="cadastrar-produtos"]',
    listarProdutos: '[data-testid="listar-produtos"]',
    linkRelatorios: '[data-testid="link-relatorios"]'
  },
  cadastrarUsuarios: {
    btnCadastrar: '[data-testid="cadastrarUsuario"]'
  },
  listarUsuarios: {
   linha:'tbody > tr',
   coluna1: 'td:nth-child(1)',
  }

}