import { BUNGO_FETCH, BUNGO_FETCH_FAILURE, BUNGO_FETCH_SUCCESS, GET_MEMBERSHIPS, FUCKING_ERROR, REFRESH_TOKEN } from "./Types";
import { DestinyActivityModeType } from './DestinyTypes';
import { AsyncStorage } from 'react-native';
import { bungoApp } from '../../bungoApp';

const BUNGO_BASE = 'https://www.bungie.net/Platform';
// const ACCESS_TOKEN = AsyncStorage.getItem('access_token').then((token) => { return token; });
// const membershipType = AsyncStorage.getItem('membershipType').then((type) => { return type; });
// const destinyMembershipId = AsyncStorage.getItem('destinyMembershipId').then((dMID) => { return dMID; });

export const getProfileInfo = () => {
    
    return function action(dispatch) {
        // let destinyMembershipId = await AsyncStorage.getItem('destinyMembershipId');
        // let membershipType = await AsyncStorage.getItem('membershipType');
        // let ACCESS_TOKEN = await AsyncStorage.getItem('access_token');
        // console.log('membershipType', membershipType);
        // console.log('ACCESS_TOKEN ', ACCESS_TOKEN);

        let request = fetch(BUNGO_BASE + '/Destiny2/' + membershipType.toString() + '/Profile/' + destinyMembershipId.toString() + '/?components=100', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN.toString()}`,
                'X-API-Key': bungoApp.apiKey
            }
        });
        
        return request
            .then(response => response.json())
            .then(
                response => {
                    console.log('getProfileInfo - destinymembershipId: ', destinyMembershipId);
                    console.log('getProfileInfo: ', response);
                    dispatch({ type: 'GET_PROFILE', data: response });
                },
                err => {
                    console.log('error in getProfileInfo: ', err);
                    dispatch({ type: FUCKING_ERROR, err: err })
                }
            );
    }
}

export const getActivityForCharacter = (characterId) => {
    return function action(dispatch) {
    
        let request = fetch(BUNGO_BASE + '/Destiny2/' + membershipType + '/Account/' + destinyMembershipId + '/Character/' + characterId + '/Stats/Activies/', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'X-API-Key': bungoApp.apiKey
            }
        });
        
        return request
            .then(response => response.json())
            .then(
                response => {
                    // console.log('membershipresponse', response);
                    dispatch({ type: GET_MEMBERSHIPS, data: response.Response.destinyMemberships[0] });
                },
                err => {
                    dispatch({ type: FUCKING_ERROR, err: err })
                }
            );
    }
}

function getBungoToken() {
    return {
        type: BUNGO_FETCH
    }
}

function getBungoTokenSuccess(data) {
    return {
        type: BUNGO_FETCH_SUCCESS,
        data: data
    }
}

function getBungoTokenFailure() {
    return {
        type: BUNGO_FETCH_FAILURE
    }
}