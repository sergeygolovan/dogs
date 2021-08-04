import { createAsyncThunk, Update } from "@reduxjs/toolkit";
import axios from "axios";
import ICustomer, {
  CustomerCreateData,
  CustomerUpdateData,
} from "../../types/customer";

/**
 * Запрос списка питомцев
 */
export const fetchCustomerCollection = createAsyncThunk<
  ICustomer[],
  void,
  { rejectValue: string }
>(
  "customerCollection/fetchCustomerCollection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ICustomer[]>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers`
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
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
>("customerCollection/fetchCustomer", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<ICustomer>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers/${id}`
    );
    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

/**
 * Запрос на создание записи и питомце
 */
export const createCustomer = createAsyncThunk<
  ICustomer,
  CustomerCreateData,
  { rejectValue: string }
>(
  "customerCollection/createCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const data = new FormData();
      Object.keys(customerData).forEach((field) =>
        data.append(field, (<any>customerData)[field])
      );

      const response = await axios.post<ICustomer>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers`,
        data
      );

      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
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
  async (customerData, { rejectWithValue }) => {
    try {
      const data = new FormData();
      Object.keys(customerData).forEach((field) =>
        data.append(field, (<any>customerData)[field])
      );

      const response = await axios.put<ICustomer>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers`,
        data
      );

      return { id: response.data._id, changes: customerData };
    } catch (e) {
      return rejectWithValue(e.message);
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
>("customerCollection/deleteCustomer", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete<string>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/customers/${id}`
    );

    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
