import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadingAction } from '../system/systemSlice';

export const fetchPlayerList = createAsyncThunk(
  'fetchPlayerList',
  async ({ url, body }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(loadingAction(true));
      const response = await axios.get(url, { params: body });
      dispatch(loadingAction(false));
      return fulfillWithValue(response);
    } catch (err) {
      dispatch(loadingAction(false));
      return rejectWithValue(err);
    }
  }
);
