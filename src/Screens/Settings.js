import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TouchableRipple, Appbar, Provider as PaperProvider} from 'react-native-paper';

const Settings = ({navigation}) => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Settings" />
        </Appbar.Header>

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
    marginLeft: 5,
    marginTop: 30,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ff0000'
  }
});

export default Settings;
