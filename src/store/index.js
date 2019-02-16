import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
// const rootReducer = (state = {}, action) => {
//     return state;
// }

export default store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
