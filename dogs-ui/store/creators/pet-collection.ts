import { Dispatch } from "react";
import axios from "axios";
import {
  PetCollectionAction,
  PetCollectionActionTypes,
} from "../actions/pet-collection.actions";
import IPet from "../../types/pet";

export const fetchPetCollection = () => {
  return async (dispatch: Dispatch<PetCollectionAction>) => {

    dispatch({ type: PetCollectionActionTypes.FETCH_PETS });

    try {
      const response = await axios.get<IPet[]>("http://localhost:5000/pets");
      dispatch({
        type: PetCollectionActionTypes.FETCH_PETS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: PetCollectionActionTypes.FETCH_PETS_ERROR,
        payload: "Произошла ошибка при загрузке списка питомцев",
      });
    }
  };
};
