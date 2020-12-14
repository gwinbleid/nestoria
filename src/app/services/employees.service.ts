import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, flatMap, map, tap, take, mergeMap, delay, catchError } from 'rxjs/operators'
import { Employees } from '../model/employee';
import { EMPTY, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  jsonUrl: string = 'assets/db.json';

  constructor(private http: HttpClient) { }

  search(search_data: string) {
    let search_value = search_data;

    return this.http.get<Employees[]>(this.jsonUrl)
      .pipe(
        map(res => res.filter(item => {
          return item['company'].includes(search_data.toUpperCase())
        }))
      )
  }

  searchFirstTen(search_data) {
    return this.http.get<Employees[]>(this.jsonUrl)
      .pipe(
        map(res => res.filter(item => {
          return item['company'].includes(search_data.toUpperCase())
        }))
      )
      .pipe(
        map(data => data.slice(0, 10))
      )
  }

  search_one(id) {
    return this.http.get<Employees[]>(this.jsonUrl)
      .pipe(
        map(res => res.filter(item => {
          return item['_id'] === id;
        })),
        take(1),
        flatMap(data => data)
      )
  }

  load_more(value, length) {
    return this.http.get<Employees[]>(this.jsonUrl)
    .pipe(
      map(res => res.filter(item => {
        return item['company'].includes(value.toUpperCase())
      })),
      map(res => res.slice(length, length + 10))
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
