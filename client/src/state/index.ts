import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./auth";
import usersSlice from "./users";
import advertsSlice from "./adverts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersSlice,
    adverts: advertsSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
