import {AnyAction, combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import { petCollectionReducer } from "./pet-collection.reducer";
import { petEditorReducer } from "./pet-editor.reducer";


const rootReducer = combineReducers({
    petCollection: petCollectionReducer,
    selectedPet: petEditorReducer
})

export const reducer = (state: any, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }
        if (state.count) nextState.count = state.count
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export type RootState = ReturnType<typeof rootReducer>