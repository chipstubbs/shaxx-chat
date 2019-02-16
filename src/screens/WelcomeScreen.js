import React, { Component } from 'react';
import { View, Button } from 'react-native';

class WelcomeScreen extends Component {
  
  
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
      </View>
    );
  }
}

export default WelcomeScreen;