import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Employees } from 'src/app/model/employee';
import { EmployeesService } from '../employees.service';

@Injectable({
  providedIn: 'root'
})
export class DetailResolver implements Resolve<Employees> {
  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employees> {
    const id = route.paramMap.get('id');

    return this.employeesService.search_one(id).pipe(
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
