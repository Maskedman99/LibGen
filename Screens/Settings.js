import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Switch, TouchableRipple, Appbar, Provider as PaperProvider} from 'react-native-paper';

export class Settings extends Component {

  state = {
    isSwitchOn: false,
  };

  render() {
    const { isSwitchOn } = this.state;
    return (
     <PaperProvider>

      <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title="Settings"/>
      </Appbar.Header>

        <View style={{flexDirection: 'row',justifyContent: 'space-between',borderBottomWidth: 1,borderBottomColor: "#B40404", marginLeft: 5}}>
          <Text style = {{marginTop: 30,fontSize: 19,}}>Dark Theme</Text>
          <Switch 
              style = {{marginTop: 25, marginRight: 15}}
              color='#B40404'
              value={isSwitchOn}
              onValueChange={() => {this.setState({ isSwitchOn: !isSwitchOn }); }}
          />
        </View>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
            <Text style = {styles.text}>Download Location</Text>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
            <Text style = {styles.text}>Set Search Language</Text>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
            <Text style = {styles.text}>Check for Updates</Text>
        </TouchableRipple>

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
      borderBottomColor: "#B40404"
  },
})

export default Settings;