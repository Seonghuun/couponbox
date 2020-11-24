import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation-stack';
import firstpage from './First';
import secondpage from './Second';

const App = createStackNavigator(
    {
        Home: { screen: firstpage},
        Second: { screen: secondpage}
    },
    { initialRouteName: 'Home', headerMode: 'none' }
);

export default createAppContainer(App);