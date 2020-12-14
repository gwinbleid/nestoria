import { createAction, props } from "@ngrx/store";
import { Employees } from "../model/employee";

export const loadAllEmployees = createAction(
    "[Courses Resolver] Load All Courses"
);

export const allEmployeesLoaded = createAction(
    "[Load Courses Effect] All Courses Loaded",
    props<{employees: Employees[]}>()
);