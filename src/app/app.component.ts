import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'nestoria';
  routeSubscription$: Subscription;
  canShowFavorBtn = true;
  theme = '';
  isSpinnerVisible = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.routeSubsribe();
    this.changeTheme();
  }

  routeSubsribe(): void {
    this.router.events
      .pipe(untilDestroyed(this))
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
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

  toFavors(): void {
    this.router.navigate(['/favourites']);
  }

  changeTheme(): void {
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
}
