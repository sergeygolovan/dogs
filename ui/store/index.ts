import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import customerCollectionReducer, { customerCollectionAdapter, customerCollectionSlice} from "./features/customers/customerCollection.slice";
import petCollectionReducer, { petCollectionAdapter, petCollectionSlice } from "./features/pets/petCollection.slice";
import orderCollectionReducer, { orderCollectionAdapter, orderCollectionSlice } from "./features/orders/orderCollection.slice";
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import messagesSliceReducer, { messagesSlice } from "./features/messages/messages.slice";
import { nextReduxCookieMiddleware, wrapMakeStore } from "next-redux-cookie-wrapper";

const combinedReducer = combineReducers({
  [petCollectionSlice.name]: petCollectionReducer,
  [customerCollectionSlice.name]: customerCollectionReducer,
  [orderCollectionSlice.name]: orderCollectionReducer,
  [messagesSlice.name]: messagesSliceReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    console.log('last state: ', state);
    console.log('new state: ', action.payload);
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

export const store = configureStore({
  reducer: {
    [petCollectionSlice.name]: petCollectionReducer,
    [customerCollectionSlice.name]: customerCollectionReducer,
    [orderCollectionSlice.name]: orderCollectionReducer,
    [messagesSlice.name]: messagesSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(
    nextReduxCookieMiddleware({
      subtrees: ["my.subtree"],
    })
  ),
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

export const petCollectionSelectors = petCollectionAdapter.getSelectors<RootState>(state => state.pets);
export const customerCollectionSelectors = customerCollectionAdapter.getSelectors<RootState>(state => state.customers);
export const orderCollectionSelectors = orderCollectionAdapter.getSelectors<RootState>(state => state.orders);

export const wrapper = createWrapper(wrapMakeStore(() => store), { debug: true });
