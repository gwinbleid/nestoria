import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect, act } from '@ngrx/effects';
import { concatMap, count, exhaustMap, map, tap } from "rxjs/operators";
import { EmployeesService } from "../services/employees.service";
import { SearchesActions } from "./actions-types";
import { nextTenEmployeesLoaded } from "./searches.actions";

@Injectable()
export class SearchesEffects {

    searchesNextTen$ = createEffect(() => {
        let query: string;
        return this.actions$
        .pipe(
            tap(() => console.log('effect work')),
            ofType(SearchesActions.loadNextTenEmployees),
            concatMap(action => {
                query = action.from;
                return this.employeesService.loadMore(action.from, action.to)
            }),
                tap(data => console.log(data)),
                map(nextTen => {
                    let searchObject = { id: query, results: nextTen, count: 10 }
                    return nextTenEmployeesLoaded({searches: [].concat(searchObject)});
                })

            )
    }
        
    );

    constructor(
        private actions$: Actions,
        private employeesService: EmployeesService
    ) { }
}