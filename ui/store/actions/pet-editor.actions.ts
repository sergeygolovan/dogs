import { AnyAction } from "redux";
import IPet from "../../types/pet";

export enum PetEditorActionTypes {
  FETCH_PET_REQUESTED = "FETCH_PET_REQUESTED",
  FETCH_PET_SUCCEEDED = "FETCH_PET_SUCCEEDED",
  FETCH_PET_FAILED = "FETCH_PET_FAILED",

  CREATE_PET_REQUESTED = "CREATE_PET_REQUESTED",
  CREATE_PET_SUCCEEDED = "CREATE_PET_SUCCEEDED",
  CREATE_PET_FAILED = "CREATE_PET_FAILED",

  UPDATE_PET_REQUESTED = "UPDATE_PET_REQUESTED",
  UPDATE_PET_SUCCEEDED = "UPDATE_PET_SUCCEEDED",
  UPDATE_PET_FAILED = "UPDATE_PET_FAILED",

  DELETE_PET_REQUESTED = "DELETE_PET_REQUESTED",
  DELETE_PET_SUCCEEDED = "DELETE_PET_SUCCEEDED",
  DELETE_PET_FAILED = "DELETE_PET_FAILED",

  REDIRECT = "REDIRECT",

  // RESET = "RESET",
}

interface FetchPetRequestedAction extends AnyAction {
  type: PetEditorActionTypes.FETCH_PET_REQUESTED;
  payload: string;
}

interface FetchPetSucceededAction extends AnyAction {
  type: PetEditorActionTypes.FETCH_PET_SUCCEEDED;
  payload: IPet;
}

interface FetchPetFailedAction extends AnyAction {
  type: PetEditorActionTypes.FETCH_PET_FAILED;
  payload: string;
}

// interface ResetAction extends AnyAction {
//   type: PetEditorActionTypes.RESET;
// }

interface CreatePetRequestedAction extends AnyAction {
  type: PetEditorActionTypes.CREATE_PET_REQUESTED;
  payload: IPet;
}

interface CreatePetSucceededAction extends AnyAction {
  type: PetEditorActionTypes.CREATE_PET_SUCCEEDED;
  payload: IPet;
}

interface CreatePetFailedAction extends AnyAction {
  type: PetEditorActionTypes.CREATE_PET_FAILED;
  payload: string;
}

interface UpdatePetRequestedAction extends AnyAction {
  type: PetEditorActionTypes.UPDATE_PET_REQUESTED;
  payload: IPet;
}

interface UpdatePetSucceededAction extends AnyAction {
  type: PetEditorActionTypes.UPDATE_PET_SUCCEEDED;
  payload: IPet;
}

interface UpdatePetFailedAction extends AnyAction {
  type: PetEditorActionTypes.UPDATE_PET_FAILED;
  payload: string;
}

interface DeletePetRequestedAction extends AnyAction {
  type: PetEditorActionTypes.DELETE_PET_REQUESTED;
  payload: string;
}

interface DeletePetSucceededAction extends AnyAction {
  type: PetEditorActionTypes.DELETE_PET_SUCCEEDED;
  payload: string;
}

interface DeletePetFailedAction extends AnyAction {
  type: PetEditorActionTypes.DELETE_PET_FAILED;
  payload: string;
}

interface RedirectAction extends AnyAction {
  type: PetEditorActionTypes.REDIRECT;
  payload: string;
}

export type PetEditorAction =
  | FetchPetRequestedAction
  | FetchPetSucceededAction
  | FetchPetFailedAction
  | CreatePetRequestedAction
  | CreatePetSucceededAction
  | CreatePetFailedAction
  | UpdatePetRequestedAction
  | UpdatePetSucceededAction
  | UpdatePetFailedAction
  | DeletePetRequestedAction
  | DeletePetSucceededAction
  | DeletePetFailedAction
  | RedirectAction;

// | ResetAction
// | UpdateFieldAction;
