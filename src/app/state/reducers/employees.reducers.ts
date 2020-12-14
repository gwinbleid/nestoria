import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Employees } from "src/app/model/employee";
import { EmployeesActions } from "../actions-types";

export interface EmployeesState extends EntityState<Employees> {
    allCoursesLoaded: boolean
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
                return adapter.addMany(action.employees, {...state, allCoursesLoaded:true})
            }
));

export function employeesReducer(state, action) {
    return _employeesReducer(state, action);
}

export const {
    selectAll
} = adapter.getSelectors();