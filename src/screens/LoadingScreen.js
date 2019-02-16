import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Button, Image } from 'react-native';
import { WebBrowser, Linking } from 'expo';
import { connect } from 'react-redux';
import { bungoGiveToken, getMemberships } from '../actions/';
import { bungoApp } from '../../bungoApp';
import firebase from 'firebase';

const BUNGO_AUTH = 'https://www.bungie.net/en/oauth/authorize?response_type=code&client_id=234&state=doesntmatter';
const BUNGO_TOKEN_REQ = 'https://www.bungie.net/platform/app/oauth/token/';
const BUNGO_BASE = 'https://www.bungie.net/Platform';
// REDIRECT = 'exp://exp.host/@cstubbs/shaxx-chat/--/Loading';
// LOCALREDIRECT = 'exp://10.8.0.85:19000/--/';

class LoadingScreen extends Component {
    
    componentDidMount() {
        // Log into Bungo
        WebBrowser.openBrowserAsync(BUNGO_AUTH);
        // Get params off redirectUrl and send to _bungoGiveToken
        Linking.addEventListener('url', this._handleUrl);
    }

    _handleUrl = async event => {
        WebBrowser.dismissBrowser();
        this.setState({ url: event.url });
        let { path, queryParams } = Expo.Linking.parse(event.url);
        // alert(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
        // await this._bungoGiveToken(queryParams);
        // await this.props.getBungoTokenFromAPI();
        await this.props.bungoGiveToken(queryParams.code);
    };

    // _bungoGiveToken = async(queryParams) => {
    //     try {
    //         let response = await fetch(BUNGO_TOKEN_REQ, {
    //             method: 'POST',
    //             headers: {
    //                  'X-API-Key': bungoApp.apiKey,
    //                  'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             body: this.createFormParams({
    //                 grant_type: 'authorization_code',
    //                 client_id: bungoApp.client_id,
    //                 code: queryParams.code,
    //             })
    //         });

    //         let json = await response.json();
    //         alert(JSON.stringify({...json, 'kirk':'sucksalottadick'}))
    //         console.log('response: ', {...json, 'kirk':'sucksalottadick'});
    //         // return response;
            
    //         //add to state
    //     }
    //     catch (err) {
    //         console.log('err: ',err);
    //         console.log('err.response.data: ',err.response.data);
    //         console.log('err.response.data.error: ',err.response.data.error);
    //         this.setState({ error: err.response.data.error });
    //     }
    // }

    // createFormParams = (params) => {
    //     return Object.keys(params)
    //         .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    //         .join('&');
    // }
    
    render() {
        const { access_token, token_type, expires_in, membership_id, getMemberships, 
            destinyMembershipId, membershipType, displayName, iconPath } = this.props.bungo;
        console.log('current props: ', this.props);
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          { access_token === '' && <ActivityIndicator
            size="large"
          />}
          <Text style={{ paddingLeft: 30, paddingRight: 30 }}>Access Token: {access_token}</Text>
          <Text>Token Type: {token_type}</Text>
          <Text>Expires In:{expires_in}</Text>
          <Text>Membership ID: {membership_id}</Text>
          <Text>Destiny Membership ID: {destinyMembershipId}</Text>
          <Text>Membership Type: {membershipType == 2 ? 'PSN' : 'Xbox'}</Text>
          <Text>displayName: {displayName}</Text>
          <Image 
            source={{uri: `https://www.bungie.net${iconPath}` }}
            style={{ width: 50, height: 50 }}
          />
          <Button 
              title="Get Membership"
              onPress={() => this.props.getMemberships(access_token)}
          />
        </View>
      );
    }
}

function mapStateToProps(state) {
    return {
        bungo: state.bungoTokenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bungoGiveToken: (code) => dispatch(bungoGiveToken(code)),
        getMemberships: (access_token) => dispatch(getMemberships(access_token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoadingScreen);