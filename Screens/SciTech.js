import React, { Component } from 'react';
import axios from 'axios';
import {View, ScrollView} from 'react-native';
import {Text, TouchableRipple,ActivityIndicator, Appbar, Provider as PaperProvider, IconButton} from 'react-native-paper';

var HTMLParser = require('fast-html-parser');

export class SciTech extends Component {

  state ={
    searchQuery: 'hello',
    currPage: 1,
    searchIn: 'All',
    loading: true,
    root: '',
  }

  componentDidMount(){
    const { navigation } = this.props;
    const search = navigation.getParam('search', '');
    const searchin = navigation.getParam('sIn', 'All');
    this.setState({searchQuery: search, searchIn: searchin});

    axios.get("http://gen.lib.rus.ec/search.php?&req=" + search.replace(' ','+'))
    .then(data => this.setState({
                          root: HTMLParser.parse(data.data),
                          loading: false
                          }))
    .catch(err => alert('Something went wrong! Check your connection.'));
  }

  urlfunction(i){
    i = this.state.currPage + i; 
    var url =  "http://gen.lib.rus.ec/search.php?&req=" + this.state.searchQuery.replace(' ','+') +
    "&page=" + i; 
    this.setState({loading: true});

  axios.get(url)
  .then(data => this.setState({
         currPage: i,
         root: HTMLParser.parse(data.data),
         loading: false
         }))
  .catch(err => alert('Something went wrong! Check your connection.'));  
  return;
  }

  render() {

    var rows = this.state.loading ? [] : this.state.root.querySelectorAll('tr');
    var pages = this.state.loading ? [] : this.state.root.querySelectorAll('font');  
    var details = []; 
    var names = [];

    if(this.state.loading == false)
    {
      pages = pages[2].rawText.split(' ');

      var titles =  pages[0] > 25 ?
        rows[0].childNodes[1].childNodes[0].childNodes[12].childNodes
      :  
        rows[0].childNodes[1].childNodes[0].childNodes[8].childNodes;    
      //in case of 1 page, details are located in index 8 
      

      if(pages[0]<=25)
        {  pages.push(''); pages.push('');
           pages.push(''); pages.push('');
           pages.push(0);                   //pages[7]
        }    
        var lastPage = Math.floor(pages[0]/25)+1;
        
//DETAILS--------------------------------------------------------------------------------------------------

        //Need help to seperate out titles and series name
      titles.shift();
      i = 0;
      
      for(i=0; i<titles.length-1; i++)
      { 
          titles.splice(i+1,1); //Removes all odd index elements
      }
      console.log(titles);
      var titles1 = [];
      for(i=0; i<titles.length; i++)
      {    
        //  names[i]  = JSON.stringify(titles[i].childNodes[4].childNodes[2].rawText);
        //  console.log(titles[i]);
          titles1[i] = JSON.stringify(titles[i].rawText); 
          details[i] = titles1[i].split('\\r\\n\\t\\t\\t\\t');
          details[i].splice(9,3);
          details[i].shift();
        //  names[i] = details[i][1];
          details[i].splice(1,1);
      } 
        
//DEBUGGING------------------------------------------------------------------------------------------------    
     // console.log(names);
      
    }

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
            <Text style = {{fontWeight:'bold', marginBottom: 5}}>{pages[0]} Files Found</Text>
            <Text style = {{fontWeight:'bold', marginBottom: 5}}>
                            Pages {this.state.currPage}/{lastPage}</Text>
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
                {item[1].replace(/"/g,'').replace(/&amp;/g,'&')}{'\n'}
                  <Text style = {{fontWeight: 'bold'}}>Language:{'\t\t\t\t\t'}</Text>
                {item[4].replace(/"/g,'')}
                </Text>

                <Text style = {{fontSize : 12}}>
                  <Text style = {{fontWeight: 'bold'}}>{'\n'}Year:{'\t\t'}</Text>
                {item[2].replace(/"/g,'')}{'\t\t'}
                  <Text style = {{fontWeight: 'bold'}}>Pages:{'\t\t'}</Text>
                {item[3].replace(/"/g,'')}{'\t\t'}
                  <Text style = {{fontWeight: 'bold'}}>Size:{'\t\t'}</Text>
                {item[5].replace(/"/g,'')}{'\t\t'}
                  <Text style = {{fontWeight: 'bold'}}>Extension:{'\t\t'}</Text>
                {item[6].replace(/"/g,'')}
                </Text>    
              
              <View style ={{alignItems: 'flex-end',marginRight: 10}}>
                  <Text style = {{fontWeight:'bold'}}>{(key+1)+((this.state.currPage-1)*25)}</Text>
              </View>

              </View>
              </TouchableRipple>
          </View>
         ))
      }

      {
      lastPage == 1 ?       //Case of 1 page results and multi page results  
        <Text style = {{color: '#B40404', fontWeight:'bold', alignSelf: 'center',marginLeft:-5}}>
                End of Results!!</Text>     
      :
        <View style = {{marginLeft: -10, marginVertical: -2, flexDirection:'row', justifyContent: 'space-around',}}>
        {
        this.state.currPage == 1 ?
          <IconButton  icon = "chevron-left"  color = {'gray'}  size = {40}   />
        :  
          <IconButton  icon = "chevron-left"  color = {'#B40404'}  size = {40}
            onPress={() => {this.urlfunction(-1);}} />
        }  
        <Text style = {{fontWeight: 'bold', paddingBottom: 10,}}>{'\n'}{this.state.currPage}</Text>
        {
        this.state.currPage != lastPage?  
          <IconButton  icon = "chevron-right"  color = {'#B40404'}  size = {40}
                       onPress={() => {this.urlfunction(1);}} />
        :
          <IconButton  icon = "chevron-right"  color = {'gray'}  size = {40}  /> 
        } 
        </View>
      }  
        </ScrollView>
        </View>
      }

    </PaperProvider>
   );
  }
}


export default SciTech;