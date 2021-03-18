import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function MainStack() {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator initialRouteName="AppStack" mode="modal" headerMode="none">
      <Stack.Screen name="AppStack" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}
