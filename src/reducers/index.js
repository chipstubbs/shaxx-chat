import { combineReducers } from 'redux';
import bungoTokenReducer from './bungoAuth';

export default combineReducers({
    bungoTokenReducer: bungoTokenReducer
});