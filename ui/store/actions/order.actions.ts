import { createAsyncThunk, Update } from "@reduxjs/toolkit";
import axios from "axios";
import IOrder, { OrderCreateData, OrderUpdateData } from "../../types/order";
import { addMessage } from "../features/messages/messages.slice";

const timeoutPromise = async (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
  
/**
 * Запрос списка питомцев
 */
export const fetchOrderCollection = createAsyncThunk<
  IOrder[],
  void,
  { rejectValue: string }
>(
  "orderCollection/fetchOrderCollection",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<IOrder[]>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/orders`
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
export const fetchOrder = createAsyncThunk<
  IOrder,
  string,
  { rejectValue: string }
>("orderCollection/fetchOrder", async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get<IOrder>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/orders/${id}`
    );
    return response.data;
  } catch (e) {
    let message = axios.isAxiosError(e) ? e.response?.data.message : e.message;

    dispatch(addMessage({ type: "error", message }));
    return rejectWithValue(message);
  }
});

/**
 * Запрос на создание записи и питомце
 */
export const createOrder = createAsyncThunk<
  IOrder,
  OrderCreateData,
  { rejectValue: string }
>("orderCollection/createOrder", async (orderData, { rejectWithValue, dispatch }) => {
  try {

    await timeoutPromise(800);

    const response = await axios.post<IOrder>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/orders`,
      orderData
    );

    dispatch(
      addMessage({
        type: "success",
        message: "Заказ успешно сформирован",
      })
    );

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
export const updateOrder = createAsyncThunk<
  Update<IOrder>,
  OrderUpdateData,
  { rejectValue: string }
>(
  "orderCollection/updateOrder",
  async (orderData, { rejectWithValue, dispatch }) => {
    try {

      await timeoutPromise(800);

      const response = await axios.put<IOrder>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/orders`,
        orderData
      );

      dispatch(
        addMessage({
          type: "success",
          message: "Данные о заказе успешно сохранены",
        })
      );

      return { id: response.data._id, changes: orderData };
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
export const deleteOrder = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("orderCollection/deleteOrder", async (id, { rejectWithValue, dispatch }) => {
  try {

    await timeoutPromise(800);

    const response = await axios.delete<string>(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/orders/${id}`
    );

    dispatch(
      addMessage({
        type: "success",
        message: "Данные о заказе успешно удалены",
      })
    );

    return response.data;
  } catch (e) {
    let message = axios.isAxiosError(e) ? e.response?.data.message : e.message;

    dispatch(addMessage({ type: "error", message }));
    return rejectWithValue(message);
  }
});
