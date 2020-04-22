import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Provider as PaperProvider} from 'react-native-paper';

import MagList from '../Components/MagList';
import Spinner from '../Components/Spinner';
import NavBar from '../Components/NavBar';
import useAxios from '../Components/Logic/useAxios';

var HTMLParser = require('fast-html-parser');

const Mag = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState([]);
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(navigation.getParam('search', ''));

  let data = [];
  data = useAxios(`http://magzdb.org/makelist?t=${searchQuery.replace(' ', '+')}`);

  if (data.length !== 0 && loading === true) {
    let rows = HTMLParser.parse(data).querySelectorAll('a');

    let titlesVar = [];
    let linksVar = [];
    for (let i = 0; i < rows.length; i++) {
      linksVar[i] = JSON.stringify(rows[i].rawAttrs);
      linksVar[i] = linksVar[i].replace('"href=', '').replace('"', '');
      titlesVar[i] = JSON.stringify(rows[i].rawText);
    }
    setLinks(linksVar);
    setTitles(titlesVar);
    setLoading(false);
  }

  return (
    <PaperProvider>
      <NavBar nav={navigation} title={'Magazine'} subtitle={searchQuery} />
      {loading ? (
        <Spinner />
      ) : (
        <View>
          <View style={styles.topContainer}>
            <Text style={styles.textStyle}>{`Files Found: ${links.length}`}</Text>
          </View>
          <ScrollView style={styles.bottomContainer}>
            <MagList data={titles} links={links} />
          </ScrollView>
        </View>
      )}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 5,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: '#B40404'
  },
  bottomContainer: {marginBottom: 90, marginLeft: 5},
  textStyle: {fontWeight: 'bold', marginBottom: 5}
});

export default Mag;
