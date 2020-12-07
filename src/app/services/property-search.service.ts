import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, flatMap, map, tap, take } from 'rxjs/operators'
import { Employees } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class PropertySearchService {
  jsonUrl: string = 'assets/db.json';

  constructor(private http: HttpClient) { }

  search(search_data: string) {
    let search_value = search_data;
    console.log(search_data)

    return this.http.get<Employees[]>(this.jsonUrl)
      .pipe(
        map(res => res.filter(item => {
          return item['company'].includes(search_data.toUpperCase())
        }))
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
}
