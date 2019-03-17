import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TouchableRipple, Appbar, Provider as PaperProvider} from 'react-native-paper';
import {themes} from '../Assets/Themes';

export let theme = themes.dark;

export class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = { appTheme: themes.Dark };
    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme() {
    theme = this.state.appTheme === themes.Dark ? themes.Light : themes.Dark;
    this.setState({ appTheme: theme });
}

  render() {
    return (
     <PaperProvider>
      <View style = {{flex: 1, backgroundColor: this.state.appTheme.background}}>
      <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title="Settings"/>
      </Appbar.Header>

        <TouchableRipple rippleColor="#ff0000" 
            onPress={this.changeTheme}>
            <Text style = {[styles.text, {color: this.state.appTheme.text}]}>Change Theme</Text>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#ff0000">
            <Text  style = {[styles.text, {color: this.state.appTheme.text}]}>Download Location</Text>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#ff0000">
            <Text style = {[styles.text, {color: this.state.appTheme.text}]}>Set Search Language</Text>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#ff0000">
            <Text style = {[styles.text, {color: this.state.appTheme.text}]}>Check for Updates</Text>
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