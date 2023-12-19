import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setPassport, resetPassport } from '../store/passportSlice';
import React from 'react';
import { axiosInstance } from '../api';

export default function PassportDetScreen({ route, navigation }) {
  const { name } = route.params;
  const dispatch = useDispatch();
  const { passport } = useSelector((store) => store.passport);

  const passportImages = {
    'Афанасьев Александр Анатольевич': 'AAA.jpg',
    'Афанасьева Елена Ивановна': 'AEI.jpg',
    'Лаптев Григорий Сергеевич': 'LGS.jpg',
    'Петрова Наталья Валерьевна': 'PNV.jpg',
    'Сорокин Денис Игоревич': 'SDI.jpg',
    'Яковлева София Ивановна': 'YSI.jpg',
  };
  const imageName = passportImages[passport?.Name]


  useEffect(() => {
    async function getOnePassport() {
      try {
        const response = await axiosInstance.get(`/passports/${name?.toString()}`);
        dispatch(setPassport(response?.data));
      } catch (error) {
        console.error('Ошибка получения паспорта:', error);
      }
    }

    getOnePassport();

    return () => {
      dispatch(resetPassport());
    };
  }, [dispatch, name]);

  return (
    <View style={styles.container}>
      <Text style={styles.brandTitle}> {passport?.Name}</Text>
      <Image source={ { uri: `http://172.20.10.2:9000/pc-bucket/${imageName}` }} style={styles.image} />
      <View style={styles.rightContent}>
        <Text>Статус: {passport?.IsFree ? 'Доступен' : 'Недоступен'}</Text>
        <Text>Серия: {passport?.Seria}</Text>
        <Text>Дата выдачи: {passport?.Issue}</Text>
        <Text>Код отделения: {passport?.Code}</Text>
        <Text>Пол: {passport?.Gender}</Text>
        <Text>Дата рождения: {passport?.Birthdate}</Text>
        <Text>Место рождения: {passport?.BDplace}</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Паспорта')}
      >
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    padding: 16,
  },
  brandTitle: { color: 'black', fontSize: 20, fontWeight: 'bold' },
  image: { height: 260, alignSelf: 'stretch' },
  rightContent: {
    marginLeft: 8,
  },
  backButton: {
    marginTop: 16,
    backgroundColor: '#0E3E8DFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
};
