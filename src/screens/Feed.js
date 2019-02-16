import React, { Component } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';

class Feed extends Component {
    constructor(props){
        super(props);
        
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Button onPress={() => this.props.navigation.navigate('Welcome')}
                    title="Go Back to Welcome"
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

export default Feed;