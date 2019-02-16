import { BUNGO_FETCH, BUNGO_FETCH_FAILURE, BUNGO_FETCH_SUCCESS } from '../actions/Types';

const initialState = {
    isFetching: false,
    error: false,
    access_token: '',
    expires_in: 0,
    membership_id: '',
    token_type: ''
}
  
export default bungoTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUNGO_FETCH:
            return {
                ...state,
                people: [],
                isFetching: true
            }
        case BUNGO_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                access_token: action.data.access_token
            }
        case BUNGO_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}