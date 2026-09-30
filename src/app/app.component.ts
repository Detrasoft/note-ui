import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { AuthService } from '@detrasoft.com/web-auth';
import { ButtonComponent } from '@detrasoft.com/detra-ng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);

  private readonly currentUrl$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map(e => e.urlAfterRedirects || e.url),
  );

  readonly currentUrl = toSignal(this.currentUrl$, { initialValue: this.router.url });
  readonly isLoginPage = computed(() => {
    const url = this.currentUrl();
    if (url && url.startsWith('/login')) return true;
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/login')) return true;
    return false;
  });

  logout() {
    this.auth.logout('/login');
  }
}
