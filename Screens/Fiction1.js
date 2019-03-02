import React, { Component } from 'react';
import axios from 'axios';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Divider, Dialog, Portal, Button, ActivityIndicator, Appbar, Provider as PaperProvider, TouchableRipple} from 'react-native-paper';
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
        visible: false,
    }

    _hideDialog = () => this.setState({ visible: false });

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


    if(this.state.loading == false){
      var rows = this.state.root.querySelectorAll('tr');
      var desc = this.state.root.querySelectorAll('.description');
      var imgrows = this.state.root.querySelectorAll('.record_side');
      var dlinks = this.state.root.querySelectorAll('.record_mirrors'); 

        var imglink = JSON.stringify(imgrows[0].childNodes[1].rawAttrs)
        imgarr = imglink.split('\\');
        imglink = imgarr[1].replace('"','');

      if(desc.length != 0){
        var summary = JSON.stringify(desc[0].rawText);
        var summary = summary.replace('"SUMMARY:',"");
      }  

      var details = '';
      for(i=0;i<rows.length;i++)
        details = details + JSON.stringify(rows[i].rawText.replace('\n\t\t','').replace('\n\t','').replace('\n','').replace(/&nbsp;/g,' '));
      var detailsarr = details.split('\\t'); 
      
      for(i=0;i<detailsarr.length;i++)
        if(detailsarr[i] == "" || detailsarr[i] == '\\n')
        {  
          detailsarr.splice(i,1)
          i = 0;
        }

      detailsarr.pop();
      detailsarr.pop();
      detailsarr.pop();

      detailsarr1 = detailsarr.splice(0,14);

      dlinks = dlinks[0].childNodes;
      dlinks.pop();
      dlinks.shift();

      var dlinks = [];
      for(i=0;i<dlinks.length;i++)    //Rerunning this code in console will give error since dlinks is already changed after 1 st execution
        dlinks1[i] = JSON.stringify(dlinks[i].childNodes[0].rawAttrs.replace('href=\"',''));  
    console.log(dlinks); 
    }  

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
        <Text style={{alignSelf: 'center', fontSize: 12}}>File Cover</Text>

        <View style ={{marginLeft: 5, marginTop: 10, marginRight: 10}}>    
        {
          detailsarr.map((items,key)=>(
              key%2 ?
              <View>
              <Text style={{alignSelf: 'flex-end'}}>{items.replace('\\n','')}</Text>
              <Divider />
              </View>
              :
              <Text style = {{fontWeight: 'bold'}}>{items.replace(/"/g,'')}</Text>
          ))
        }
        <TouchableRipple onPress={() => this.setState({visible: true})} rippleColor = "#B40404"> 
        <Text style = {{fontWeight: 'bold',marginRight: -5,alignSelf: 'center', textDecorationLine:'underline',fontSize: 16}}>
                    {'\n'}Download{'\n'}</Text>
        </TouchableRipple>
        <Divider />

        <Text style = {{fontWeight: 'bold'}}>Summary:</Text>
        {
          desc.length == 0 ?
            <Text style = {{alignSelf: 'flex-end'}}>Not Available</Text>
          :
            <Text>{summary}{'\n'}</Text>
        }

        <Text style = {{alignSelf: 'center', marginRight: -5}}>Hashes</Text>
        <Divider style = {{backgroundColor: "#B40404",scaleY: 4, marginRight: -5}}/>
        {
          detailsarr1.map((items,key)=>(
              key%2 ?
              <View>
              <Text style={{fontSize:12}}>{items.replace('\\n','')}</Text>
              <Divider />
              </View>
              :
              <Text style = {{fontWeight: 'bold'}}>{items.replace(/"/g,'')}</Text>
          ))
        }

        <Portal>
         <Dialog
           visible = {this.state.visible}
           onDismiss = {this._hideDialog}>
           <Dialog.Title>Download</Dialog.Title>
           <Dialog.Content>
             <Button onPress={() => console.log("g")} color = "#B40404">Gen.lib.rus.ec</Button>
             <Button onPress={() => console.log("Cancel")} color = "#B40404">Libgen.io</Button>
             <Button onPress={() => console.log("Ok")} color = "#B40404">Libgen.pw</Button>
             <Button onPress={() => console.log("Ok")} color = "#B40404">Torrent per 1000 files</Button>
           </Dialog.Content>
         </Dialog>
        </Portal>

        </View>
        </ScrollView>
      }  
     </PaperProvider>
   );
  }
}


export default Settings;