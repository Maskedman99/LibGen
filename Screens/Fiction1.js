import React, { Component } from 'react';
import axios from 'axios';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, TouchableRipple, ActivityIndicator, Appbar, Provider as PaperProvider} from 'react-native-paper';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Bar';


var HTMLParser = require('fast-html-parser');

export class Settings extends Component {

    state = {
        Title: '',
        Author: '',
        Series: '',
        Language: '',
        File: '',
        root: '',
        loading: true,
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

        url = "http://gen.lib.rus.ec" + link.replace(/"/g,'');
        axios.get(url)
        .then(data => this.setState({
                          root: HTMLParser.parse(data.data),
                          loading: false
                          }))
        .catch(err => alert('Something went wrong! Check your connection.'));
      }  

  render() {
    var rows = this.state.loading ? [] : this.state.root.querySelectorAll('td');

    var imgrows = this.state.loading ? []: this.state.root.querySelectorAll('.record_side');
    if(this.state.loading == false){
        var imglink = JSON.stringify(imgrows[0].childNodes[1].rawAttrs)
        imgarr = imglink.split('\\');
        imglink = imgarr[1].replace('"','');
    }  
  //  console.log(imglink);

    return (
     <PaperProvider>
        <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title={this.state.Title} subtitle={this.state.Author}/>
        </Appbar.Header>
      {
      this.state.loading ?
        <ActivityIndicator animating={true} color="#B40404" size = {40} style={{flex:1,}}/>   
      :
        <ScrollView>  
        <View style = {{width: 243, height: 363, alignSelf: 'center', justifyContent: 'center', alignItem:'center', marginTop: 10, borderWidth: 1, borderColor: '#B40404'}}>  
        <Image
           style={{width: 240, height: 360,}}
           indicator={Progress.Pie}
           indicatorProps={{
            size: 40,
            borderWidth: 0,
            color: 'rgba(180, 4, 4, 1)',
            unfilledColor: 'rgba(0, 0, 0, 0.2)'
          }}
           resizeMode = 'cover' 
           source={{uri: imglink}}
        /> 
        </View>
        <Text style={{alignSelf: 'center'}}>File Cover</Text>

        <View style ={styles.view}>    
        <Text>Title:</Text>
        <Text>{this.state.Title}</Text>
        </View>
        <Text>Series:{'\t'}{this.state.Series}</Text>
        <Text>Author:{'\t'}{this.state.Author}</Text>
        <Text>File:{'\t'}{this.state.File}</Text>
        <Text>Language:{'\t'}{this.state.Language}</Text>

        </ScrollView>
      }  
     </PaperProvider>
   );
  }
}

const styles = StyleSheet.create({
view: {
  justifyContent:'space-between'
}
})

export default Settings;