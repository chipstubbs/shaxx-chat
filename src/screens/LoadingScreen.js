import React, { Component } from 'react';
import { AsyncStorage, View, Text, ActivityIndicator, Button, Image } from 'react-native';
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
        this.checkIfLoggedIn();
        if (this.props.bungo.user.destinyMembershipId === undefined) {
            console.log('async no');
            // Log into Bungo
            WebBrowser.openBrowserAsync(BUNGO_AUTH);
            // Get params off redirectUrl and send to _bungoGiveToken
            Linking.addEventListener('url', this._handleUrl);
        } else {
            console.log('async yes');
            // this.props.bungo.destinyMembershipId = AsyncStorage.getItem('user.destinyMembershipId');
        }
    }

    _handleUrl = async event => {
        WebBrowser.dismissBrowser();
        this.setState({ url: event.url });
        let { path, queryParams } = Expo.Linking.parse(event.url);
        await this.props.bungoGiveToken(queryParams.code);
    };


    checkIfLoggedIn = async () => {
        this.props.bungo.destinyMembershipId = '';
        try {
            this.props.bungo.user.destinyMembershipId = await AsyncStorage.getItem('destinyMembershipId') || undefined;
            this.props.bungo.access_token = await AsyncStorage.getItem('access_token') || '';
            this.props.bungo.user.displayName = await AsyncStorage.getItem('displayName') || '';
            this.props.bungo.user.membershipType = await AsyncStorage.getItem('membershipType') || '';
            // AsyncStorage getAllKeys -> multiGet
            // set all here in callback
        } catch (error) {
            // Error retrieving data
            console.log('checkIfLoggedIn error: ', error.message);
        }
        console.log('destinymembershipID from check ', this.props.bungo.destinyMembershipId);
        // return this.props.bungo.destinyMembershipId;
    }
    
    render() {
        const { access_token, token_type, expires_in, membership_id, 
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
          <Button
            title="Console"
            onPress={() => console.log(this.props)}
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
        getMemberships: (access_token) => dispatch(getMemberships(access_token)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoadingScreen);