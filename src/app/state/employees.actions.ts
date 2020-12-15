import { createAction, props } from "@ngrx/store";
import { Employees } from "../model/employee";

export const loadAllEmployees = createAction(
    "[Employees Resolver] Load All Employees"
);

export const allEmployeesLoaded = createAction(
    "[Load Employees Effect] All Employees Loaded",
    props<{employees: Employees[]}>()
);

export const loadNextTenEmployees = createAction(
    "[Load Next Ten Employees Component] Load Next Empoyees"
)

export const nextTenEmployeesLoaded = createAction(
    "[Load Next Ten Employees Effect] Next Ten Employees Loaded",
    props<{employees: Employees[]}>()
);