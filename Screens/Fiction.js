import React, { Component } from 'react';
import axios from 'axios';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, ActivityIndicator, TouchableRipple, Appbar, Provider as PaperProvider} from 'react-native-paper';


var HTMLParser = require('fast-html-parser');

export class Fiction extends Component {

  state ={
    searchQuery: 'hello',
    searchIn: 'All',
    loading: true, 
    root: '',
  }

  componentDidMount(){
    const { navigation } = this.props;
    const search = navigation.getParam('search', '');
    const searchin = navigation.getParam('sIn', 'All');
    this.setState({searchQuery: search, searchIn: searchin});

    axios.get("http://gen.lib.rus.ec/foreignfiction/index.php?s=wimpy+kid+&f_lang=All&f_columns=0&f_ext=All&f_group=1")
    .then(data => this.setState({
                          root: HTMLParser.parse(data.data),
                          loading: false
                          }))
    .catch(err => alert('Something went wrong! Check your connection.'));
  }

  render() {
    var rows = this.state.loading ? [] : this.state.root.querySelectorAll('td');
    for(i=0;i<rows.length;i++)
      rows[i] = JSON.stringify(rows[i].rawText);

    return (
     <PaperProvider>

      <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title="Fiction" subtitle={this.state.searchQuery + '\t\t.\t\t' + this.state.searchIn}/>
        <Appbar.Action icon="more-vert" onPress={this._onMore} />
      </Appbar.Header>

    {  this.state.loading ?
           <ActivityIndicator animating={true} color="#B40404" size = {40} style={{flex:1,}}/>   
     :
      <ScrollView>
        <Text>{rows[50]}</Text>
      </ScrollView>  
    } 
    </PaperProvider>
   );
  }
}


export default Fiction;