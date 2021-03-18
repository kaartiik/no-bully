import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Questions from '../screens/Questions';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home" mode="modal" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Questions" component={Questions} />
    </Stack.Navigator>
  );
}
