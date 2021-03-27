import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import AppBar from '../../components/AppBar';
import colours from '../../providers/constants/colours';
import questions from '../../providers/constants/questions';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import globalStyles from '../../providers/constants/globalStyles';
dayjs.extend(customParseFormat);

import { saveScore } from '../../providers/actions/User';

const styles = StyleSheet.create({
  answerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colours.themePrimary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

function Questions({ route, navigation }) {
  const dispatch = useDispatch();
  const [randomBool, setRandomBool] = useState(false);

  const {
    level,
    currentQuestion,
    currentScore,
    currentLevelScore,
  } = useSelector((state) => ({
    level: state.userReducer.level,
    currentQuestion: state.userReducer.currentQuestion,
    currentScore: state.userReducer.currentScore,
    currentLevelScore: state.userReducer.currentLevelScore,
  }));

  useEffect(() => {
    const generatedBool = Math.random() < 0.5;
    setRandomBool(generatedBool);
  }, []);

  const validateAnswerAndNavigate = (answer) => {
    if (answer === 'CORRECT') {
      dispatch(
        saveScore(answer, () => navigation.navigate('CorrectAnswerScreen'))
      );
    } else {
      dispatch(
        saveScore(answer, () => navigation.navigate('WrongAnswerScreen'))
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colours.white }}>
      <AppBar title={`Level ${level}`} />

      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text>Question {currentQuestion}</Text>
        <Text>CSCore {currentScore}</Text>
        <Text>currentLevelScore {currentLevelScore}</Text>
        <Image
          source={{ uri: questions[level][currentQuestion].imageUrl }}
          style={globalStyles.imgContainer}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {randomBool ? (
            <>
              <TouchableOpacity
                onPress={() => validateAnswerAndNavigate('CORRECT')}
                style={styles.answerButton}
              >
                <Text>{questions.L1.Q1.correctOption}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => validateAnswerAndNavigate('WRONG')}
                style={styles.answerButton}
              >
                <Text>{questions.L1.Q1.wrongOption}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => validateAnswerAndNavigate('WRONG')}
                style={styles.answerButton}
              >
                <Text>{questions.L1.Q1.wrongOption}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => validateAnswerAndNavigate('CORRECT')}
                style={styles.answerButton}
              >
                <Text>{questions.L1.Q1.correctOption}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export default Questions;
