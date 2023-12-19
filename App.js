import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PassportsAllScreen from './screens/AllPassportsScreen';
import PassportDetScreen from './screens/PassportDetScreen';
import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Паспорта" component={PassportsAllScreen} />    
          <Stack.Screen name="Подробнее" component={PassportDetScreen} />    
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});