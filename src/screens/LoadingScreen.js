import React, { Component } from 'react';
import { AsyncStorage, View, Text, ActivityIndicator, Button, Image } from 'react-native';
import { WebBrowser, Linking } from 'expo';
import { connect } from 'react-redux';
import { bungoGiveToken, getMemberships } from '../actions/';
import { bungoApp } from '../../bungoApp';
import firebase from 'firebase';

const BUNGO_AUTH = 'https://www.bungie.net/en/oauth/authorize?response_type=code&client_id=26412&state=doesntmatter';
const BUNGO_TOKEN_REQ = 'https://www.bungie.net/platform/app/oauth/token/';
const BUNGO_BASE = 'https://www.bungie.net/Platform';
// REDIRECT = 'exp://exp.host/@cstubbs/shaxx-chat/--/Loading';
// LOCALREDIRECT = 'exp://10.8.0.85:19000/--/';

class LoadingScreen extends Component {

    state = {
        logged_in: ''
    }
    
    async componentDidMount() {
        await this.checkIfLoggedIn();
        console.log('logged_in: ', this.state.logged_in);
        console.log('destinyMembershipId: ', this.props.bungo.user.destinyMembershipId);
        if (this.state.logged_in) {
            console.log('logged in');
            this.props.navigation.navigate('Dashboard');
        } else {
            console.log('not logged in');
            // Log into Bungo
            WebBrowser.openBrowserAsync(BUNGO_AUTH);
            // Get params off redirectUrl and send to _bungoGiveToken
            Linking.addEventListener('url', this._handleUrl);
        }
    }

    _handleUrl = async event => {
        WebBrowser.dismissBrowser();
        this.setState({ url: event.url });
        let { path, queryParams } = Expo.Linking.parse(event.url);
        console.log('queryParams: ', queryParams);
        await this.props.bungoGiveToken(queryParams.code);
    };


    checkIfLoggedIn = async () => {
        try {
            this.props.bungo.user.destinyMembershipId = await AsyncStorage.getItem('destinyMembershipId') || '';
            this.props.bungo.access_token = await AsyncStorage.getItem('access_token') || '';
            this.props.bungo.user.membershipType = await AsyncStorage.getItem('membershipType') || '';
            if (this.props.bungo.user.destinyMembershipId != '') {
                this.setState({ logged_in: true });
            } else {
                this.setState({ logged_in: false });
                console.log('wtf');
            };
        } catch (error) {
            // Error retrieving data
            console.log('checkIfLoggedIn error: ', error.message);
        }
        // console.log('destinymembershipID from check ', this.props.bungo.destinyMembershipId);
        // return this.props.bungo.destinyMembershipId;
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.bungo.user.destinyMembershipId !== prevProps.bungo.user.destinyMembershipId) {
          this.props.navigation.navigate('Dashboard');
        }
    }
    
    render() {
        const { access_token, token_type, expires_in, membership_id, user } = this.props.bungo;
        // console.log('current props: ', this.props);
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          { access_token === '' && <ActivityIndicator
            size="large"
          />}
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