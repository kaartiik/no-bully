import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Header, Left, Right, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import colours from '../providers/constants/colours';
import { logout } from '../providers/actions/User';

const AppBar = ({ title, showBack }) => {
  const dispatch = useDispatch();

  const { isAdmin } = useSelector((state) => ({
    isAdmin: state.userReducer.isAdmin,
  }));

  return (
    <View>
      <Header
        style={{
          backgroundColor: colours.white,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 8,
        }}
      >
        <Left>
          <TouchableOpacity onPress={() => dispatch(logout())}>
            <Ionicons
              name="arrow-back"
              size={20}
              color={colours.themePrimary}
            />
          </TouchableOpacity>
        </Left>

        <Body>
          {/* <Image
            // eslint-disable-next-line global-require
            source={require('../../assets/barbershop.png')}
            resizeMode="contain"
            style={{ alignSelf: 'flex-start', height: '100%', width: '150%' }}
          /> */}
          <Text>{title}</Text>
        </Body>

        <Right />
      </Header>
    </View>
  );
};

export default AppBar;
