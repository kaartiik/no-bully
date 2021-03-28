import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colours from '../../providers/constants/colours';
import globalStyles from '../../providers/constants/globalStyles';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { replayGame } from '../../providers/actions/User';

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 16,
    height: 0.5,
    width: '100%',
    backgroundColor: colours.borderGrey,
    alignSelf: 'center',
  },
  recipeDescription: {
    marginVertical: 3,
    width: 220,
  },
  bookingItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
  },
  previewImg: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    alignSelf: 'flex-start',
    borderRadius: 6,
  },
  flatlistEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colours.themePrimaryLight,
    borderRadius: 3,
    padding: 5,
  },
});

function Home({ route, navigation }) {
  const dispatch = useDispatch();

  const { level, currentQuestion } = useSelector((state) => ({
    level: state.userReducer.level,
    currentQuestion: state.userReducer.currentQuestion,
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colours.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 80 }}>No Bully</Text>

      {currentQuestion !== 'Q6' ? (
        <>
          <Text style={{ fontSize: 16 }}>Current Level: {level}</Text>
          <TouchableOpacity
            style={{
              marginTop: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: colours.themePrimary,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Questions')}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Start</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 16 }}>
            You have successfully completed the game!
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: colours.themePrimary,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => dispatch(replayGame())}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Replay</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default Home;
