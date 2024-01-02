import cartSlice from "./features/cart/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
const persistConfig = {
  key: "cart",
  storage,
};
const persistedReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    middleware: [thunk],
  },
});

export const persistor = persistStore(store);
