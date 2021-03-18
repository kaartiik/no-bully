import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AppBar from '../../components/AppBar';
import colours from '../../providers/constants/colours';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const styles = StyleSheet.create({
  textContainer: { fontSize: 18, margin: 5 },
});

function Instructions({ route, navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colours.white }}>
      <AppBar title="How to Play?" showBack />

      <View style={{ padding: 10 }}>
        <Text style={styles.textContainer}>
          1. This game consists of 4 parts. Level 1 until Level 4.
        </Text>
        <Text style={styles.textContainer}>
          2. In each part, you will be given 5 situations and you must choose
          the action you will take based on that situations.
        </Text>
        <Text style={styles.textContainer}>
          3. You are eligible to go up to the next level if you get a minimum
          score 3 out of 5.
        </Text>
        <Text style={styles.textContainer}>
          4. You need to redo the part you cannot get minimum mark to proceed to
          the next level.
        </Text>
        <View style={styles.divider} />
      </View>
    </View>
  );
}

export default Instructions;
