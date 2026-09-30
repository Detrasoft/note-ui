/**
 * Ambiente de desenvolvimento
 * Configuração local para o backend do Note.
 */
export const environment = {
  production: false,

  // Identificadores de token
  tokenGetter: 'noteui.auth.access-token.v1',
  refreshTokenGetter: 'noteui.auth.refresh-token.v1',

  // URLs do backend via Gateway (porta 5555)
  apiUrlAuth: 'http://localhost:5555',
  apiURLStorage: 'http://localhost:5555',
  apiURLDetrasoft: 'http://localhost:5555',
  apiURLGateway: 'http://localhost:5555',
  urlProject: 'http://localhost:4200',

  version: '1.0.0',
  build: 'DEV',

  // Rotas do app
  routePageLogin: '/login',
  routePageRegister: '/auth/register',
  routePageNewPassword: '/auth/new-password',
  routePageHome: '/notes',

  // Endpoints de auth
  endPointAPILogin: '/auth/note/login',
  endPointAPIRefreshToken: '/auth/refresh_token',
  endPointAPILogout: '/auth/logout',
  endPointAPIRegister: '/auth/register',
  endPointAPIRegisterEmail: '/public/register/send-validation-code-email',
  endPointAPIRegisterValidate: '/public/register/validate-code',

  // Domínios onde o token será anexado automaticamente
  tokenAllowedDomains: [
    /localhost/,
    /127\.0\.0\.1/,
    /192\.168\./,
    /api\.dutfy\.app/,
    /security\.dutfy\.app/,
    /storage\.dutfy\.app/,
    /dutfy\.app/,
  ],
  // Rotas que NÃO devem receber token
  tokenDisallowedRoutes: [
    /\/auth\/note\/login/,
    /\/auth\/refresh_token/,
    /\/auth\/new_password/,
    /\/auth\/send_email_new_password/,
    /\/public\/register\/send-validation-code-email/,
    /\/public\/register\/validate-code/,
  ],

  // Info do produto
  appId: 'app.dutfy.notes',
  appName: 'DutFy Notes',
};
