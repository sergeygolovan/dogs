import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPetCollection } from "../../actions/pets.actions";
import IPet from "../../../types/pet";


interface IPetCollectionInitialState {
    selected?: IPet
    loading: boolean,
    error: boolean,
    message?: string
}

const petCollectionInitialState: IPetCollectionInitialState = {
    loading: false,
    error: false,
}


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
      state.loading = false;
    });

    builder.addCase(fetchPetCollection.fulfilled, (state, action) => {
      state.loading = false;
      petCollectionAdapter.setAll(state, action.payload);
    });

    builder.addCase(fetchPetCollection.rejected, (state, action ) => {
      state.loading = false;
      state.error = true;
      state.message = action.error.message;
    });
  },


});


export default petCollectionSlice.reducer;