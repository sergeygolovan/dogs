import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import IPet, { PetCreateData, PetUpdateData } from "../../types/pet";

/**
 * Запрос списка питомцев
 */
export const fetchPetCollection = createAsyncThunk<
  IPet[],
  void,
  { rejectValue: string }
>("petCollection/fetchPetCollection", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IPet[]>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/pets`
    );
    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

/**
 * Запрос записи о выбранном питомце
 */
export const fetchPet = createAsyncThunk<
  IPet, 
  string, 
  { rejectValue: string }
>(
  "petCollection/fetchPet",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<IPet>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/pets/${id}`
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
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
>("petCollection/createPet", async (petData, { rejectWithValue }) => {
  try {
    const data = new FormData();
    Object.keys(petData).forEach((field) =>
      data.append(field, (<any>petData)[field])
    );

    const response = await axios.post<IPet>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/pets`,
      data
    );

    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

/**
 * Запрос на обновление записи о питомце
 */
export const updatePet = createAsyncThunk<
  IPet,
  PetUpdateData,
  { rejectValue: string }
>("petCollection/updatePet", async (petData, { rejectWithValue }) => {
  try {
    const data = new FormData();
    Object.keys(petData).forEach((field) =>
      data.append(field, (<any>petData)[field])
    );

    const response = await axios.put<IPet>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/pets`,
      data
    );

    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

/**
 * Запрос на удаление записи о питомце
 */
export const deletePet = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("petCollection/deletePet", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete<string>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/pets/${id}`
    );

    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
