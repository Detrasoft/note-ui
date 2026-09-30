import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
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
      baseUrl: '/api',
      software: 'note',
      appName: 'DutFy Notes',
      appSubtitle: 'Suas ideias com zero atrito',
      appIcon: 'fa-solid fa-note-sticky',
      redirectUrlAfterLogin: '/notes',
    }),
    provideBilling({ coreBaseUrl: '/api', software: 'note' }),
    provideStorage({ baseUrl: '/api' }),
    provideDocSigning({ baseUrl: '/api' }),
    provideSupport({ baseUrl: '/api' }),
  ],
};
