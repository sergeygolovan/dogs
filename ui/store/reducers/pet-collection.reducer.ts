import IPet from "../../types/pet"
import { PetCollectionAction, PetCollectionActionTypes } from "../actions/pet-collection.actions"

export interface IPetCollectionState {
    items: IPet[],
    error: boolean;
    message: string;
}

const initialState: IPetCollectionState = {
    items: [],
    error: false,
    message: ''
}

export const petCollectionReducer = (state = initialState, action: PetCollectionAction): IPetCollectionState => {
    switch (action.type) {
        case PetCollectionActionTypes.FETCH_PETS:
            return { ...state, error: false, message: '' }
        case PetCollectionActionTypes.FETCH_PETS_ERROR:
            return { ...state, error: true, message: action.payload, items: [] }
        case PetCollectionActionTypes.FETCH_PETS_SUCCESS:
            return { ...state, error: false, items: action.payload }
        default:
            return state
    }
}