import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  routeSubscription$: Subscription;
  canShowFavorBtn: boolean = true;
  theme = '';

  constructor(private router: Router) {
    
  }

  ngOnInit() {
    this.routeSubscription$;
    this.changeTheme();
  }

  routeSubsribe(): void {
    this.routeSubscription$ = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) { }

      if (event instanceof NavigationEnd) {
        this.canShowFavorBtn = this.checkUrl(event); 
      }

      if (event instanceof NavigationError) { }
    });
  }

  toFavors() {
    this.router.navigate(['/favourites']);
  }

  changeTheme() {
    this.theme = this.theme === 'dark' ? '' : 'dark';

    let themeUrl = './assets/themes/compact.css';

    if (this.theme === 'dark') {
      themeUrl = './assets/themes/dark.css';
    }

    const newThemeElement = document.createElement('link') as HTMLLinkElement;
    document.head.appendChild(newThemeElement);

    newThemeElement.type = 'text/css';
    newThemeElement.rel = 'stylesheet';
    newThemeElement.onload = () => {
      const themeElements = document.querySelectorAll('link[theme-link]');
      themeElements.forEach(themeElement => {
        document.head.removeChild(themeElement);
      });

      newThemeElement.setAttribute('theme-link', '');
      newThemeElement.onload = null;
    };

    newThemeElement.href = themeUrl;
  }

  checkUrl(e): boolean {
    if (e.url === '/main' || e.urlAfterRedirects === '/main') return true;
    return false;
  }

  ngOnDestroy() {
    this.routeSubscription$.unsubscribe();
  }
}
