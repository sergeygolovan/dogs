import IPet from "../../types/pet";
import {
  PetEditorAction,
  PetEditorActionTypes,
} from "../actions/pet-editor.actions";
import produce from "immer";

export interface IPetEditorState {
  item: IPet | null;
  error: boolean;
  message: string;
  redirectTo?: string;
}

const initialState: IPetEditorState = {
  item: null,
  error: false,
  message: "",
  redirectTo: "",
};

export const petEditorReducer = (
  state = initialState,
  action: PetEditorAction
) => {
  return produce(state, (draft) => {
    {
      switch (action.type) {
        case PetEditorActionTypes.FETCH_PET_REQUESTED:
          draft.item = null;
          draft.error = false;
          draft.message = "";
          break;

        case PetEditorActionTypes.FETCH_PET_FAILED:
          draft.error = true;
          draft.message = action.payload;
          break;

        case PetEditorActionTypes.FETCH_PET_SUCCEEDED:
          draft.item = action.payload;
          break;

        case PetEditorActionTypes.CREATE_PET_REQUESTED:
          draft.error = false;
          draft.message = "";
          break;

        case PetEditorActionTypes.CREATE_PET_FAILED:
          draft.error = true;
          draft.message = action.payload;
          break;

        case PetEditorActionTypes.CREATE_PET_SUCCEEDED:
          break;

        case PetEditorActionTypes.UPDATE_PET_REQUESTED:
          draft.error = false;
          draft.message = "";
          break;

        case PetEditorActionTypes.UPDATE_PET_FAILED:
          draft.error = true;
          draft.message = action.payload;
          break;

        case PetEditorActionTypes.UPDATE_PET_SUCCEEDED:
          break;

        case PetEditorActionTypes.DELETE_PET_REQUESTED:
          draft.error = false;
          draft.message = "";
          break;

        case PetEditorActionTypes.DELETE_PET_FAILED:
          draft.error = true;
          draft.message = action.payload;
          break;

        case PetEditorActionTypes.DELETE_PET_SUCCEEDED:
          break;

        case PetEditorActionTypes.REDIRECT:
          draft.redirectTo = action.payload;
          break;
      }
    }
  });
};
