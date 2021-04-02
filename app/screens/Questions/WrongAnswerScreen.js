import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppBar from '../../components/AppBar';
import colours from '../../providers/constants/colours';
import globalStyles from '../../providers/constants/globalStyles';
import questions from '../../providers/constants/questions';

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

function WrongAnswerScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const { currentQuestion, level } = useSelector((state) => ({
    currentQuestion: state.userReducer.currentQuestion,
    level: state.userReducer.level,
  }));

  const switchToNextQuestionLevel = () => {
    dispatch(switchNextQuestion(() => navigation.navigate('Questions')));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colours.white }}>
      <AppBar title="Wrong" />

      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text>{questions[level][currentQuestion].wrongResultMessage}</Text>
        <Image
          source={{ uri: questions[level][currentQuestion].wrongResultUrl }}
          style={globalStyles.imgContainer}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => switchToNextQuestionLevel()}
            style={styles.answerButton}
          >
            <Text>Next Question</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default WrongAnswerScreen;
