import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { Linking } from 'expo';
import { AppSwitchNavigator } from './src/nav';
import store from './src/store';
import { Provider } from 'react-redux';
// import * as firebase from 'firebase';
// import { firebaseConfig } from './config';
// firebase.initializeApp(firebaseConfig);

const AppContainer = createAppContainer(AppSwitchNavigator);

const prefix = Linking.makeUrl('/');

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer uriPrefix={prefix} />
      </Provider>
    );
  }
}

export default App;
