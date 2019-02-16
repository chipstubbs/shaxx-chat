import { BUNGO_FETCH, BUNGO_FETCH_FAILURE, BUNGO_FETCH_SUCCESS } from "./Types";
import bungoApp from '../../bungoApp';

export const getBungoTokenFromAPI = (queryParams) => {
    return (dispatch, queryParams) => {
        dispatch(getBungoToken());
        console.log('state', this.state);
        dispatch(bungoGiveToken(queryParams));
    }
}

bungoGiveToken = async(queryParams) => {
    try {
        let response = await fetch(BUNGO_TOKEN_REQ, {
            method: 'POST',
            headers: {
                 'X-API-Key': bungoApp.apiKey,
                 'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: this.createFormParams({
                grant_type: 'authorization_code',
                client_id: bungoApp.client_id,
                code: queryParams,
            })
        });

        let json = await response.json();
        // alert(JSON.stringify({...json, 'kirk':'sucksalottadick'}))
        // console.log('response: ', {...json, 'kirk':'sucksalottadick'});
        // return response;
        dispatch(getBungoTokenSuccess(json));
        //add to state
    }
    catch (err) {
        // console.log('err: ',err);
        // console.log('err.response.data: ',err.response.data);
        // console.log('err.response.data.error: ',err.response.data.error);
        dispatch(getBungoTokenFailure(err));
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
        data
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