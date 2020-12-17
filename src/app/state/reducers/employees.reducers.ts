import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";

import Employees from "src/app/model/employee.model";
import { additionallyEmployeesLoaded, allEmployeesLoaded } from "../employees.actions";

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

    on(allEmployeesLoaded,
            (state, action) => {
                return adapter.addMany(action.employees, {...state})
            }
    ),

    on(additionallyEmployeesLoaded,
        (state, action) => {
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