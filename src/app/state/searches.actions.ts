import { createAction, props } from "@ngrx/store";
import { Searches } from "../model/search";

export const loadAllSearches = createAction(
    "[Searches Resolver] Load All Recent Searches"
);

export const allSearchesLoaded = createAction(
    "[Load Searches Effect] All Recent Searches Loaded",
    props<{searches: Searches[]}>()
);

export const loadNextTenEmployees = createAction(
    "[Load Next Ten Employees Component] Load Next Employees",
    props<{from: string, to: number}>()
);

export const nextTenEmployeesLoaded = createAction(
    "[Load Next Ten Employees Effect] Next Ten Employees Loaded",
    props<{searches: Searches[]}>()
);