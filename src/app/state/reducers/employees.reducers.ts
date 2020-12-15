import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { SearchResultsComponent } from "src/app/components/search-results/search-results.component";
import { Employees } from "src/app/model/employee";
import { EmployeesActions } from "../actions-types";

export interface EmployeesState extends EntityState<Employees> {
    [x: string]: any;
    searches: Object
}

export const adapter = createEntityAdapter<Employees>({
    selectId: (user) => user._id
})

export const initialEmployeesState = adapter.getInitialState({ });

export const _employeesReducer = createReducer(

    initialEmployeesState,

    on(EmployeesActions.allEmployeesLoaded,
            (state, action) => {
                console.log('a');
                let obj = { [action.search] : [action.employees] }
                return adapter.addMany(action.employees, {...state, searches: obj})
            }
));

export function employeesReducer(state, action) {
    return _employeesReducer(state, action);
}

export const {
    selectAll
} = adapter.getSelectors();