import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getProfileInfo } from '../actions/';
class Feed extends Component {
    constructor(props){
        super(props);
        console.log('Feed constructor props', props);
        this.state = {
            spinnitFilter: true,
            showCharacter: false
        }
    }

    async componentDidMount() {
        await this.props.getProfileInfo(this.props.bungo.access_token, this.props.bungo.user.membershipType, this.props.bungo.user.destinyMembershipId);
        this.setState({ showCharacter: true, spinnitFilter: false })
    }

    showCharacterSelection = () => {
        if ( this.state.showCharacter ) {
            console.log(this.props.bungo);
            const { character1, character2, character3 } = this.props.bungo.user;
            const charList = [ character1, character2, character3 ];
            const charType = { 0:'Titan', 1:'Hunter', 2:'Space Wizard'};
            
            return (
                <Card title="Select Character to View Matches" style={{ flex: 1 }}>
                    {charList.map((character, i) => {
                        return (
                            <TouchableOpacity key={i} onPress={() => alert(character.characterId)}>
                                <ListItem
                                    roundAvatar
                                    title={charType[character.classType]}
                                    //avatar={{ uri: 'https://www.bungie.net'+character.emblemPath }}
                                    leftAvatar={{ containerStyle: { width: 96, height: 96 }, source: { uri: 'https://www.bungie.net'+character.emblemPath } }}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </Card>
            );
            
        }
    }

    render() {
        
        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Button onPress={() => this.props.navigation.navigate('Welcome')}
                    title="Go Back to Welcome"
                />
                <Button onPress={() => console.log(this.props)}
                    title="Console Props"
                />
                <Button onPress={() => console.log(this.state)} title="Console State" />
                {this.state.spinnitFilter && <ActivityIndicator size="large" />}
                {
                    this.showCharacterSelection()
                }
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
        getProfileInfo: (access_token, membershipType, destinyMembershipId) => dispatch(getProfileInfo(access_token, membershipType, destinyMembershipId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);