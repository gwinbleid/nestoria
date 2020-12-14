import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Employees } from 'src/app/model/employee';
import { EmployeesService } from '../employees.service';
import { Observable, of, EMPTY } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { allEmployeesLoaded } from 'src/app/state/employees.actions';


@Injectable({
  providedIn: 'root'
})
export class PropertySearchResolverService implements Resolve<Employees[]> {

  constructor(
    private employeesService : EmployeesService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employees[]> | Observable<never> {
    const id = route.paramMap.get('find');
    
    return this.employeesService.search(id).pipe(
      map(data => data.slice(0, 10)),
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
