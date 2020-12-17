import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import Searches from "src/app/model/search.model";
import { allSearchesLoaded, nextTenEmployeesLoaded } from "../searches.actions";

export interface SearchesState extends EntityState<Searches> {
    [x: string]: any;
}

export const adapter = createEntityAdapter<Searches>();

export const initialSearchesState = adapter.getInitialState();

export const _searchesReducer = createReducer(

    initialSearchesState,

    on(allSearchesLoaded,
        (state, action) => {
            return adapter.addMany(action.searches, {...state})
        }
    ),

    on(nextTenEmployeesLoaded,
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