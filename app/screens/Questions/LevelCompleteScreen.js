import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppBar from '../../components/AppBar';
import colours from '../../providers/constants/colours';
import globalStyles from '../../providers/constants/globalStyles';
import { retryLevel, nextLevel, goHome } from '../../providers/actions/User';

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

  const { level, currentLevelScore } = useSelector((state) => ({
    level: state.userReducer.level,
    currentLevelScore: state.userReducer.currentLevelScore,
  }));

  const proceedNextLevel = () => {
    dispatch(nextLevel());
  };

  const proceedRetryLevel = () => {
    dispatch(retryLevel());
  };

  const proceedGoHome = () => {
    dispatch(goHome());
  };

  console.log(level, currentLevelScore);

  const computeNextProcess = () => {
    if (level === 'L4' && currentLevelScore > 3) {
      return (
        <>
          <Image
            source={require('../../../assets/gameComplete.png')}
            style={globalStyles.imgContainer}
          />

          <TouchableOpacity
            onPress={() => proceedGoHome()}
            style={styles.answerButton}
          >
            <Text>Home</Text>
          </TouchableOpacity>
        </>
      );
    } else if (level !== 'L4' && currentLevelScore > 3) {
      return (
        <>
          <Image
            source={require('../../../assets/success.jpg')}
            style={globalStyles.imgContainer}
          />

          <View
            style={{
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => proceedNextLevel()}
              style={styles.answerButton}
            >
              <Text>Next Level</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }
    return (
      <>
        <Image
          source={require('../../../assets/failed.jpg')}
          style={globalStyles.imgContainer}
        />

        <View
          style={{
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => proceedRetryLevel()}
            style={styles.answerButton}
          >
            <Text>Retry Level</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colours.white }}>
      <AppBar title={`Level ${level} Completed`} />

      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text>Your score is {currentLevelScore}/5</Text>

        {computeNextProcess()}
      </View>
    </View>
  );
}

export default LevelCompleteScreen;
