import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  showFavorBtn: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        if (event.url === '/main' || event.urlAfterRedirects === '/main') {
          this.showFavorBtn = true;
        } else {
          this.showFavorBtn = false
        }
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
      }
  });
  }

  toFavors() {
    this.router.navigate(['/favourites']);
  }
}
