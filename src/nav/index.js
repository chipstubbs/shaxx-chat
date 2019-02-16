import React from 'react';
import { Button } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import {
    createSwitchNavigator,
    createDrawerNavigator,
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';

import Chats from '../screens/Chats';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ChatSettings from '../screens/ChatSettings';

/**
 * - AppSwitchNavigator
 *    - WelcomeScreen
 *      - Login Button
 *      - Sign Up Button
 *    - AppDrawerNavigator
 *          - Dashboard - DashboardStackNavigator(needed for header and to change the header based on the tab)
 *            - DashboardTabNavigator
 *              - Tab 1 - FeedStack
 *              - Tab 2 - ProfileStack
 *              - Tab 3 - SettingsStack
 *          - Documents
 *            - DocumentsSettings
 */

const DashboardTabNavigator = createBottomTabNavigator(
{
    Feed: {
        screen: Feed,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                return ( <Ionicons name = "ios-apps" size = { 25 } color = { tintColor } /> );
            }
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                return ( <Ionicons name = "md-person" size = { 25 } color = { tintColor } /> );
            }
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                return ( <MaterialCommunityIcons name = "settings" size = { 25 } color = { tintColor } /> );
            }
        }
    }
},
{
    navigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes[navigation.state.index];
        return {
            headerTitle: routeName
        };
    }
}
);

const DashboardStackNavigator = createStackNavigator(
{
    DashboardTabNavigator: DashboardTabNavigator
},
{
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerLeft: (
            <Ionicons
                style={{ paddingLeft: 10 }}
                onPress={() => navigation.openDrawer()}
                name="md-menu"
                size={30}
            />
            )
        };
    }
}
);

const ChatNavigator = createStackNavigator({
    Chats: {
        screen: Chats,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: 'Open Chats',
                headerLeft: (
                <Ionicons
                    style={{ paddingLeft: 10 }}
                    onPress={() => navigation.openDrawer()}
                    name="md-menu"
                    size={30}
                />
                ),
                headerRight: (
                <Button 
                    title='Settings'
                    style={{ paddingRight: 10 }}
                    onPress={() => navigation.navigate('ChatSettings')}
                />
                )
            };
        }
    },
    ChatSettings: { 
        screen: ChatSettings,
        navigationOptions: {
            headerTitle: 'Settings'
        }
    }
});

const AppDrawerNavigator = createDrawerNavigator(
{
    Dashboard: {
        screen: DashboardStackNavigator
    },
    Chat: { 
        screen: ChatNavigator
    }
},
{
    navigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes[navigation.state.index];
        return {
        header: null,
        headerTitle: routeName
        };
    }
});

export const AppSwitchNavigator = createSwitchNavigator({
    Welcome: { screen: WelcomeScreen },
    Loading: { screen: LoadingScreen, path: 'Loading' },
    Dashboard: { screen: AppDrawerNavigator, path: 'Dashboard' }
});