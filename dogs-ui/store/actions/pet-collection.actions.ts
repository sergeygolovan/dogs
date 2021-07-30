import { AnyAction } from "redux";
import IPet from "../../types/pet";

export enum PetCollectionActionTypes {
    FETCH_PETS = 'FETCH_PETS',
    FETCH_PETS_SUCCESS = 'FETCH_PETS_SUCCESS',
    FETCH_PETS_ERROR = 'FETCH_PETS_ERROR'
}

interface FetchPetCollectionAction extends AnyAction {
    type: PetCollectionActionTypes.FETCH_PETS;
}

interface FetchPetCollectionSuccessAction extends AnyAction {
    type: PetCollectionActionTypes.FETCH_PETS_SUCCESS;
    payload: IPet[]
}

interface FetchPetCollectionErrorAction extends AnyAction {
    type: PetCollectionActionTypes.FETCH_PETS_ERROR;
    payload: string
}

export type PetCollectionAction = FetchPetCollectionAction | FetchPetCollectionSuccessAction | FetchPetCollectionErrorAction;