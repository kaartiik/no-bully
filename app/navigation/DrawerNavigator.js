import React, { useContext } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { useDispatch } from 'react-redux';
import colours from '../providers/constants/colours';

import MainStack from './MainStack';
import Instructions from '../screens/Instructions';
import Achievements from '../screens/Achievements';
import { logout } from '../providers/actions/User';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => dispatch(logout())}
        activeTintColor="white"
        inactiveTintColor="white"
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      overlayColor="black"
      drawerStyle={{
        backgroundColor: colours.themeSecondaryLight,
      }}
      drawerContentOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}
    >
      <Drawer.Screen name="Home" component={MainStack} />
      <Drawer.Screen name="How to Play?" component={Instructions} />
      <Drawer.Screen name="Achievements" component={Achievements} />
    </Drawer.Navigator>
  );
}
