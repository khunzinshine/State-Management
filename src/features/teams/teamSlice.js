import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  detail: null,
  returnMessage: null,
};

const Slice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {
    createTeam: (state = initialState, { payload }) => {
      const newTeam = {
        id: Date.now(),
        data: payload,
      };
      let stateData = state.data.map((s) => s.data);
      let checkedName = stateData.some((s) => s.name === newTeam.data.name);
      if (checkedName) {
        state.returnMessage = 'Team Name already existed!';
        return state;
      }
      state.data?.push(newTeam);
    },
    updateTeam: (state, { payload }) => {
      const { id, data } = payload;

      let stateData = state.data.map((s) => s.data);
      let checkedName = stateData.some((s) => s.name === data.name);
      if (checkedName) {
        state.returnMessage = 'Team Name already existed!';
        return state;
      }

      const team = state.data.find((t) => t.id === id);
      if (team) {
        team.data = data;
      }
    },
    deleteTeam: (state, { payload }) => {
      const id = payload;
      let index = state.data.filter((i) => i.id !== id);
      state.data = index;
    },
    detailTeam: (state, { payload }) => {
      return { ...state, detail: payload };
    },
    resetMessage: (state, { payload }) => {
      return { ...state, returnMessage: null };
    },
  },
});

export const team = (state) => state.team;
export const { createTeam, updateTeam, deleteTeam, detailTeam, resetMessage } =
  Slice.actions;
export default Slice.reducer;
