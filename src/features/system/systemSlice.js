import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  modal: {},
};

const systemSlice = createSlice({
  name: 'system',
  initialState: initialState,
  reducers: {
    // global loading
    loadingAction: (state = initialState, { payload }) => {
      return { ...state, loading: payload };
    },
    //manage modal action
    toggleModalAction: (state = initialState, { payload }) => {
      if (!payload) return { ...state, modal: { ...initialState.modal } };
      return { ...state, modal: { ...state.modal, ...payload } };
    },
  },
  extraReducers: {},
});

export const system = (state) => state.system;
export const { loadingAction, toggleModalAction } = systemSlice.actions;
export default systemSlice.reducer;
