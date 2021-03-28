import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AppBar from '../../components/AppBar';
import colours from '../../providers/constants/colours';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { getAchievements } from '../../providers/actions/User';

const styles = StyleSheet.create({
  headerContainer: { marginVertical: 10 },
  itemContainer: { flexDirection: 'row', marginVertical: 5 },
  nameColumn: { width: '70%', fontWeight: 'bold' },
  scoreColumn: { width: '30%', fontWeight: 'bold' },
});

function Instructions({ route, navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const { userRankings } = useSelector((state) => ({
    userRankings: state.userReducer.userRankings,
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(getAchievements());
    }, [])
  );

  useEffect(() => {
    setData(userRankings);
  }, [userRankings]);

  const searchData = (searchText) => {
    let newData = [];
    if (searchText) {
      newData = userRankings.filter((item) => {
        return item.name.indexOf(searchText) > -1;
      });
      setData([...newData]);
    } else {
      setData([...userRankings]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colours.white }}>
      <AppBar title="Achievements" showBack />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <TextInput
              placeholder="Search users..."
              value={search}
              onChangeText={(text) => {
                setSearch(text);
                searchData(text);
              }}
              style={{
                backgroundColor: colours.veryLightPink,
                borderRadius: 8,
                padding: 5,
              }}
            />
            <View style={styles.itemContainer}>
              <Text style={styles.nameColumn}>Name</Text>
              <Text style={styles.scoreColumn}>Score</Text>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.nameColumn}>{item.name}</Text>
            <Text style={styles.scoreColumn}>{item.currentScore}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default Instructions;
