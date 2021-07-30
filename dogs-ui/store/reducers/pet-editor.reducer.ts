import IPet from "../../types/pet"
import { PetCollectionAction, PetCollectionActionTypes } from "../actions/pet-collection.actions"
import { PetEditorAction, PetEditorActionTypes } from "../actions/pet-editor.actions"
import produce from "immer";

export interface IPetEditorState {
    item: IPet | null,
    error: boolean;
    message: string;
}

const initialState: IPetEditorState = {
    item: null,
    error: false,
    message: ''
}

export const petEditorReducer = (state = initialState, action: PetEditorAction) => {
    return produce(state, draft => {
        {
            switch (action.type) {
                case PetEditorActionTypes.FETCH_PET_REQUESTED:
                //case PetEditorActionTypes.RESET:
                    draft.item = null;
                    draft.error = false;
                    draft.message = '';
                    break;

                case PetEditorActionTypes.FETCH_PET_FAILED:
                    draft.error = true;
                    draft.message = action.payload;
                    break;

                case PetEditorActionTypes.FETCH_PET_SUCCEEDED:
                    draft.item = action.payload;
                    break;

                // case PetEditorActionTypes.UPDATE_FIELD:
                //     if (draft.item) {
                //         draft.item = {...draft.item, [action.payload.name]: action.payload.value }
                //     }
                //     break;
            }
        }
    })
}