import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { EmployeesActions } from "../actions-types";

import Employees from "src/app/model/employee.model";

export interface EmployeesState extends EntityState<Employees> {
    [key: string]: any;
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
                return adapter.addMany(action.employees, {...state})
            }
    ),

    on(EmployeesActions.additionallyEmployeesLoaded,
        (state, action) => {
            console.log('action works');
            return adapter.upsertMany(action.additionalData, {...state})
        }
    )
);

export function employeesReducer(state, action) {
    return _employeesReducer(state, action);
}

export const {
    selectAll
} = adapter.getSelectors();