import React, {Component} from 'react';
import axios from 'axios';
import {View, ScrollView} from 'react-native';
import {
  Text,
  ActivityIndicator,
  TouchableRipple,
  Appbar,
  Provider as PaperProvider,
} from 'react-native-paper';

var HTMLParser = require('fast-html-parser');

class Mag extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const search = navigation.getParam('search', '');
    this.state = {
      searchQuery: search,
      loading: true,
      titles: [],
      links: []
  };
  }
  componentDidMount() {
    self = this;
    axios
      .get('http://magzdb.org/makelist?t=' + this.state.searchQuery.replace(' ', '+'))
      .then(function(data) {
        var rows = HTMLParser.parse(data.data).querySelectorAll('a');

        var titles = [];
        var links = [];
        for (var i = 0; i < rows.length; i++) {
          links[i] = JSON.stringify(rows[i].rawAttrs);
          links[i] = links[i].replace('"href=', '').replace('"', '');
          titles[i] = JSON.stringify(rows[i].rawText);
        }

        self.setState({loading: false, titles: titles, links: links})
      })
      .catch(err => alert('Something went wrong! Check your connection.'));
  }

  render() {
    return (
      <PaperProvider>
        <Appbar.Header style={{backgroundColor: '#B40404'}}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Magazines" subtitle={this.state.searchQuery} />
          <Appbar.Action icon="dots-vertical" onPress={this._onMore} />
        </Appbar.Header>

        {this.state.loading ? (
          <ActivityIndicator
            animating={true}
            color="#B40404"
            size={40}
            style={{flex: 1}}
          />
        ) : (
          <View>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                borderBottomWidth: 2,
                borderBottomColor: '#B40404',
              }}>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                Files Found:{' '}
              </Text>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                {this.state.links.length}
                {'\t'}
              </Text>
            </View>
            <ScrollView style={{marginBottom: 90, marginLeft: 5}}>
              {this.state.titles.map((item, key) => (
                <View
                  style={{borderBottomWidth: 1, borderBottomColor: '#B40404'}}>
                  <TouchableRipple
                    onPress={() =>
                      this.props.navigation.navigate('Mag1Screen', {
                        link: this.state.links[key],
                        title: this.states.titles[key].replace(/"/g, ''),
                      })
                    }
                    rippleColor="#B40404">
                    <View>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>
                          {item.replace(/"/g, '')}
                          {'\n'}
                        </Text>
                        {
                          //<Text  style = {{fontWeight: 'bold'}}>{series[key].replace(/"/g,'')}{'\n'}</Text>
                          //Country or other details
                        }
                      </Text>
                      <View style={{alignItems: 'flex-end', marginRight: 10}}>
                        <Text style={{fontWeight: 'bold'}}>{key + 1}</Text>
                      </View>
                    </View>
                  </TouchableRipple>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </PaperProvider>
    );
  }
}

export default Mag;
