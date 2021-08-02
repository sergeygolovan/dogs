import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import petCollectionReducer, { petCollectionAdapter, petCollectionSlice } from "./features/pets/petCollection.slice";

export const store = configureStore({
  reducer: {
    [petCollectionSlice.name]: petCollectionReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const petCollectionSelectors = petCollectionAdapter.getSelectors<RootState>((state) => state.pets);
