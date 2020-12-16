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
  isSpinnerVisible: boolean = false;

  constructor(private router: Router) {
    
  }

  ngOnInit() {
    this.routeSubsribe();
    this.changeTheme();
  }

  routeSubsribe(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('route');
        this.isSpinnerVisible = true;
      }

      if (event instanceof NavigationEnd) {
        this.canShowFavorBtn = this.checkUrl(event);
        this.isSpinnerVisible = false; 
      }

      if (event instanceof NavigationError) {
        
      }
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
    return (e.url === '/main' || e.urlAfterRedirects === '/main');
  }

  ngOnDestroy() {
    this.routeSubscription$.unsubscribe();
  }
}
