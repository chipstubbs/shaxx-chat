import { BUNGO_FETCH, BUNGO_FETCH_FAILURE, BUNGO_FETCH_SUCCESS, GET_MEMBERSHIPS, FUCKING_ERROR, REFRESH_TOKEN } from "./Types";
import { bungoApp } from '../../bungoApp';

const BUNGO_TOKEN_REQ = 'https://www.bungie.net/platform/app/oauth/token/';
const BUNGO_BASE = 'https://www.bungie.net/Platform';
const GET_MEMBERSHIP_ID = '/User/GetMembershipsForCurrentUser/';

export const refreshBungoToken = (refreshToken) => {
    return function action(dispatch) {
    
        let request = fetch(BUNGO_TOKEN_REQ, {
            method: 'POST',
            headers: {
                'X-API-Key': bungoApp.apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: this.createFormParams({
                grant_type: 'refresh_token',
                client_id: bungoApp.client_id,
                client_secret: bungoApp.client_secret,
                refresh_token: refreshToken,
            })
        });
        
        return request
            .then(response => response.json())
            .then(
                response => {
                    // console.log('refreshBungoToken response: ', response);
                    dispatch(getBungoTokenSuccess(response));
                },
                err => {
                    dispatch({ type: FUCKING_ERROR, err: err })
                }
            );
    }
}

export const getMemberships = (token) => {
    return function action(dispatch) {
    
        let request = fetch(BUNGO_BASE + GET_MEMBERSHIP_ID, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`,
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

export function bungoGiveToken(code) {
    return function action(dispatch) {
      dispatch(getBungoToken());
  
      const request = fetch(BUNGO_TOKEN_REQ, {
            method: 'POST',
            headers: {
                'X-API-Key': bungoApp.apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: this.createFormParams({
                grant_type: 'authorization_code',
                client_id: bungoApp.client_id,
                client_secret: bungoApp.client_secret,
                code: code,
            })
        });
      
      return request.then(response => response.json())
        .then(
            response => dispatch(getBungoTokenSuccess(response)),
            err => dispatch(getBungoTokenFailure(err))
        );
    }
}

createFormParams = (params) => {
    return Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
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
// expire set and check
// should set when given access token
// const expiresIn = new Date().getTime() + (expires_in * 1000);
// let now = new Date().getTime();
// if (now > expiresIn) { refreshBungoToken(refreshtoken) }
// redirect to dash?
// check in welcome or loading screen