import { createAction, props } from "@ngrx/store";
import Employees from "../model/employee.model";

const loadAllEmployeesType = "[Employees Resolver] Load All Employees";
const allEmployeesLoadedType = "[Load Employees Effect] All Employees Loaded";
const additionallyEmployeesLoadedType = "[Load Additional Employees Search Effect] Additional Employees Loaded";

export const loadAllEmployees = createAction(
    loadAllEmployeesType
);

export const allEmployeesLoaded = createAction(
    allEmployeesLoadedType,
    props<{employees: Employees[]}>()
);

export const additionallyEmployeesLoaded = createAction(
    additionallyEmployeesLoadedType,
    props<{additionalData: Employees[]}>()
);