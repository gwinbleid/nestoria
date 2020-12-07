import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Employees } from 'src/app/model/employee';
import { PropertySearchService } from '../property-search.service';
import { Observable, of, EMPTY } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { InfoEmittersService } from '../info-emitters.service';


@Injectable({
  providedIn: 'root'
})
export class PropertySearchResolverService implements Resolve<Employees[]> {

  constructor(
    private prop_search : PropertySearchService,
    private router: Router,
    private info: InfoEmittersService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employees[]> | Observable<never> {
    const id = route.paramMap.get('find');
    
    return this.prop_search.search(id).pipe(
      map(data => data.slice(0, 10)),
      tap(data => console.log()),
      mergeMap(res => {
        if (res.length) {
          return of(res);
        } else { // id not found
          this.router.navigate(['/main']);
          return EMPTY;
        }
      })
    );
  }
}
