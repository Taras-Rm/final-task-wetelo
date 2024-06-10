import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ApiErrorT, UpdateUserT, UserT } from "../types/type";
import { AxiosError } from "axios";
import usersService from "../services/users";

export interface UsersState {
  users: UserT[];
  editUser: UserT | null;
}

const initialState: UsersState = {
  users: [],
  editUser: null,
};

export const getUsers = createAsyncThunk(
  "get-users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersService.getUsers();

      return { users: response.data };
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "delete-users-id",
  async (id: number, { rejectWithValue }) => {
    try {
      await usersService.deleteUser(id);

      return { id };
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "verify-user-id",
  async (id: number, { rejectWithValue }) => {
    try {
      await usersService.verifyUser(id);

      return { id };
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

type UpdateUser = {
  id: number;
  data: UpdateUserT;
};

export const updateUser = createAsyncThunk(
  "update-users-id",
  async ({ id, data }: UpdateUser, { rejectWithValue }) => {
    try {
      const response = await usersService.updateUser(id, data);

      return { user: response };
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setEditUserId: (state, action: PayloadAction<number>) => {
      state.editUser = state.users.find((u) => u.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<{ users: UserT[] }>) => {
          state.users = action.payload.users;
        }
      )
      .addCase(getUsers.rejected, (state, _) => {
        state.users = [];
      })
      .addCase(
        verifyUser.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.users = state.users.map((user) => {
            if (user.id === action.payload.id) {
              user.isVerified = true;
            }
            return user;
          });
        }
      )
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<{ user: UserT }>) => {
          state.users = state.users.map((u) => {
            if (u.id === action.payload.user.id) {
              return {
                ...action.payload.user,
              };
            }
            return u;
          });
          state.editUser = null;
        }
      )
      .addCase(updateUser.rejected, (state, _) => {
        state.editUser = null;
      })
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.users = state.users.filter((user) => {
            if (user.id !== action.payload.id) {
              return user;
            }
          });
        }
      );
  },
});

export const { setEditUserId } = usersSlice.actions;

export default usersSlice.reducer;
