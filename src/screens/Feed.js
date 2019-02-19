import React, { Component } from 'react';
import { ScrollView, View, Text, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { getProfileInfo } from '../actions/';
class Feed extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
    }

    componentWillMount() {
        AsyncStorage.getItem('access_token').then((token) => {
            this.setState({
              access_token: token
            });
        });
    }

    render() {
        

        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Button onPress={() => this.props.navigation.navigate('Welcome')}
                    title="Go Back to Welcome"
                />
                <Button onPress={() => console.log(this.state)}
                    title="console"
                />
                <Button title="Get Profile"
                    onPress={() => this.props.getProfileInfo()}
                />
            
                <View style={{ marginBottom: 30 }}>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                    <Text>Feed</Text>
                </View>
            </ScrollView>
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
        getProfileInfo: () => dispatch(getProfileInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);