import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayerList } from './playerAPI';

const initialState = {
  data: [],
  returnMessage: null,
};

const Slice = createSlice({
  name: 'player',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlayerList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchPlayerList.rejected, (state, action) => {
      state.returnMessage = action.payload;
    });
  },
});

export const player = (state) => state.player;
export default Slice.reducer;
