import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TouchableRipple, Appbar, Provider as PaperProvider} from 'react-native-paper';

export class Comics extends Component {

  state ={
    searchQuery: 'hello',
    searchIn: 'All',
  }

  componentDidMount(){
    const { navigation } = this.props;
    const search = navigation.getParam('search', '');
    const searchin = navigation.getParam('sIn', 'All');
    this.setState({searchQuery: search, searchIn: searchin});
  }

  render() {
    return (
     <PaperProvider>

      <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title="LibGen (Sci-Tech)" subtitle={this.state.searchQuery + '\t\t.\t\t' + this.state.searchIn}/>
        <Appbar.Action icon="more-vert" onPress={this._onMore} />
      </Appbar.Header>

    </PaperProvider>
   );
  }
}


export default Comics;