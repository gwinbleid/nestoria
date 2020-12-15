import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { employeesReducer, EmployeesState } from "./reducers/employees.reducers";

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    employees: employeesReducer
};
    