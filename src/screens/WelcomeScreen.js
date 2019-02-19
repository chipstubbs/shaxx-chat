import React, { Component } from 'react';
import { View, Button, AsyncStorage } from 'react-native';

class WelcomeScreen extends Component {
  removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem('destinyMembershipId');
      console.log('removed key');
    }
    catch(exception) {
      return false;
    }
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Loading')}
        />
        <Button
          title="Dash"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
        <Button
          title="Remove Async"
          onPress={() => this.removeItemValue('destinyMembershipId')}
        />
      </View>
    );
  }
}

export default WelcomeScreen;