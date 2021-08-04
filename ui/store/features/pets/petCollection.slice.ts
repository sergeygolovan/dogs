import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createPet,
  deletePet,
  fetchPet,
  fetchPetCollection,
  updatePet,
} from "../../actions/pet.actions";
import IPet from "../../../types/pet";
import { HYDRATE } from "next-redux-wrapper";

interface IPetCollectionInitialState {
  selected?: IPet;
  loading: boolean;
  error: boolean;
  message?: string;
}

const petCollectionInitialState: IPetCollectionInitialState = {
  loading: false,
  error: false,
};

export const petCollectionAdapter = createEntityAdapter<IPet>({
  selectId: (pet) => pet._id,
});

export const petCollectionSlice = createSlice({
  name: "pets",
  initialState: petCollectionAdapter.getInitialState(petCollectionInitialState),
  reducers: {},

  extraReducers: (builder) => {
    /**
     * Обработка события получения списка всех питомцев
     */
    builder.addCase(fetchPetCollection.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(fetchPetCollection.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "Данные о питомцах успешно загружены";
      petCollectionAdapter.setAll(state, action.payload);
    });

    builder.addCase(fetchPetCollection.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = `Ошибка при запросе данных о питомцах: ${action.error.message}`;
    });

    /**
     *
     */
    builder.addCase(fetchPet.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(fetchPet.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "Данные о питомце успешно загружены";
      petCollectionAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(fetchPet.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = `Ошибка при запросе данных о питомце: ${action.error.message}`;
    });

    /**
     * Обработка события по созданию записи для питомца
     */
    builder.addCase(createPet.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(createPet.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "Создание записи о питомце успешно выполнено";
      petCollectionAdapter.addOne(state, action.payload);
    });

    builder.addCase(createPet.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = `Ошибка при создании записи о питомце: ${action.error.message}`;
    });

    /**
     * Обработка события по обновлению записи для питомца
     */
    builder.addCase(updatePet.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(updatePet.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "Обновление записи о питомце успешно выполнено";
      petCollectionAdapter.updateOne(state, action.payload);
    });

    builder.addCase(updatePet.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = `Ошибка при обновлении записи о питомце: ${action.error.message}`;
    });

    /**
     * Обработка события по удалению записи для питомца
     */
    builder.addCase(deletePet.pending, (state) => {
      state.error = false;
      state.loading = true;
    });

    builder.addCase(deletePet.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "Удаление записи о питомце успешно выполнено";
      petCollectionAdapter.removeOne(state, action.payload);
    });

    builder.addCase(deletePet.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = `Ошибка при удалении записи о питомце: ${action.error.message}`;
    });
  },
});

export default petCollectionSlice.reducer;
