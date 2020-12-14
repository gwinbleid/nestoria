import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Employees } from 'src/app/model/employee';
import { EmployeesService } from '../employees.service';
import { Observable, of, EMPTY } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountResolverService {

  constructor(
    private employeesService : EmployeesService,
    private router: Router,

    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Number> | Observable<never> {
    const id = route.paramMap.get('find');
    
    return this.employeesService.search(id).pipe(
      map(data => data.length),
      mergeMap(res => {
        return of(res);
      })
    );
  }
}
