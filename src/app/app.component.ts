import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  canShowFavorBtn: boolean = true;
  theme = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) { }

      if (event instanceof NavigationEnd) {
        this.canShowFavorBtn = this.checkUrl(event); 
      }

      if (event instanceof NavigationError) {
          console.log(event.error);
      }
  });
  }

  ngOnInit() {
    this.changeTheme();
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
}
