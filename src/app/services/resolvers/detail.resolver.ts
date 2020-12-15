import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { filter, first, flatMap, mergeMap, tap } from 'rxjs/operators';
import { Employees } from 'src/app/model/employee';
import { selectAllEmployees } from 'src/app/state/employees.selectors';
import { EmployeesService } from '../employees.service';

@Injectable({
  providedIn: 'root'
})
export class DetailResolver implements Resolve<Employees> {
  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private store: Store
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employees> {
    const id = route.paramMap.get('id');

    console.log(this.store
      .pipe(
        select(selectAllEmployees),
        tap(data => console.log(data)),
        mergeMap(data => {
          return data;
        })));

    /*return this.store
      .pipe(
        select(selectAllEmployees),
        tap(data => console.log(data)),
        filter(item => item.['_id'] === id),
        mergeMap(data => data),
        first()
    );*/

    
      return this.employeesService.search_one(id).pipe(
            tap(() => console.log('it works')),
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
