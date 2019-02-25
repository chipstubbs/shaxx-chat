import { GET_ACTIVITY_FOR_CHARACTER, FUCKING_ERROR, REFRESH_TOKEN, GET_PROFILE } from "./Types";
import { DestinyActivityModeType } from './DestinyTypes';
import { bungoApp } from '../../bungoApp';

const BUNGO_BASE = 'https://www.bungie.net/Platform';

export const getProfileInfo = (ACCESS_TOKEN, membershipType, destinyMembershipId) => {
    
    return function action(dispatch) {
        console.log('membershipType: ', membershipType);
        console.log('ACCESS_TOKEN: ', ACCESS_TOKEN);
        console.log('destinyMembershipId: ', destinyMembershipId);
        const queryComponents = encodeURIComponent('Characters');

        let request = fetch(BUNGO_BASE + '/Destiny2/' + membershipType + '/Profile/' + destinyMembershipId + '/?components=' + queryComponents, {
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
                    // get character ID and things we need'=
                    const resObj = response.Response.characters.data;
                    let characterArray = Object.keys(resObj);
                    let characterObj = {};
                    characterArray.forEach((value, i) => {
                        let num = 'character'+(i+1);
                        characterObj[num] = {
                            characterId: resObj[characterArray[i]].characterId,
                            classType: resObj[characterArray[i]].classType,
                            emblemPath: resObj[characterArray[i]].emblemPath,
                            stat: resObj[characterArray[i]].stats,
                            timePlayed: resObj[characterArray[i]].minutesPlayedTotal
                        };
                    })
            
                    // console.log(characterObj);
                    dispatch({ type: GET_PROFILE, characters: characterObj });
                },
                err => {
                    console.log('error in getProfileInfo: ', err);
                    dispatch({ type: FUCKING_ERROR, err: err })
                }
            );
    }
}

export const getActivityForCharacter = (ACCESS_TOKEN, membershipType, destinyMembershipId, characterId, characterNum) => {
    return function action(dispatch) {
        // characterNum used right now to keep track of which character was chosen.. need to clean up
        let params = '?count=10&mode='+DestinyActivityModeType.Gambit+'&page=0';
        let request = fetch(BUNGO_BASE + '/Destiny2/' + membershipType + '/Account/' + destinyMembershipId + '/Character/' + characterId + '/Stats/Activities/' + params, {
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
                    // console.log('getActivityForCharacter: ', response);
                    dispatch({ type: GET_ACTIVITY_FOR_CHARACTER, data: response.Response.activities, character: characterNum });
                },
                err => {
                    dispatch({ type: FUCKING_ERROR, err: err })
                }
            );
    }
}
