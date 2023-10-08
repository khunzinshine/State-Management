import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  detail: null,
  returnMessage: null
};

const Slice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {
    createTeam: (state, { payload }) => {
      const isNameUnique = !state.data.some(
        team => team.data.name === payload.name
      );

      if (isNameUnique) {
        const newTeam = {
          id: Date.now(),
          data: payload
        };
        state.data.push(newTeam);
      } else {
        state.returnMessage = "Team Name already exists!";
      }
    },
    updateTeam: (state, { payload }) => {
      const { id, data } = payload;
      const isNameUnique = state.data.some(
        team => team.data.name === data.name && team.id !== id
      );

      if (!isNameUnique) {
        const updatedData = state.data.map(team => {
          if (team.id === id) {
            return {
              ...team,
              data: data
            };
          }
          return team;
        });

        return {
          ...state,
          data: updatedData,
          returnMessage: null
        };
      } else {
        return { ...state, returnMessage: "Team Name already exists!" };
      }
    },

    deleteTeam: (state, { payload }) => {
      const id = payload;
      let index = state.data.filter(i => i.id !== id);
      state.data = index;
    },
    detailTeam: (state, { payload }) => {
      return { ...state, detail: payload };
    },
    resetMessage: (state, { payload }) => {
      return { ...state, returnMessage: null };
    },
    teamList: (state, { payload }) => {
      return { ...state, data: payload };
    }
  }
});

export const team = state => state.team;
export const {
  createTeam,
  updateTeam,
  deleteTeam,
  detailTeam,
  resetMessage,
  teamList
} = Slice.actions;
export default Slice.reducer;
