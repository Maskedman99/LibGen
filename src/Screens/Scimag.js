import React, {Component} from 'react';
import axios from 'axios';
import {View, ScrollView} from 'react-native';
import {
  Text,
  ActivityIndicator,
  TouchableRipple,
  Provider as PaperProvider,
  Portal,
  Dialog,
  IconButton
} from 'react-native-paper';

var HTMLParser = require('fast-html-parser');
import Spinner from '../Components/Common/Spinner';
import NavBar from '../Components/Common/NavBar';

export class Scimag extends Component {
  state = {
    searchQuery: this.props.route.params?.search ?? '',
    searchIn: this.props.route.params?.sIn ?? 'All',
    page: 1,
    loading: true,
    url: '',
    root: ''
  };

  componentDidMount() {
    axios
      .get('http://gen.lib.rus.ec/scimag/?q=' + this.state.searchQuery.replace(' ', '+'))
      .then(data =>
        this.setState({
          root: HTMLParser.parse(data.data),
          loading: false
        })
      )
      .catch(err => alert('Something went wrong! Check your connection.'));
  }

  render() {
    var rows = this.state.loading ? [] : this.state.root.querySelectorAll('td');

    return (
      <PaperProvider>
        <NavBar
          title={'Scientific Articles'}
          subtitle={`${this.state.searchQuery}\t\t.\t\t${this.state.searchIn}`}
        />
        {this.state.loading ? (
          <Spinner />
        ) : (
          <View>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderBottomWidth: 2,
                borderBottomColor: '#B40404'
              }}>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                {/*filesfound.replace(/"/g,'')*/}
              </Text>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>{/*page.replace(/"/g,'')*/}</Text>
            </View>
            <ScrollView style={{marginBottom: 90, marginLeft: 5}}>
              {/* titles.map((item, key)=>(
         <View  style={{borderBottomWidth: 1, borderBottomColor:'#B40404'}}>
         <TouchableRipple onPress={() => this.props.navigation.navigate('Fiction1Screen',
                                        { link: links[key],
                                          title: titles[key].replace(/"/g,''),
                                          author: authors[key].replace(/"/g,''),
                                        }
                                  )} rippleColor= "#B40404">
         <View>
         <Text>
          <Text style = {{fontWeight: 'bold'}}>Title:{'\t\t\t\t\t\t\t\t'}</Text>
              {item.replace(/"/g,'')}{'\n'}
          <Text  style = {{fontWeight: 'bold'}}>Series:{'\t\t\t\t\t\t'}</Text>
              {series[key].replace(/"/g,'')}{'\n'}
          <Text style = {{fontWeight: 'bold'}}>Author:{'\t\t\t\t\t'}</Text>
              {authors[key].replace(/"/g,'')}{'\n'}
          <Text style = {{fontWeight: 'bold'}}>File:{'\t\t\t\t\t\t\t\t'}</Text>
              {file[key].replace(/"/g,'')}{'\n'}
          <Text style = {{fontWeight: 'bold'}}>Language:{'\t\t'}</Text>
              {language[key].replace(/"/g,'')}
          </Text>
          <View style ={{alignItems: 'flex-end',marginRight: 10}}>
          <Text style = {{fontWeight:'bold'}}>{(key+1)+((this.state.page-1)*25)}</Text>
          </View>
          </View>
          </TouchableRipple>
          </View>
         ))
      }

      {pageinfo[0].childNodes[3]==undefined ?       //Case of 1 page results and multi page results
      <Text style = {{color: '#B40404', fontWeight:'bold', alignSelf: 'center',marginLeft:-5}}>
                End of Results!!</Text>
      :
      <View style = {{marginLeft: -10, marginVertical: -2, flexDirection:'row', justifyContent: 'space-around',}}>
      {
      this.state.page == 1 ?
        <IconButton  icon = "chevron-left"  color = {'gray'}  size = {40}/>
      :
        <IconButton  icon = "chevron-left"  color = {'#B40404'} size = {40}
                     onPress={() => {this.urlfunction(-1);}}  />
      }
      <Text style = {{fontWeight: 'bold', paddingBottom: 10,}}>{'\n'}{this.state.page}</Text>
      {
        pageinfo[0].childNodes[3].childNodes.length == 7 || this.state.page == 1?
          <IconButton icon = "chevron-right"  color = {'#B40404'}  size = {40}
                      onPress={() => {this.urlfunction(1);}} />
       :
          <IconButton icon = "chevron-right"  color = {'gray'}  size = {40}  />
      }
      </View>
    */}
            </ScrollView>
          </View>
        )}
      </PaperProvider>
    );
  }
}

export default Scimag;
