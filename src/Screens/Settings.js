import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TouchableRipple, Provider as PaperProvider} from 'react-native-paper';

import NavBar from '../Components/NavBar';

const Settings = ({navigation}) => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <NavBar nav={navigation} title={'Settings'} />

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
          <Text style={styles.text}>Download Location</Text>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
          <Text style={styles.text}>Set Search Language</Text>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
          <Text style={styles.text}>Check for Updates</Text>
        </TouchableRipple>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#B40404'
  },
  text: {
    paddingLeft: 5,
    marginTop: 30,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#B40404'
  }
});

export default Settings;
