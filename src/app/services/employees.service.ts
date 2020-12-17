import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, flatMap, map, tap, take, mergeMap, delay, catchError } from 'rxjs/operators'
import { EMPTY, of, throwError } from 'rxjs';
import Employees from '../model/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  jsonUrl: string = 'assets/db.json';

  constructor(private http: HttpClient) { }

  search(value: string) {
    let searchData = value;

    return this.http.get<Employees[]>(this.jsonUrl)
      .pipe(
        map(res => res.filter(item => {
          return item.company.includes(searchData.toUpperCase())
        }))
      )
  }

  searchFirstTen(search_data) {
    return this.http.get<Employees[]>(this.jsonUrl)
      .pipe(
        map(res => res.filter(item => {
          return item.company.includes(search_data.toUpperCase())
        }))
      )
      .pipe(
        map(data => {
          return {data: data.slice(0, 10), count: data.length}
        }),
        delay(1500)
      )
  }

  searchEmployeeById(id) {
    return this.http.get<Employees[]>(this.jsonUrl)
      .pipe(
        map(res => res.filter(item => {
          return item._id === id;
        })),
        take(1),
        flatMap(data => data),
        delay(700)
      )
  }

  loadMore(value, length) {
    return this.http.get<Employees[]>(this.jsonUrl)
    .pipe(
      map(res => res.filter(item => {
        return item.company.includes(value.toUpperCase())
      })),
      map(res => res.slice(length, length + 10)),
      delay(700)
    )
  }

  generatingErrorRequest() {
    return this.http.get<Employees[]>('http.sobaka-kusaka.com')
      .pipe(
        delay(3000),
        catchError(err => throwError(err))
      )
  }
}
