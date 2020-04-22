import React, {Component} from 'react';
import axios from 'axios';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, TouchableRipple, Provider as PaperProvider, IconButton} from 'react-native-paper';

import DialogComponent from '../Components/DialogComponet';
import FictionDisplay from '../Components/FictionDisplay';
import NavBar from '../Components/NavBar';
import Spinner from '../Components/Spinner';

var HTMLParser = require('fast-html-parser');

export class Fiction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: this.props.navigation.getParam('search', ''),
      searchIn: this.props.navigation.getParam('sIn', 'All'),
      page: 1,
      loading: true,
      url: '',
      root: '',
      titles: [],
      links: [],
      series: [],
      language: [],
      file: [],
      authors: [],
      filesfound: '',
      pageinfo: [],
      pageX: ''
    };
  }

  componentDidMount() {
    this.urlfunction(0);
    //Don't call this in constructor since setState might get invoked before compponent is mounted
  }

  urlfunction(x) {
    x = this.state.page + x;
    var url =
      'http://gen.lib.rus.ec/fiction/?q=' + this.state.searchQuery.replace(' ', '+') + '&page=' + x;
    this.setState({loading: true});

    axios
      .get(url)
      .then(data => {
        this.setState({
          page: x
        });
        const root = HTMLParser.parse(data.data);
        let rows = root.querySelectorAll('td');
        let pageinfo = root.querySelectorAll('.catalog_paginator');
        let result = root.querySelectorAll('p');
        //If no files are found to the search query then it will have an extra para stating file not found
        console.log(rows);
        var found = true;
        if (result.length > 1) {
          found = false;
          return (
            <DialogComponent
              nav={this.props.navigation}
              title="File not Found"
              content="Retype your search query!"
            />
          );
        }

        var titles = [];
        var links = [];
        var series = [];
        var language = [];
        var file = [];
        var authors = [];
        for (let i = 7, j = 0; i < rows.length; i += 3, j++) {
          authors[j] = JSON.stringify(
            rows[i].rawText
              .replace('\n\t\t\n\t\t\t', '')
              .replace('\n\t\t\t\t\n\t\t', '')
              .replace('\n\t\t\t', '')
          );
          i++;
          series[j] = JSON.stringify(rows[i].rawText.replace(/amp;/g, '').replace(/&#039;/g, "'"));
          i++;
          titles[j] = JSON.stringify(rows[i].rawText.replace(/amp;/g, '').replace(/&#039;/g, "'"));
          console.log(rows[i]);
          links[j] = JSON.stringify(
            rows[i].firstChild.rawAttrs.replace('href=', '').replace(/"/g, '')
          );
          i++;
          language[j] = JSON.stringify(rows[i].rawText);
          i++;
          file[j] = JSON.stringify(rows[i].rawText.replace('&nbsp;', ' '));
        }
        var filesfound = found
          ? ''
          : JSON.stringify(pageinfo[0].childNodes[1].rawText.replace('&nbsp;', ''));

        var page = found
          ? ''
          : pageinfo[0].childNodes[3] === undefined
          ? 'page 1 / 1 ' //Since page no is not shown in only 1 page cases pageinfo[0].childnode[3] doesn't exist and causes error
          : this.state.page === 1
          ? JSON.stringify(pageinfo[0].childNodes[3].childNodes[1].rawText)
          : JSON.stringify(pageinfo[0].childNodes[3].childNodes[3].rawText);
        //console.log(links);
        this.setState({
          authors: authors,
          titles: titles,
          links: links,
          series: series,
          language: language,
          file: file,
          filesfound: filesfound,
          pageinfo: pageinfo,
          pageX: page
        });
        this.setState({loading: false});
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <PaperProvider>
        <NavBar
          nav={this.props.navigation}
          title={'Fiction'}
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
                {this.state.filesfound.replace(/"/g, '')}
              </Text>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                {this.state.pageX.replace(/"/g, '')}
              </Text>
            </View>
            <ScrollView style={{marginBottom: 90, marginLeft: 5}}>
              {this.state.titles.map((item, key) => (
                <View style={{borderBottomWidth: 1, borderBottomColor: '#B40404'}}>
                  <TouchableRipple
                    onPress={() =>
                      this.props.navigation.navigate('Fiction1Screen', {
                        link: this.state.links[key],
                        title: this.state.titles[key].replace(/"/g, ''),
                        author: this.state.authors[key].replace(/"/g, '')
                      })
                    }
                    rippleColor="#B40404">
                    <FictionDisplay
                      T={item}
                      S={this.state.series[key]}
                      A={this.state.authors[key]}
                      F={this.state.file[key]}
                      L={this.state.language[key]}
                      no={key + 1 + (this.state.page - 1) * 25}
                    />
                  </TouchableRipple>
                </View>
              ))}

              {this.state.pageinfo[0].childNodes[3] === undefined ? ( //Case of 1 page results and multi page results
                <Text
                  style={{
                    color: '#B40404',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginLeft: -5
                  }}>
                  End of Results!!
                </Text>
              ) : (
                <View
                  style={{
                    marginLeft: -10,
                    marginVertical: -10,
                    flexDirection: 'row',
                    justifyContent: 'space-around'
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
                  {this.state.pageinfo[0].childNodes[3].childNodes.length === 7 ||
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
