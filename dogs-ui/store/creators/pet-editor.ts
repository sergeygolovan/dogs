import { Dispatch } from "react";
import axios from "axios";
import {
  PetEditorAction,
  PetEditorActionTypes,
} from "../actions/pet-editor.actions";
import IPet from "../../types/pet";

export const fetchPet = (id: string) => {
  return async (dispatch: Dispatch<PetEditorAction>) => {
    dispatch({ type: PetEditorActionTypes.FETCH_PET_REQUESTED, payload: id });

    try {
      const response = await axios.get<IPet>(
        `http://localhost:5000/pets/${id}`
      );
      dispatch({
        type: PetEditorActionTypes.FETCH_PET_SUCCEEDED,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: PetEditorActionTypes.FETCH_PET_FAILED,
        payload: `Произошла ошибка при загрузке данных о питомце c идентификатором ${id}: ${e.message}`,
      });
    }
  };
};

export const createPet = (pet: any) => {
  return async (dispatch: Dispatch<PetEditorAction>) => {
    dispatch({ type: PetEditorActionTypes.CREATE_PET_REQUESTED, payload: pet });

    try {
      const response = await axios.post<IPet>(
        `http://localhost:5000/pets`,
        pet
      );
      dispatch({
        type: PetEditorActionTypes.CREATE_PET_SUCCEEDED,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: PetEditorActionTypes.CREATE_PET_FAILED,
        payload: `Произошла ошибка при создании питомца: ${e.message}`,
      });
    }
  };
};

export const updatePet = (pet: any) => {
  return async (dispatch: Dispatch<PetEditorAction>) => {
    dispatch({ type: PetEditorActionTypes.UPDATE_PET_REQUESTED, payload: pet });

    try {
      const response = await axios.put<IPet>(
        `http://localhost:5000/pets/${pet.id}`,
        pet
      );
      dispatch({
        type: PetEditorActionTypes.UPDATE_PET_SUCCEEDED,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: PetEditorActionTypes.UPDATE_PET_FAILED,
        payload: `Произошла ошибка при обновлении данных о питомце: ${e.message}`,
      });
    }
  };
};

// export const reset = () => {
//   return async (dispatch: Dispatch<PetEditorAction>) => {
//     dispatch({ type: PetEditorActionTypes.RESET });
//   };
// };