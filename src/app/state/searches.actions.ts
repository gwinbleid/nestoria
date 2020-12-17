import { createAction, props } from "@ngrx/store";
import Searches from "../model/search.model";

const loadAllSearchesType = "[Searches Resolver] Load All Recent Searches";
const allSearchesLoadedType = "[Load Searches Effect] All Recent Searches Loaded";
const loadNextTenEmployeesType = "[Load Next Ten Employees Component] Load Next Employees";
const nextTenEmployeesLoadedType = "[Load Next Ten Employees Effect] Next Ten Employees Loaded";


export const loadAllSearches = createAction(
    loadAllSearchesType
);

export const allSearchesLoaded = createAction(
    allSearchesLoadedType,
    props<{searches: Searches[]}>()
);

export const loadNextTenEmployees = createAction(
    loadNextTenEmployeesType,
    props<{from: string, to: number, prevData: Searches[], count: number}>()
);

export const nextTenEmployeesLoaded = createAction(
    nextTenEmployeesLoadedType,
    props<{searches: Searches[]}>()
);