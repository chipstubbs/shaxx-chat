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
                isFetching: true
            }
        case BUNGO_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                access_token: action.data.access_token,
                expires_in : action.data.expires_in,
                membership_id: action.data.membership_id,
                token_type: action.data.token_type
            }
        case BUNGO_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case 'GET_MEMBERSHIPS':
            return {
                ...state,
                destinyMembershipId: action.data.membershipId,
                membershipType: action.data.membershipType,
                displayName: action.data.displayName,
                iconPath: action.data.iconPath
            }
        case 'FUCKING_ERROR':
            return {
                ...state,
                error: action.err
            }
        default:
            return state
    }
}