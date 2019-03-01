import React, { Component } from 'react';
import {View,} from 'react-native';
import {Text, TouchableRipple, Appbar, Provider as PaperProvider} from 'react-native-paper';

export class Settings extends Component {

    state = {
        Title: '',
        Author: '',
        Series: '',
        Language: '',
        File: '',
    }

    componentDidMount(){
        const { navigation } = this.props;
        const link = navigation.getParam('link', '');
        const title = navigation.getParam('title', '');
        const author = navigation.getParam('author', '');
        const series = navigation.getParam('series', '');
        const file = navigation.getParam('file', '');
        const language = navigation.getParam('language', '');
        this.setState({Title: title, Author: author, Series: series, Language: language, File: file});
    
      }  

  render() {
    return (
     <PaperProvider>
        <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title={this.state.Title} subtitle={this.state.Author}/>
        </Appbar.Header>

        <Text>Title:    {this.state.Title}</Text>
        <Text>Series:   {this.state.Series}</Text>
        <Text>Author:   {this.state.Author}</Text>
        <Text>File:     {this.state.File}</Text>
        <Text>Language: {this.state.Language}</Text>
        
     </PaperProvider>
   );
  }
}

export default Settings;