import React, {Component} from 'react';
import axios from 'axios';
import {View, ScrollView, Alert} from 'react-native';
import {
  Text,
  ActivityIndicator,
  TouchableRipple,
  Appbar,
  Provider as PaperProvider,
  IconButton,
} from 'react-native-paper';

import DialogComponent from '../Components/DialogComponet';

var HTMLParser = require('fast-html-parser');

export class Fiction extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const search = navigation.getParam('search', '');
    const searchin = navigation.getParam('sIn', 'All');
    this.state = {
      searchQuery: search,
      searchIn: searchin,
      page: 1,
      loading: true,
      url: '',
      root: '',
    };
  }

  componentDidMount() {
    axios
      .get(
        'http://gen.lib.rus.ec/fiction/?q=' +
          this.state.searchQuery.replace(' ', '+'),
      )
      .then(data =>
        this.setState({
          root: HTMLParser.parse(data.data),
          loading: false,
        }),
      )
      .catch(err => Alert.alert(err));
  }

  urlfunction(i) {
    i = this.state.page + i;
    var url =
      'http://gen.lib.rus.ec/fiction/?q=' +
      this.state.searchQuery.replace(' ', '+') +
      '&page=' +
      i;
    this.setState({loading: true});

    axios
      .get(url)
      .then(data =>
        this.setState({
          page: i,
          root: HTMLParser.parse(data.data),
          loading: false,
        }),
      )
      .catch(err => Alert.alert(err));
    return;
  }

  render() {
    var rows = this.state.loading ? [] : this.state.root.querySelectorAll('td');
    var pageinfo = this.state.loading
      ? []
      : this.state.root.querySelectorAll('.catalog_paginator');
    var result = this.state.loading
      ? []
      : this.state.root.querySelectorAll('p'); //If no files are found to the search query then it will have an extra para stating file not found
    var found = true;
    if (result.length > 1) {
      found = false;
      return <DialogComponent nav={this.props.navigation} navscreen="Home" />;
    }

    var titles = [];
    var links = [];
    var series = [];
    var language = [];
    var file = [];
    var authors = [];
    var i = 6;
    var j = 0;
    for (i = 6, j = 0; i < rows.length; i += 2, j++) {
      authors[j] = JSON.stringify(
        rows[i].rawText
          .replace('\n\t\t\n\t\t\t', '')
          .replace('\n\t\t\t\t\n\t\t', '')
          .replace('\n\t\t\t', ''),
      );
      i++;
      series[j] = JSON.stringify(
        rows[i].rawText.replace(/amp;/g, '').replace(/&#039;/g, "'"),
      );
      i++;
      titles[j] = JSON.stringify(
        rows[i].rawText.replace(/amp;/g, '').replace(/&#039;/g, "'"),
      );
      links[j] = JSON.stringify(
        rows[i].childNodes[0].rawAttrs.replace('href=', '').replace(/"/g, ''),
      );
      i++;
      language[j] = JSON.stringify(rows[i].rawText);
      i++;
      file[j] = JSON.stringify(rows[i].rawText.replace('&nbsp;', ' '));
    }
    var filesfound =
      this.state.loading && found
        ? ''
        : JSON.stringify(
            pageinfo[0].childNodes[1].rawText.replace('&nbsp;', ''),
          );

    var page =
      this.state.loading && found
        ? ''
        : pageinfo[0].childNodes[3] == undefined
        ? 'page 1 / 1 ' //Since page no is not shown in only 1 page cases pageinfo[0].childnode[3] doesn't exist and causes error
        : this.state.page === 1
        ? JSON.stringify(pageinfo[0].childNodes[3].childNodes[1].rawText)
        : JSON.stringify(pageinfo[0].childNodes[3].childNodes[3].rawText);
    //console.log(links);

    return (
      <PaperProvider>
        <Appbar.Header style={{backgroundColor: '#B40404'}}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content
            title="Fiction"
            subtitle={
              this.state.searchQuery + '\t\t.\t\t' + this.state.searchIn
            }
          />
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
                justifyContent: 'space-around',
                borderBottomWidth: 2,
                borderBottomColor: '#B40404',
              }}>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                {filesfound.replace(/"/g, '')}
              </Text>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                {page.replace(/"/g, '')}
              </Text>
            </View>
            <ScrollView style={{marginBottom: 90, marginLeft: 5}}>
              {titles.map((item, key) => (
                <View
                  style={{borderBottomWidth: 1, borderBottomColor: '#B40404'}}>
                  <TouchableRipple
                    onPress={() =>
                      this.props.navigation.navigate('Fiction1Screen', {
                        link: links[key],
                        title: titles[key].replace(/"/g, ''),
                        author: authors[key].replace(/"/g, ''),
                      })
                    }
                    rippleColor="#B40404">
                    <View>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>
                          Title:{'\t\t\t\t\t\t\t\t'}
                        </Text>
                        {item.replace(/"/g, '')}
                        {'\n'}
                        <Text style={{fontWeight: 'bold'}}>
                          Series:{'\t\t\t\t\t\t'}
                        </Text>
                        {series[key].replace(/"/g, '')}
                        {'\n'}
                        <Text style={{fontWeight: 'bold'}}>
                          Author:{'\t\t\t\t\t'}
                        </Text>
                        {authors[key].replace(/"/g, '')}
                        {'\n'}
                        <Text style={{fontWeight: 'bold'}}>
                          File:{'\t\t\t\t\t\t\t\t'}
                        </Text>
                        {file[key].replace(/"/g, '')}
                        {'\n'}
                        <Text style={{fontWeight: 'bold'}}>
                          Language:{'\t\t'}
                        </Text>
                        {language[key].replace(/"/g, '')}
                      </Text>
                      <View style={{alignItems: 'flex-end', marginRight: 10}}>
                        <Text style={{fontWeight: 'bold'}}>
                          {key + 1 + (this.state.page - 1) * 25}
                        </Text>
                      </View>
                    </View>
                  </TouchableRipple>
                </View>
              ))}

              {pageinfo[0].childNodes[3] === undefined ? ( //Case of 1 page results and multi page results
                <Text
                  style={{
                    color: '#B40404',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginLeft: -5,
                  }}>
                  End of Results!!
                </Text>
              ) : (
                <View
                  style={{
                    marginLeft: -10,
                    marginVertical: -10,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  {this.state.page === 1 ? (
                    <IconButton icon="chevron-left" color={'gray'} size={40} />
                  ) : (
                    <IconButton
                      icon="chevron-left"
                      color={'#B40404'}
                      size={40}
                      onPress={() => {
                        this.urlfunction(-1);
                      }}
                    />
                  )}
                  <Text style={{fontWeight: 'bold', paddingBottom: 10}}>
                    {'\n'}
                    {this.state.page}
                  </Text>
                  {pageinfo[0].childNodes[3].childNodes.length === 7 ||
                  this.state.page === 1 ? (
                    <IconButton
                      icon="chevron-right"
                      color={'#B40404'}
                      size={40}
                      onPress={() => {
                        this.urlfunction(1);
                      }}
                    />
                  ) : (
                    <IconButton icon="chevron-right" color={'gray'} size={40} />
                  )}
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </PaperProvider>
    );
  }
}

export default Fiction;
