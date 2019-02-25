import { BUNGO_FETCH, BUNGO_FETCH_FAILURE, BUNGO_FETCH_SUCCESS, GET_MEMBERSHIPS, FUCKING_ERROR, GET_ACTIVITY_FOR_CHARACTER, GET_PROFILE } from '../actions/Types';
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
            if (action.data.expires_in) { AsyncStorage.setItem('expires_in', action.data.expires_in.toString()) }
            if (action.data.membership_id) { AsyncStorage.setItem('membership_id', action.data.membership_id) }
            return {
                ...state,
                isFetching: false,
                access_token: action.data.access_token,
                expires_in : action.data.expires_in,
                refresh_token: action.data.refresh_token,
                refresh_expires_in: action.data.refresh_expires_in,
                membership_id: action.data.membership_id,
                token_type: action.data.token_type
            }
        case BUNGO_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case GET_MEMBERSHIPS:
            if (action.data.membershipId) { AsyncStorage.setItem('destinyMembershipId', action.data.membershipId) }
            if (action.data.membershipType) { AsyncStorage.setItem('membershipType', action.data.membershipType.toString()) }
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
        case GET_PROFILE:
            return {
                ...state,
                user: {
                    ...state.user,
                    character1: action.characters.character1,
                    character2: action.characters.character2,
                    character3: action.characters.character3
                }
            }
        case GET_ACTIVITY_FOR_CHARACTER:
            return {
                ...state,
                user: {
                    ...state.user,
                    activities: action.data
                }
            }
        case FUCKING_ERROR:
            return {
                ...state,
                error: action.err
            }
        default:
            return state
    }
}