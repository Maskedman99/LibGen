import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TouchableRipple, Appbar, Provider as PaperProvider} from 'react-native-paper';

export class Settings extends Component {

  render() {
    return (
     <PaperProvider>
      <View style = {{flex: 1,}}>
      <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title="Settings"/>
      </Appbar.Header>

        <TouchableRipple rippleColor="#B40404"> 
            <Text style = {styles.text}>Change Theme</Text>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
            <Text  style = {styles.text}>Download Location</Text>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
            <Text style = {styles.text}>Set Search Language</Text>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
            <Text style = {styles.text}>Check for Updates</Text>
        </TouchableRipple>
      </View>       
    </PaperProvider>
   );
  }
}

const styles = StyleSheet.create({
  text:
  {
      marginLeft: 5,
      marginTop: 30,
      fontSize: 18,
      borderBottomWidth: 1,
      borderBottomColor: "#ff0000",
  },
})

export default Settings;