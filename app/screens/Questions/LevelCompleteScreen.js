import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppBar from '../../components/AppBar';
import colours from '../../providers/constants/colours';
import globalStyles from '../../providers/constants/globalStyles';
import { retryLevel, nextLevel } from '../../providers/actions/User';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { switchNextQuestion } from '../../providers/actions/User';

const styles = StyleSheet.create({
  answerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colours.themePrimary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function LevelCompleteScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const { level, currentScore } = useSelector((state) => ({
    level: state.userReducer.level,
    currentScore: state.userReducer.currentScore,
  }));

  const proceedNextLevel = () => {
    dispatch(nextLevel());
  };

  const proceedRetryLevel = () => {
    dispatch(retryLevel());
  };

  return (
    <View style={{ flex: 1, backgroundColor: colours.white }}>
      <AppBar title={`Level ${level} Completed`} />

      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text>Your score is {currentScore}/5</Text>

        {currentScore > 3 ? (
          <Image
            source={require('../../../assets/success.jpg')}
            style={globalStyles.imgContainer}
          />
        ) : (
          <Image
            source={require('../../../assets/failed.jpg')}
            style={globalStyles.imgContainer}
          />
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {currentScore > 3 ? (
            <TouchableOpacity
              onPress={() => proceedNextLevel()}
              style={styles.answerButton}
            >
              <Text>Next Level</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => proceedRetryLevel()}
              style={styles.answerButton}
            >
              <Text>Retry Level</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

export default LevelCompleteScreen;
