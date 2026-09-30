import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { deviceIdInterceptor, jwtInterceptor, provideWebAuth } from '@detrasoft.com/web-auth';
import { provideBilling } from '@detrasoft.com/billing';
import { provideStorage } from '@detrasoft.com/storage';
import { provideDocSigning } from '@detrasoft.com/doc-signing';
import { provideSupport } from '@detrasoft.com/support';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor, deviceIdInterceptor])),
    provideAnimations(),
    provideWebAuth({
      baseUrl: environment.apiUrlAuth,
      apiPath: '/authorization-server',
      storageBaseUrl: environment.apiURLStorage,
      storagePath: '/storage-server',
      software: 'note',
      appName: 'DutFy Notes',
      appSubtitle: 'Suas ideias com zero atrito',
      appIcon: 'fa-solid fa-note-sticky',
      theme: 'dark',
      background: '#0B0F17',
      showAurora: true,
      brandColor: '#3B82F6',
      brandGradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      auroraPrimaryColor: '#3B82F6',
      auroraAccentColor: '#1D4ED8',
      cardRadius: '16px',
      buttonPill: false,
      showThemeToggle: false,
      userDataBasePath: '/profile',
      changePasswordBasePath: '/profile/change-password',
      changeEmailBasePath: '/profile/change-email',
      softwareDataUrl: '/assets/data/software.json',
      backPath: '/notes',
      redirectUrlAfterLogin: '/notes',
    }),
    provideBilling({
      coreBaseUrl: environment.apiURLDetrasoft,
      corePath: '/detrasoft-core-api',
      software: 'note',
      countersBaseUrl: environment.apiURLGateway,
      countersPath: '/note-api',
      theme: 'dark',
      brandColor: '#3B82F6',
      brandGradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      cardRadius: '16px',
      buttonPill: false,
    }),
    provideStorage({
      baseUrl: environment.apiURLStorage,
      apiPath: '/storage-server',
    }),
    provideDocSigning({
      baseUrl: environment.apiURLDetrasoft,
    }),
    provideSupport({
      baseUrl: environment.apiURLDetrasoft,
      apiPath: '/detrasoft-core-api',
      theme: 'dark',
      brandColor: '#3B82F6',
      brandGradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      cardRadius: '16px',
      buttonPill: false,
      basePath: '/support',
      backPath: '/notes',
    }),
  ],
};

