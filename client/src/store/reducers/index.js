// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './authReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu,auth });

export default reducers;
