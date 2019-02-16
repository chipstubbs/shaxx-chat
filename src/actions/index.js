import { BUNGO_FETCH, BUNGO_FETCH_FAILURE, BUNGO_FETCH_SUCCESS } from "./Types";
import { bungoApp } from '../../bungoApp';
const BUNGO_TOKEN_REQ = 'https://www.bungie.net/platform/app/oauth/token/';

export const getBungoTokenFromAPI = () => {
    return (dispatch) => {
        dispatch(getBungoToken());
    }
}

export function bungoGiveToken(code) {
    return function action(dispatch) {
      dispatch({ type: BUNGO_FETCH })
  
      const request = fetch(BUNGO_TOKEN_REQ, {
            method: 'POST',
            headers: {
                    'X-API-Key': bungoApp.apiKey,
                    'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: this.createFormParams({
                grant_type: 'authorization_code',
                client_id: bungoApp.client_id,
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

// export const bungoAuthorize = (prop) => ({
//     type: BUNGO_FETCH,
//     id: 'whatevs',
//     info: prop
// });