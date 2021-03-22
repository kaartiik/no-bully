import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Questions from '../screens/Questions';
import CorrectAnswerScreen from '../screens/Questions/CorrectAnswerScreen';
import WrongAnswerScreen from '../screens/Questions/WrongAnswerScreen';
import LevelCompleteScreen from '../screens/Questions/LevelCompleteScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home" mode="modal" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Questions" component={Questions} />
      <Stack.Screen
        name="CorrectAnswerScreen"
        component={CorrectAnswerScreen}
      />
      <Stack.Screen name="WrongAnswerScreen" component={WrongAnswerScreen} />
      <Stack.Screen
        name="LevelCompleteScreen"
        component={LevelCompleteScreen}
      />
    </Stack.Navigator>
  );
}
