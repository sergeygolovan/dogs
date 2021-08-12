import { createAsyncThunk, Update } from "@reduxjs/toolkit";
import axios from "axios";
import IPet, { PetCreateData, PetUpdateData } from "../../types/pet";
import { addMessage } from "../features/messages/messages.slice";

const timeoutPromise = async (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

/**
 * Запрос списка питомцев
 */
export const fetchPetCollection = createAsyncThunk<
  IPet[],
  void,
  { rejectValue: string }
>(
  "petCollection/fetchPetCollection",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<IPet[]>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/pets`
      );
      return response.data;
    } catch (e) {
      let message = axios.isAxiosError(e)
        ? e.response?.data.message
        : e.message;

      dispatch(addMessage({ type: "error", message }));
      return rejectWithValue(message);
    }
  }
);

/**
 * Запрос записи о выбранном питомце
 */
export const fetchPet = createAsyncThunk<IPet, string, { rejectValue: string }>(
  "petCollection/fetchPet",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<IPet>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/pets/${id}`
      );

      return response.data;
    } catch (e) {
      let message = axios.isAxiosError(e)
        ? e.response?.data.message
        : e.message;

      dispatch(addMessage({ type: "error", message }));
      return rejectWithValue(message);
    }
  }
);

/**
 * Запрос на создание записи и питомце
 */
export const createPet = createAsyncThunk<
  IPet,
  PetCreateData,
  { rejectValue: string }
>("petCollection/createPet", async (petData, { rejectWithValue, dispatch }) => {
  try {
    await timeoutPromise(800);

    const data = new FormData();
    Object.keys(petData).forEach((field) =>
      data.append(field, (<any>petData)[field])
    );

    const response = await axios.post<IPet>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/pets`,
      data
    );

    dispatch(addMessage({ type: "success", message: "Запись о питомце успешно создана" }));

    return response.data;
  } catch (e) {
    let message = axios.isAxiosError(e) ? e.response?.data.message : e.message;

    dispatch(addMessage({ type: "error", message }));
    return rejectWithValue(message);
  }
});

/**
 * Запрос на обновление записи о питомце
 */
export const updatePet = createAsyncThunk<
  Update<IPet>,
  PetUpdateData,
  { rejectValue: string }
>("petCollection/updatePet", async (petData, { rejectWithValue, dispatch }) => {
  try {
    await timeoutPromise(800);

    const data = new FormData();
    Object.keys(petData).forEach((field) =>
      data.append(field, (<any>petData)[field])
    );

    const response = await axios.put<IPet>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/pets`,
      data
    );

    dispatch(
      addMessage({
        type: "success",
        message: "Данные о питомце успешно сохранены",
      })
    );

    return { id: response.data._id, changes: petData };
  } catch (e) {
    let message = axios.isAxiosError(e) ? e.response?.data.message : e.message;

    dispatch(addMessage({ type: "error", message }));
    return rejectWithValue(message);
  }
});

/**
 * Запрос на удаление записи о питомце
 */
export const deletePet = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("petCollection/deletePet", async (id, { rejectWithValue, dispatch }) => {
  try {
    await timeoutPromise(800);

    const response = await axios.delete<string>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/pets/${id}`
    );

    dispatch(addMessage({ type: "success", message: "Данные о питомце успешно удалены" }));

    return response.data;
  } catch (e) {
    let message = axios.isAxiosError(e) ? e.response?.data.message : e.message;

    dispatch(addMessage({ type: "error", message }));
    return rejectWithValue(message);
  }
});
