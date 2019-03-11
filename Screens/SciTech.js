import React, { Component } from 'react';
import axios from 'axios';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, TouchableRipple,ActivityIndicator, Appbar, Provider as PaperProvider} from 'react-native-paper';

var HTMLParser = require('fast-html-parser');

export class SciTech extends Component {

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

    axios.get("http://gen.lib.rus.ec/search.php?req=" + search.replace(' ','+'))
    .then(data => this.setState({
                          root: HTMLParser.parse(data.data),
                          loading: false
                          }))
    .catch(err => alert('Something went wrong! Check your connection.'));
  }

  render() {

    var rows = this.state.loading ? [] : this.state.root.querySelectorAll('tr');

    var details = []; 

    if(this.state.loading == false)
    {
      var  titles = rows[0].childNodes[1].childNodes[0].childNodes[8].childNodes;  
      //in case 1 page , else 8
    //  console.log(rows); //7 gives no of files 

    
//DETAILS--------------------------------------------------------------------------------------------------
      titles.shift(); 
      for(i=0; i<titles.length-1; i++)
      { 
          titles.splice(i+1,1); //Removes all odd index elements
          titles[i] = JSON.stringify(titles[i].rawText); 
          details[i] = titles[i].split('\\r\\n\\t\\t\\t\\t');
          details[i].splice(9,3);
          details[i].shift();
          details[i].splice(1,1);
      }   

      
    }
//DEBUGGING------------------------------------------------------------------------------------------------    
    console.log(details);

    return (
     <PaperProvider>

      <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title="LibGen (Sci-Tech)" subtitle={this.state.searchQuery + '\t\t.\t\t' + this.state.searchIn}/>
        <Appbar.Action icon="more-vert" onPress={this._onMore} />
      </Appbar.Header>

      { 
      this.state.loading ?
           <ActivityIndicator animating={true} color="#B40404" size = {40} style={{flex:1,}}/>   
      :
        <View>
          <View style = {{marginTop:5, flexDirection:'row', justifyContent: 'space-around', borderBottomWidth: 2, borderBottomColor:'#B40404'}}>    
            <Text style = {{fontWeight:'bold', marginBottom: 5}}>Files Found</Text>
            <Text style = {{fontWeight:'bold', marginBottom: 5}}>Pages</Text>
          </View>
          <ScrollView style = {{marginBottom: 90, marginLeft: 5,}}>
          { 
            details.map((item, key)=>(
              <View  style={{borderBottomWidth: 1, borderBottomColor:'#B40404'}}>
              <TouchableRipple onPress={() => console.log("Pressed")} rippleColor= "#B40404"> 
              <View>
              
              <Text>
                  <Text style = {{fontWeight: 'bold'}}>Author:{'\t\t\t\t\t\t\t\t'}</Text>
                {item[0].replace(/"/g,'')}{'\n'}
                  <Text  style = {{fontWeight: 'bold'}}>Publisher:{'\t\t\t\t\t\t'}</Text>
                {item[1].replace(/"/g,'')}{'\n'}
                  <Text style = {{fontWeight: 'bold'}}>Language:{'\t\t\t\t\t'}</Text>
                {item[4].replace(/"/g,'')}{'\n'}
                  <Text style = {{fontWeight: 'bold'}}>Year:{'\t\t\t\t\t\t\t\t\t\t\t'}</Text>
                {item[2].replace(/"/g,'')}{'\t\t\t\t\t\t'}
                  <Text style = {{fontWeight: 'bold'}}>Pages:{'\t\t\t\t\t\t\t\t\t\t\t'}</Text>
                {item[3].replace(/"/g,'')}{'\n'}
                  <Text style = {{fontWeight: 'bold'}}>Size:{'\t\t\t\t\t\t\t\t\t\t\t'}</Text>
                {item[5].replace(/"/g,'')}{'\t\t\t\t\t\t'}
                  <Text style = {{fontWeight: 'bold'}}>Extension:{'\t\t\t\t\t\t\t\t'}</Text>
                {item[6].replace(/"/g,'')}{'\n'}    
              </Text>

              <View style ={{alignItems: 'flex-end',marginRight: 10}}>
                  <Text style = {{fontWeight:'bold'}}>{(key+1)+((this.state.page-1)*25)}</Text>
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


export default SciTech;