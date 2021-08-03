import { AnyAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { createCustomer, deleteCustomer, fetchCustomerCollection, updateCustomer } from "../../actions/customer.actions";
import ICustomer from "../../../types/customer";
import { HYDRATE } from "next-redux-wrapper";

interface ICustomerCollectionInitialState {
  selected?: ICustomer;
  loading: boolean;
  error: boolean;
  message?: string;
}

const customerCollectionInitialState: ICustomerCollectionInitialState = {
  loading: false,
  error: false,
};

export const customerCollectionAdapter = createEntityAdapter<ICustomer>({
  selectId: (customer) => customer._id,
});

export const customerCollectionSlice = createSlice({
  name: "customers",
  initialState: customerCollectionAdapter.getInitialState(
    customerCollectionInitialState
  ),
  reducers: {},

  extraReducers: (builder) => {
    /**
     * Обработка события получения списка всех питомцев
     */
    builder.addCase(fetchCustomerCollection.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCustomerCollection.fulfilled, (state, action) => {
      state.loading = false;
      customerCollectionAdapter.setAll(state, action.payload);
    });

    builder.addCase(fetchCustomerCollection.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.error.message;
    });

    /**
     * Обработка события по созданию записи для клиента
     */
    builder.addCase(createCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.loading = false;
      customerCollectionAdapter.addOne(state, action.payload);
    });

    builder.addCase(createCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.error.message;
    });

    /**
     * Обработка события по обновлению записи для клиента
     */
    builder.addCase(updateCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.loading = false;
      customerCollectionAdapter.updateOne(state, action.payload);
    });

    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.error.message;
    });

    /**
     * Обработка события по удалению записи для клиента
     */
    builder.addCase(deleteCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.loading = false;
      customerCollectionAdapter.removeOne(state, action.payload);
    });

    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.error.message;
    });
  },
});

export default customerCollectionSlice.reducer;
