// need to fix eslint later

import React, {Component} from 'react';
import axios from 'axios';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Alert, Text, Appbar, Provider as PaperProvider, IconButton} from 'react-native-paper';

var HTMLParser = require('fast-html-parser');

import SciTechList from '../Components/SciTechList';
import Spinner from '../Components/Spinner';

export class SciTech extends Component {
  state = {
    searchQuery: this.props.navigation.getParam('search', ''),
    currPage: 1,
    searchIn: this.props.navigation.getParam('sIn', 'All'),
    loading: true,
    root: ''
  };

  componentDidMount() {
    axios
      .get('http://gen.lib.rus.ec/search.php?&req=' + this.state.searchQuery.replace(' ', '+'))
      .then(data =>
        this.setState({
          root: HTMLParser.parse(data.data),
          loading: false
        })
      )
      .catch(e => Alert.alert(e));
  }

  urlfunction(i) {
    i = this.state.currPage + i;
    var url =
      'http://gen.lib.rus.ec/search.php?&req=' +
      this.state.searchQuery.replace(' ', '+') +
      '&page=' +
      i;
    this.setState({loading: true});

    axios
      .get(url)
      .then(data =>
        this.setState({
          currPage: i,
          root: HTMLParser.parse(data.data),
          loading: false
        })
      )
      .catch(e => Alert.alert(e));
    return;
  }

  render() {
    var rows = this.state.loading ? [] : this.state.root.querySelectorAll('tr');
    var pages = this.state.loading ? [] : this.state.root.querySelectorAll('font');
    var details = [];

    if (this.state.loading === false) {
      pages = pages[2].rawText.split(' ');

      var titles =
        pages[0] > 25
          ? rows[0].childNodes[1].childNodes[0].childNodes[10].childNodes
          : rows[0].childNodes[1].childNodes[0].childNodes[8].childNodes;
      //in case of 1 page, details are located in index 8

      if (pages[0] <= 25) {
        pages.push('');
        pages.push('');
        pages.push('');
        pages.push('');
        pages.push(0); //pages[7]
      }
      var lastPage = Math.floor(pages[0] / 25) + 1;
      console.log(rows);

      //DETAILS--------------------------------------------------------------------------------------------------

      //Need help to seperate out titles and series name
      titles.shift();

      for (let i = 0; i < titles.length - 1; i++) {
        titles.splice(i + 1, 1); //Removes all odd index elements
      }
      console.log(titles);
      var titles1 = [];
      for (let i = 0; i < titles.length; i++) {
        //  names[i]  = JSON.stringify(titles[i].childNodes[4].childNodes[2].rawText);
        //  console.log(titles[i]);
        titles1[i] = JSON.stringify(titles[i].rawText);
        details[i] = titles1[i].split('\\r\\n\\t\\t\\t\\t');
        details[i].splice(9, 3);
        details[i].shift();
        //  names[i] = details[i][1];
        details[i].splice(1, 1);
      }

      //DEBUGGING------------------------------------------------------------------------------------------------
      // console.log(names);
    }

    return (
      <PaperProvider>
        <Appbar.Header style={{backgroundColor: '#B40404'}}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content
            title="LibGen (Sci-Tech)"
            subtitle={this.state.searchQuery + '\t\t.\t\t' + this.state.searchIn}
          />
          <Appbar.Action icon="dots-vertical" onPress={this._onMore} />
        </Appbar.Header>

        {this.state.loading ? (
          <Spinner />
        ) : (
          <View>
            <View style={styles.topContainer}>
              <Text style={styles.topContainerText}>{pages[0]} Files Found</Text>
              <Text style={styles.topContainerText}>
                Pages {this.state.currPage}/{lastPage}
              </Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
              <SciTechList details={details} />

              {lastPage === 1 ? ( //Case of 1 page results and multi page results
                <Text style={styles.endText}>End of Results!!</Text>
              ) : (
                <View style={styles.pageContainer}>
                  {this.state.currPage === 1 ? (
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
                  <Text style={styles.pageText}>{this.state.currPage}</Text>
                  {this.state.currPage !== lastPage ? (
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

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderBottomColor: '#B40404'
  },
  endText: {
    color: '#B40404',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: -5
  },
  pageContainer: {
    marginLeft: -10,
    marginVertical: -2,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  scrollContainer: {marginBottom: 90},
  pageText: {fontWeight: 'bold', padding: 30},
  topContainerText: {fontWeight: 'bold', marginBottom: 5}
});

export default SciTech;
