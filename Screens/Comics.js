import React, { Component } from 'react';
import axios from 'axios';
import {View, StyleSheet} from 'react-native';
import {Text, TouchableRipple, Appbar, Provider as PaperProvider} from 'react-native-paper';

var HTMLParser = require('fast-html-parser');

export class Comics extends Component {

  state ={
    searchQuery: 'hello',
    root: '',
    loading: true,
  }

  componentDidMount(){
    const { navigation } = this.props;
    const search = navigation.getParam('search', '');
    this.setState({searchQuery: search})
    
    axios.get("http://gen.lib.rus.ec/comics/index.php?s=" + search.replace(' ','+'))
    .then(data => this.setState({
                          root: HTMLParser.parse(data.data),
                          loading: false
                          }))
    .catch(err => alert('Something went wrong! Check your connection.'));
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