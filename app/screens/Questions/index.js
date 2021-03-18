import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import AppBar from '../../components/AppBar';
import colours from '../../providers/constants/colours';
import questions from '../../providers/constants/questions';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

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
  imgContainer: {
    height: 400,
    width: '80%',
    resizeMode: 'contain',
  },
});

function Questions({ route, navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colours.white }}>
      <AppBar title="Level" />

      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text>Question</Text>
        <Image
          source={{ uri: questions.L1.Q1.imageUrl }}
          style={styles.imgContainer}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity style={styles.answerButton}>
            <Text>{questions.L1.Q1.correctOption}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.answerButton}>
            <Text>{questions.L1.Q1.wrongOption}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Questions;
