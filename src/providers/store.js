import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./services/authQuery";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slice/authSlice";
import { flows } from "./services/flowsQuery";
import flowsSlice from "./slice/flowsSlice";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [flows.reducerPath]: flows.reducer,
    authSlice: authSlice.reducer,
    flowsSlice: flowsSlice.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), auth.middleware, flows.middleware];
  },
});
setupListeners(store.dispatch);
