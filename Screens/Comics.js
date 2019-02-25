import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TouchableRipple, Appbar, Provider as PaperProvider} from 'react-native-paper';

export class Comics extends Component {

  state ={
    searchQuery: 'hello'
  }

  componentDidMount(){
    const { navigation } = this.props;
    const search = navigation.getParam('search', '');
    this.setState({searchQuery: search})
  }

  render() {
    return (
     <PaperProvider>

      <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title="Comics" subtitle={this.state.searchQuery}/>
        <Appbar.Action icon="more-vert" onPress={this._onMore} />
      </Appbar.Header>

    </PaperProvider>
   );
  }
}


export default Comics;