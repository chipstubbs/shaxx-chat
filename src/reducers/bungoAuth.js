import { BUNGO_FETCH, BUNGO_FETCH_FAILURE, BUNGO_FETCH_SUCCESS } from '../actions/Types';
import { AsyncStorage } from 'react-native';

const initialState = {
    isFetching: false,
    error: false,
    access_token: '',
    expires_in: 0,
    membership_id: '',
    token_type: '',
    user: {
        destinyMembershipId: undefined,
        membershipType: undefined,
        displayName: undefined,
        iconPath: undefined
    }
}
  
export default bungoTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUNGO_FETCH:
            return {
                ...state,
                isFetching: true
            }
        case BUNGO_FETCH_SUCCESS:
            if (action.data.access_token) { AsyncStorage.setItem('access_token', action.data.access_token) }
            if (action.data.expires_in) { AsyncStorage.setItem('expires_in', action.data.expires_in) }
            if (action.data.membership_id) { AsyncStorage.setItem('membership_id', action.data.membership_id) }
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
            if (action.data.membershipId) { AsyncStorage.setItem('destinyMembershipId', action.data.membershipId) }
            if (action.data.membershipType) { AsyncStorage.setItem('membershipType', action.data.membershipType) }
            if (action.data.displayName) { AsyncStorage.setItem('displayName', action.data.displayName) }
            
            return {
                ...state,
                user: {
                    destinyMembershipId: action.data.membershipId,
                    membershipType: action.data.membershipType,
                    displayName: action.data.displayName,
                    iconPath: action.data.iconPath
                }
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