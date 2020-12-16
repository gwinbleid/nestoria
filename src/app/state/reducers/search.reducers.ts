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
            return adapter.addMany(action.searches, {...state})
        }
    ),

    on(SearchesActions.nextTenEmployeesLoaded,
        (state, action) => {
            let searches = action.searches[0];
            //searches.count = state.entities[action.searches[0].id].count;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [action.searches[0].id]: {
                        ...state.entities[action.searches[0].id],
                        results : searches.results
                    }
                }
            };
        }
    )
);

export function searchesReducer(state, action) {
    return _searchesReducer(state, action);
}

export const {
    selectAll
} = adapter.getSelectors();