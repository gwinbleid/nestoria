import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect, act } from '@ngrx/effects';
import { concatMap, count, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { EmployeesService } from "../services/employees.service";
import { additionallyEmployeesLoaded, allEmployeesLoaded } from "./employees.actions";
import { loadNextTenEmployees, nextTenEmployeesLoaded } from "./searches.actions";

@Injectable()
export class SearchesEffects {

    previousdata;
    count

    searchesNextTen$ = createEffect(() => {
        let query: string;
        return this.actions$
        .pipe(
            ofType(loadNextTenEmployees),
            concatMap(action => {
                this.previousdata = action.prevData;
                this.count = action.count;
                query = action.from;
                return this.employeesService.loadMore(action.from, action.to)
            }),
            switchMap(nextTen => {
                    let searchObject = { id: query, results: [...this.previousdata, ...nextTen], count: this.count }
                    return [
                        nextTenEmployeesLoaded({searches: [searchObject]}),
                        additionallyEmployeesLoaded({additionalData: nextTen})
                    ];
                })

            )
    }
        
    );

    constructor(
        private actions$: Actions,
        private employeesService: EmployeesService,

    ) { }
}