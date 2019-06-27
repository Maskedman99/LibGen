import React, { Component } from 'react';
import axios from 'axios';
import {View, ScrollView,} from 'react-native';
import {Text, ActivityIndicator, TouchableRipple, Appbar, Provider as PaperProvider, Portal, Dialog, IconButton,} from 'react-native-paper';

var HTMLParser = require('fast-html-parser');

export class Mag extends Component {

  state ={
    searchQuery: 'hello',
    searchIn: 'All',
    loading: true, 
    url: '',
    root: '',
  }

  componentDidMount(){
    const { navigation } = this.props;
    const search = navigation.getParam('search', '');
    const searchin = navigation.getParam('sIn', 'All');
    this.setState({searchQuery: search, searchIn: searchin});

    axios.get("http://magzdb.org/makelist?t=" + search.replace(' ','+'))
    .then(data => this.setState({
                          root: HTMLParser.parse(data.data),
                          loading: false
                          }))
    .catch(err => alert('Something went wrong! Check your connection.'));
  }

  render() {
    var rows = this.state.loading ? [] : this.state.root.querySelectorAll('a');
    var rows1 = this.state.loading ? [] : this.state.root.querySelectorAll('div');
    
    var titles = [];
    var links = [];
    if(!this.state.loading)
       for(i=0; i<rows.length; i++)
        {
            links[i] = JSON.stringify(rows[i].rawAttrs);
            links[i] = links[i].replace('"href=','').replace('"','');
            titles[i] = JSON.stringify(rows[i].rawText);
        }    
    

    console.log(rows);
    console.log(titles);

    return (
     <PaperProvider>

      <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title="Magazines" subtitle={this.state.searchQuery + '\t\t.\t\t' + this.state.searchIn}/>
        <Appbar.Action icon="more-vert" onPress={this._onMore} />
      </Appbar.Header>

    {  this.state.loading ?
           <ActivityIndicator animating={true} color="#B40404" size = {40} style={{flex:1,}}/>   
     :
     <View>
      <View style = {{marginTop:5, flexDirection:'row', justifyContent: 'flex-end', borderBottomWidth: 2, borderBottomColor:'#B40404'}}>    
          <Text style = {{fontWeight:'bold', marginBottom: 5}}>Files Found: </Text>
          <Text style = {{fontWeight:'bold', marginBottom: 5}}>{rows.length}{'\t'}</Text>
      </View>
      <ScrollView style = {{marginBottom: 90, marginLeft: 5,}}>

      { 
        titles.map((item, key)=>(
        <View  style={{borderBottomWidth: 1, borderBottomColor:'#B40404'}}>
        <TouchableRipple onPress={() => this.props.navigation.navigate('Mag1Screen',
                                        { link: links[key],
                                          title: titles[key].replace(/"/g,''),
                                        }
                                    )} rippleColor= "#B40404"> 
            <View>
            <Text>
                <Text style = {{fontWeight: 'bold'}}>{item.replace(/"/g,'')}{'\n'}</Text>
            {   //<Text  style = {{fontWeight: 'bold'}}>{series[key].replace(/"/g,'')}{'\n'}</Text>
            }               
            </Text>
            <View style ={{alignItems: 'flex-end',marginRight: 10}}>
                    <Text style = {{fontWeight:'bold'}}>{(key+1)}</Text>
            </View>
            </View>
        </TouchableRipple>
          </View>
         ))
      }

      </ScrollView> 
      </View> 
    } 
    </PaperProvider>
   );
  }
}


export default Mag;