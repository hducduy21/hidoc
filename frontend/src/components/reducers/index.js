import userReducer from './user.js';
import department from './department.js';
import doctor from './doctor';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    User: userReducer,
    Department: department,
    Doctor: doctor
});

export default rootReducer;
