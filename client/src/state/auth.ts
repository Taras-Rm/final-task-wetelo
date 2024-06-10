import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/auth";
import { ApiErrorT, LoginT, RegistrationT, UserT } from "../types/type";
import { AxiosError } from "axios";

export interface AuthState {
  token: string;
  user: UserT | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || "",
  user: null,
};

export const login = createAsyncThunk(
  "post-auth-login",
  async (data: LoginT, { rejectWithValue }) => {
    try {
      const response = await authService.login(data);

      return { token: response.token };
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const registration = createAsyncThunk(
  "post-auth-register",
  async (data: RegistrationT, { rejectWithValue }) => {
    try {
      await authService.registration(data);
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth-logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const me = createAsyncThunk(
  "get-auth-me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.me();

      return { user: response };
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadTokenFromStorage: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(login.rejected, (state, _) => {
        state.token = "";
      })
      .addCase(
        me.fulfilled,
        (state, action: PayloadAction<{ user: UserT }>) => {
          state.user = action.payload.user;
        }
      )
      .addCase(me.rejected, (state, _) => {
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, _) => {
        state.token = "";
        state.user = null;
      });
  },
});

export const { loadTokenFromStorage } = authSlice.actions;

export default authSlice.reducer;
