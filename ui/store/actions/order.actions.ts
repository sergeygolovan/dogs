import { createAsyncThunk, Update } from "@reduxjs/toolkit";
import axios from "axios";
import IOrder, { OrderCreateData, OrderUpdateData } from "../../types/order";

/**
 * Запрос списка питомцев
 */
export const fetchOrderCollection = createAsyncThunk<
  IOrder[],
  void,
  { rejectValue: string }
>("orderCollection/fetchOrderCollection", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IOrder[]>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/orders`
    );
    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

/**
 * Запрос записи о выбранном питомце
 */
export const fetchOrder = createAsyncThunk<
  IOrder,
  string,
  { rejectValue: string }
>("orderCollection/fetchOrder", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<IOrder>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/orders/${id}`
    );
    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

/**
 * Запрос на создание записи и питомце
 */
export const createOrder = createAsyncThunk<
  IOrder,
  OrderCreateData,
  { rejectValue: string }
>("orderCollection/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const data = new FormData();
    Object.keys(orderData).forEach((field) =>
      data.append(field, (<any>orderData)[field])
    );

    const response = await axios.post<IOrder>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/orders`,
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
export const updateOrder = createAsyncThunk<
  Update<IOrder>,
  OrderUpdateData,
  { rejectValue: string }
>("orderCollection/updateOrder", async (orderData, { rejectWithValue }) => {
  try {
    const data = new FormData();
    Object.keys(orderData).forEach((field) =>
      data.append(field, (<any>orderData)[field])
    );

    const response = await axios.put<IOrder>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/orders`,
      data
    );

    return { id: response.data._id, changes: orderData };
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

/**
 * Запрос на удаление записи о питомце
 */
export const deleteOrder = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("orderCollection/deleteOrder", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete<string>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/orders/${id}`
    );

    return response.data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
