import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCustomer, deleteCustomer, fetchCustomerCollection, updateCustomer } from "../../actions/customer.actions";
import ICustomer from "../../../types/customer";
import { HYDRATE } from "next-redux-wrapper";
import { IFilterFieldValue } from "../../../types/filter";

interface ICustomerCollectionInitialState {
  loading: boolean;
  error: boolean;
  message?: string;
  filterValues: IFilterFieldValue;
}

const customerCollectionInitialState: ICustomerCollectionInitialState = {
  loading: false,
  error: false,
  message: "",
  filterValues: {
    query: "",
    selectedFilterId: "name",
    order: "asc",
  },
};

export const customerCollectionAdapter = createEntityAdapter<ICustomer>({
  selectId: (customer) => customer._id,
});

export const customerCollectionSlice = createSlice({
  name: "customers",
  initialState: customerCollectionAdapter.getInitialState(
    customerCollectionInitialState
  ),
  reducers: {
    setFilterValues(state, action: PayloadAction<IFilterFieldValue>) {
      state.filterValues = action.payload;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(HYDRATE, (state, { payload }) => ({
      ...state,
      ...payload.customers,
      loading: state.loading,
      error:  state.error,
      message: state.message,
      filterValues: state.filterValues,
    }));

    /**
     * Обработка события получения списка всех питомцев
     */
    builder.addCase(fetchCustomerCollection.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(fetchCustomerCollection.fulfilled, (state, action) => {
      state.loading = false;
      customerCollectionAdapter.setAll(state, action.payload);
      state.message = "Данные о клиентах успешно загружены";
    });

    builder.addCase(fetchCustomerCollection.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = `Ошибка при загрузке записи о клиенте: ${action.error.message}`;
    });

    /**
     * Обработка события по созданию записи для клиента
     */
    builder.addCase(createCustomer.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.loading = false;
      customerCollectionAdapter.addOne(state, action.payload);
    });

    builder.addCase(createCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = `Ошибка при создании записи о клиенте: ${action.error.message}`;
    });

    /**
     * Обработка события по обновлению записи для клиента
     */
    builder.addCase(updateCustomer.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.loading = false;
      customerCollectionAdapter.updateOne(state, action.payload);
    });

    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = `Ошибка при обновлении записи о клиенте: ${action.error.message}`;
    });

    /**
     * Обработка события по удалению записи для клиента
     */
    builder.addCase(deleteCustomer.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.loading = false;
      customerCollectionAdapter.removeOne(state, action.payload);
    });

    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = `Ошибка при удалении записи о клиенте: ${action.error.message}`;
    });
  },
});

export const { setFilterValues } = customerCollectionSlice.actions;
export default customerCollectionSlice.reducer;
