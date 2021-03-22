import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import colours from './colours';

const globalStyles = StyleSheet.create({
  authGreeting: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  authFieldTitle: {
    color: colours.themePrimary,
    fontWeight: 'bold',
  },
  authLogo: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 15,
  },
  bigBtn: {
    marginHorizontal: 30,
    backgroundColor: colours.themePrimary,
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    height: 400,
    width: '80%',
    resizeMode: 'contain',
  },
});

export default globalStyles;
