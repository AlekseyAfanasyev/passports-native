import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import PassportScreen from '../screens/PassportDetScreen'

export default function PassportCard({ navigation, ...props }) {
    const passportImages = {
        'Афанасьев Александр Анатольевич': 'AAA.jpg',
        'Афанасьева Елена Ивановна': 'AEI.jpg',
        'Лаптев Григорий Сергеевич': 'LGS.jpg',
        'Петрова Наталья Валерьевна': 'PNV.jpg',
        'Сорокин Денис Игоревич': 'SDI.jpg',
        'Яковлева София Ивановна': 'YSI.jpg',
    };

    const handlePress = () => {
        navigation.navigate('Подробнее', { name: props.Name })
    }
    const imageName = passportImages[props.Name];
    const imageUrl = `http://172.20.10.2:9000/pc-bucket/${imageName}`;
    const defaultImage = require('../assets/DEFAULT.jpg');
    return (
        <View style={styles.card}>
                <Text style={styles.brandTitle}>{props.Name}</Text>
            <Image
                style={styles.image}
                source={{ uri: imageUrl, cache: 'reload' }}
                defaultSource={defaultImage}
                resizeMode='contain'
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>Подробнее</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 20,
        textAlign: 'center',
        shadowColor: 'rgb(0, 18, 70)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    button: {
        marginTop: 16,
        backgroundColor: '#0E3E8DFF',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    image: { height: 320, alignSelf: 'stretch' },
    brandTitle: { color: 'black', fontSize: 20, fontWeight: 'bold' },
    text: { color: '#f0f0f0', fontSize: 16 },
});