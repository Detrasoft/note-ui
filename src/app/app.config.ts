import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { provideWebAuth } from '@detrasoft.com/web-auth';
import { provideBilling } from '@detrasoft.com/billing';
import { provideStorage } from '@detrasoft.com/storage';
import { provideDocSigning } from '@detrasoft.com/doc-signing';
import { provideSupport } from '@detrasoft.com/support';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withFetch()),
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
      redirectUrlAfterLogin: '/notes',
    }),
    provideBilling({
      coreBaseUrl: environment.apiURLDetrasoft,
      corePath: '/detrasoft-core-api',
      software: 'note',
      countersBaseUrl: environment.apiURLGateway,
      countersPath: '/note-api',
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
    }),
  ],
};

