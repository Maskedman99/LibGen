import React, { Component } from 'react';
import {ScrollView, StyleSheet } from 'react-native';
import {Text, TouchableRipple, Appbar, Provider as PaperProvider} from 'react-native-paper';

export class Downloads extends Component {
  render() {
    return (
     <PaperProvider>

      <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title="Downloads"/>
      </Appbar.Header>

      <ScrollView>



      </ScrollView>

    </PaperProvider>
   );
  }
}

const styles = StyleSheet.create({
    text:
    {
        marginLeft: 5,
        marginTop: 30,
        fontSize: 19,
        borderBottomWidth: 1,
        borderBottomColor: "#B40404"
    },
})


export default Downloads;