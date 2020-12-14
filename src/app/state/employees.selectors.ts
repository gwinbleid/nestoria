import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeesState } from "./reducers/employees.reducers";

import * as fromEmployees from './reducers/employees.reducers';


export const selectEmployeesState = createFeatureSelector<EmployeesState>('employees');

export const selectAllEmployees = createSelector(
    selectEmployeesState,
    fromEmployees.selectAll
);