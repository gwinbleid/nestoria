import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Employees } from 'src/app/model/employee';
import { PropertySearchService } from '../property-search.service';

@Injectable({
  providedIn: 'root'
})
export class DetailResolver implements Resolve<Employees> {
  constructor(
    private props: PropertySearchService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employees> {
    const id = route.paramMap.get('id');

    return this.props.search_one(id).pipe(
      tap(data => console.log()),
      mergeMap(res => {
        if (res) {
          return of(res);
        } else { // id not found
          this.router.navigate(['/main']);
          return EMPTY;
        }
      })
    );
  }
}
