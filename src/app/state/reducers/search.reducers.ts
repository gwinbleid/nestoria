import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Searches } from "src/app/model/search";
import { SearchesActions } from "../actions-types";

export interface SearchesState extends EntityState<Searches> {
    [x: string]: any;
}

export const adapter = createEntityAdapter<Searches>();

export const initialSearchesState = adapter.getInitialState();

export const _searchesReducer = createReducer(

    initialSearchesState,

    on(SearchesActions.allSearchesLoaded,
            (state, action) => {
                console.log('a');
                return adapter.addMany(action.searches, {...state})
            }
));

export function searchesReducer(state, action) {
    return _searchesReducer(state, action);
}

export const {
    selectAll
} = adapter.getSelectors();