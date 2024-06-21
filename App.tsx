/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { store } from './src/app/store';
import { Provider } from 'react-redux';
import Counter from './src/components/Counter';
import ButtonRedux from './src/components/ButtonRedux';


const App = () => {
  return (
    <Provider store={store}>
      <View>
        <Counter />
        <ButtonRedux/>
      </View>
    </Provider>
  );
};


export default App;
