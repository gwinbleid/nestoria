import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SearchesState } from "./reducers/search.reducers";

import * as fromSearches from './reducers/search.reducers';



export const selectSearchesState = createFeatureSelector<SearchesState>('searches');

export const selectAllSearches = createSelector(
    selectSearchesState,
    fromSearches.selectAll
);