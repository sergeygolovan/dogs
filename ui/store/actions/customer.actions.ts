import { createAsyncThunk, Update } from "@reduxjs/toolkit";
import axios from "axios";
import ICustomer, {
  CustomerCreateData,
  CustomerUpdateData,
} from "../../types/customer";
import { addMessage } from "../features/messages/messages.slice";

const timeoutPromise = async (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

/**
 * Запрос списка питомцев
 */
export const fetchCustomerCollection = createAsyncThunk<
  ICustomer[],
  void,
  { rejectValue: string }
>(
  "customerCollection/fetchCustomerCollection",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<ICustomer[]>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers`
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
export const fetchCustomer = createAsyncThunk<
  ICustomer,
  string,
  { rejectValue: string }
>(
  "customerCollection/fetchCustomer",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<ICustomer>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers/${id}`
      );
      //dispatch(addMessage({ type: "success", message: "Данные о клиенте успешно загружены" }));
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
export const createCustomer = createAsyncThunk<
  ICustomer,
  CustomerCreateData,
  { rejectValue: string }
>(
  "customerCollection/createCustomer",
  async (customerData, { rejectWithValue, dispatch }) => {
    try {
      await timeoutPromise(800);

      const data = new FormData();
      Object.keys(customerData).forEach((field) =>
        data.append(field, (<any>customerData)[field])
      );

      const response = await axios.post<ICustomer>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers`,
        data
      );

      dispatch(addMessage({ type: "success", message: "Новая запись успешно создана" }));

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
 * Запрос на обновление записи о питомце
 */
export const updateCustomer = createAsyncThunk<
  Update<ICustomer>,
  CustomerUpdateData,
  { rejectValue: string }
>(
  "customerCollection/updateCustomer",
  async (customerData, { rejectWithValue, dispatch }) => {
    try {
      await timeoutPromise(800);

      const data = new FormData();
      Object.keys(customerData).forEach((field) =>
        data.append(field, (<any>customerData)[field])
      );

      const response = await axios.put<ICustomer>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers`,
        data
      );

      dispatch(addMessage({ type: "success", message: "Данные о клиенте успешно обновлены" }));

      return { id: response.data._id, changes: customerData };
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
 * Запрос на удаление записи о питомце
 */
export const deleteCustomer = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "customerCollection/deleteCustomer",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await timeoutPromise(800);

      const response = await axios.delete<string>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers/${id}`
      );
      
      dispatch(addMessage({ type: "success", message: "Данные о клиенте успешно удалены" }));

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
