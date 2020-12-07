import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Employees } from 'src/app/model/employee';
import { PropertySearchService } from '../property-search.service';
import { Observable, of, EMPTY } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountResolverService {

  constructor(
    private prop_search : PropertySearchService,
    private router: Router,

    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Number> | Observable<never> {
    const id = route.paramMap.get('find');
    
    return this.prop_search.search(id).pipe(
      map(data => data.length),
      tap(data => console.log()),
      mergeMap(res => {
        return of(res);
      })
    );
  }
}
