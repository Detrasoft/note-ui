/**
 * Ambiente de produção
 * Configuração de produção para o DutFy Notes.
 */
export const environment = {
  production: true,

  // Identificadores de token
  tokenGetter: 'noteui.auth.access-token.v1',
  refreshTokenGetter: 'noteui.auth.refresh-token.v1',

  // URLs do backend de produção
  apiUrlAuth: 'https://security.dutfy.app',
  apiURLStorage: 'https://storage.dutfy.app',
  apiURLDetrasoft: 'https://detrasoft.dutfy.app',
  apiURLGateway: 'https://api.dutfy.app',
  urlProject: 'https://notes.dutfy.app',

  version: '1.0.0',
  build: 'RELEASE',

  // Rotas do app
  routePageLogin: '/login',
  routePageRegister: '/auth/register',
  routePageNewPassword: '/auth/new-password',
  routePageHome: '/notes',

  // Endpoints de auth
  endPointAPILogin: '/auth/note/login',
  endPointAPIRefreshToken: '/auth/refresh_token',
  endPointAPILogout: '/auth/logout',
  endPointAPIRegister: '/public/register/send-validation-code-email',
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
