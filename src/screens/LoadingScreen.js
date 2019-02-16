import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { WebBrowser, Linking } from 'expo';
import { connect } from 'react-redux';
// import { getBungoTokenFromAPI } from '../actions/';
import { bungoApp } from '../../bungoApp';
import firebase from 'firebase';

const BUNGO_AUTH = 'https://www.bungie.net/en/oauth/authorize?response_type=code&client_id=234&state=doesntmatter';
const BUNGO_TOKEN_REQ = 'https://www.bungie.net/platform/app/oauth/token/';
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
        await this._bungoGiveToken(queryParams);
        // await this.props.getBungoTokenFromAPI(queryParams.code);
    };

    _bungoGiveToken = async(queryParams) => {
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
                    code: queryParams.code,
                })
            });

            let json = await response.json();
            alert(JSON.stringify({...json, 'kirk':'sucksalottadick'}))
            console.log('response: ', {...json, 'kirk':'sucksalottadick'});
            // return response;
            
            //add to state
        }
        catch (err) {
            console.log('err: ',err);
            console.log('err.response.data: ',err.response.data);
            console.log('err.response.data.error: ',err.response.data.error);
            this.setState({ error: err.response.data.error });
        }
    }

    createFormParams = (params) => {
        return Object.keys(params)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
    }

    hideLoad = () => {
        console.log(this.state);
    }
    
    render() {
        const { access_token, isFetching } = this.props.bungo;
        console.log('current props: ', this.props);
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/* access_token && <ActivityIndicator
            size="large"
          />*/}
          <Button
            title="wtf"
            onPress={() => alert(this.state.access_token)}
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
        //getBungoTokenFromAPI: (queryParams) => dispatch(getBungoTokenFromAPI(queryParams))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoadingScreen);