import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  AdvertT,
  ApiErrorT,
  CreateAdvertT,
  UpdateAdvertT,
} from "../types/type";
import { AxiosError } from "axios";
import advertsService from "../services/adverts";

export interface AdvertsState {
  adverts: AdvertT[];
  editAdvert: AdvertT | null;
}

const initialState: AdvertsState = {
  adverts: [],
  editAdvert: null,
};

export const getAdverts = createAsyncThunk(
  "get-adverts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await advertsService.getAdverts();

      return { adverts: response.data };
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const deleteAdvert = createAsyncThunk(
  "delete-advert-id",
  async (id: number, { rejectWithValue }) => {
    try {
      await advertsService.deleteAdvert(id);

      return { id };
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const createAdvert = createAsyncThunk(
  "post-create-adverts",
  async (data: CreateAdvertT, { rejectWithValue, dispatch }) => {
    try {
      await advertsService.createAdvert(data);

      await dispatch(getAdverts()).unwrap();
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

type UpdateAdvert = {
  id: number;
  data: UpdateAdvertT;
};

export const updateAdvert = createAsyncThunk(
  "put-update-adverts-id",
  async ({ id, data }: UpdateAdvert, { rejectWithValue }) => {
    try {
      const response = await advertsService.updateAdvert(id, data);

      return { advert: response };
    } catch (error) {
      const err = error as AxiosError<ApiErrorT>;
      return rejectWithValue(err.response?.data.message);
    }
  }
);

export const advertsSlice = createSlice({
  name: "adverts",
  initialState,
  reducers: {
    setEditAdvertId: (state, action: PayloadAction<number>) => {
      state.editAdvert =
        state.adverts.find((a) => a.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAdverts.fulfilled,
        (state, action: PayloadAction<{ adverts: AdvertT[] }>) => {
          state.adverts = action.payload.adverts;
        }
      )
      .addCase(getAdverts.rejected, (state, _) => {
        state.adverts = [];
      })
      .addCase(
        updateAdvert.fulfilled,
        (state, action: PayloadAction<{ advert: AdvertT }>) => {
          state.adverts = state.adverts.map((a) => {
            if (a.id === action.payload.advert.id) {
              return {
                ...action.payload.advert,
              };
            }
            return a;
          });
          state.editAdvert = null;
        }
      )
      .addCase(updateAdvert.rejected, (state, _) => {
        state.editAdvert = null;
      })
      .addCase(
        deleteAdvert.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.adverts = state.adverts.filter((a) => {
            if (a.id !== action.payload.id) {
              return a;
            }
          });
        }
      );
  },
});

export const { setEditAdvertId } = advertsSlice.actions;

export default advertsSlice.reducer;
