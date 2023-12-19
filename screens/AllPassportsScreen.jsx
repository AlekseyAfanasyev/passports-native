import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../api';
import { StyleSheet } from 'react-native';
import { setPassports } from '../store/passportSlice';
import PassportCard from '../components/PassportCard';

export default function PassportsAllScreen({ navigation }) {
  const dispatch = useDispatch();
  const { passports } = useSelector((store) => store.passport);
  const [nameFilter, setNameFilter] = useState('');

  const getAllPassports = async () => {
    const response = await axiosInstance.get('/passports', {
      params: {
        passport_name: nameFilter,
      },
    });
    console.log("DATA:", response?.data)
    dispatch(setPassports(response?.data));
  };

  const clearFilters = async () => {
    setNameFilter('');
    
    const response = await axiosInstance.get('/passports', {
        params: {
          passport_name: '',
        },
      });
    dispatch(setPassports(response?.data));
  };

  useEffect(() => {
    getAllPassports();
    console.log('PASSPORTS: ', passports);
  }, [dispatch]);

  return (
    <ScrollView>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Название паспорта"
          value={nameFilter}
          onChangeText={(text) => setNameFilter(text)}
        />

        <TouchableOpacity style={styles.filterButton} onPress={getAllPassports}>
          <Text style={styles.filterButtonText}>Поиск</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={clearFilters}>
          <Text style={styles.filterButtonText}>Очистить</Text>
        </TouchableOpacity>
        {!!passports &&
          passports.map((passport) => <PassportCard key={passport.ID} {...passport} navigation={navigation}></PassportCard>)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    margin: 12,
    padding: 10,
  },
  filterButton: {
    backgroundColor: '#0E3E8DFF',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  filterButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  page: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
});