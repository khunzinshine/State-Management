import PlayerSlice from './players/playerSlice';
import SystemSlice from './system/systemSlice';
import TeamSlice from './teams/teamSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  player: PlayerSlice,
  team: TeamSlice,
  system: SystemSlice,
});

export default rootReducer;
