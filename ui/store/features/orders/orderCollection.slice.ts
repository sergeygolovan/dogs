import { AnyAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { createOrder, deleteOrder, fetchOrderCollection, updateOrder } from "../../actions/order.actions";
import IOrder from "../../../types/order";
import { HYDRATE } from "next-redux-wrapper";

interface IOrderCollectionInitialState {
  selected?: IOrder;
  loading: boolean;
  error: boolean;
  message?: string;
}

const orderCollectionInitialState: IOrderCollectionInitialState = {
  loading: false,
  error: false,
};

export const orderCollectionAdapter = createEntityAdapter<IOrder>({
  selectId: (order) => order._id,
});

export const orderCollectionSlice = createSlice({
  name: "orders",
  initialState: orderCollectionAdapter.getInitialState(
    orderCollectionInitialState
  ),
  reducers: {},

  extraReducers: (builder) => {
    /**
     * Обработка события получения списка всех питомцев
     */
    builder.addCase(fetchOrderCollection.pending, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchOrderCollection.fulfilled, (state, action) => {
      state.loading = false;
      orderCollectionAdapter.setAll(state, action.payload);
    });

    builder.addCase(fetchOrderCollection.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.error.message;
    });

    /**
     * Обработка события по созданию записи для питомца
     */
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      orderCollectionAdapter.addOne(state, action.payload);
    });

    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.error.message;
    });

    /**
     * Обработка события по обновлению записи для питомца
     */
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false;
      orderCollectionAdapter.updateOne(state, action.payload);
    });

    builder.addCase(updateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.error.message;
    });

    /**
     * Обработка события по удалению записи для питомца
     */
    builder.addCase(deleteOrder.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.loading = false;
      orderCollectionAdapter.removeOne(state, action.payload);
    });

    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.error.message;
    });
  },
});

export default orderCollectionSlice.reducer;
