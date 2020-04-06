import React, {Component} from 'react';
import axios from 'axios';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Alert, Text, Appbar, Provider as PaperProvider} from 'react-native-paper';

import MagList from '../Components/MagList';
import Spinner from '../Components/Spinner';

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
    // eslint-disable-next-line consistent-this
    const self = this;
    axios
      .get('http://magzdb.org/makelist?t=' + this.state.searchQuery.replace(' ', '+'))
      .then(function (data) {
        var rows = HTMLParser.parse(data.data).querySelectorAll('a');

        var titles = [];
        var links = [];
        for (var i = 0; i < rows.length; i++) {
          links[i] = JSON.stringify(rows[i].rawAttrs);
          links[i] = links[i].replace('"href=', '').replace('"', '');
          titles[i] = JSON.stringify(rows[i].rawText);
        }

        self.setState({loading: false, titles: titles, links: links});
      })
      .catch(err => Alert.alert(err));
  }

  render() {
    return (
      <PaperProvider>
        <Appbar.Header style={{backgroundColor: '#B40404'}}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Magazines" subtitle={this.state.searchQuery} />
        </Appbar.Header>

        {this.state.loading ? (
          <Spinner />
        ) : (
          <View>
            <View style={styles.topContainer}>
              <Text style={styles.textStyle}>Files Found: </Text>
              <Text style={styles.textStyle}>
                {this.state.links.length}
                {'\t'}
              </Text>
            </View>
            <ScrollView style={styles.bottomContainer}>
              <MagList data={this.state.titles} links={this.state.links} />
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
    justifyContent: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: '#B40404'
  },
  bottomContainer: {marginBottom: 90, marginLeft: 5},
  textStyle: {fontWeight: 'bold', marginBottom: 5}
});

export default Mag;
