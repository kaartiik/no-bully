import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Header, Left, Right, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import colours from '../providers/constants/colours';
import { useNavigation } from '@react-navigation/native';

const AppBar = ({ title, showBack }) => {
  const navigation = useNavigation();

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={20}
              color={colours.themePrimary}
            />
          </TouchableOpacity>
        </Left>

        <Body>
          <Text>{title}</Text>
        </Body>

        <Right />
      </Header>
    </View>
  );
};

export default AppBar;
