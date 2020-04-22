import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text, Provider as PaperProvider} from 'react-native-paper';

import MagList from '../Components/MagList';
import Spinner from '../Components/Spinner';
import NavBar from '../Components/NavBar';
import useAxios from '../Components/Logic/useAxios';
import magazineParser from '../Components/Logic/magazineParser';

const Mag = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState([]);
  const [links, setLinks] = useState([]);
  const searchQuery = navigation.getParam('search', '');

  let data = [];
  data = useAxios(`http://magzdb.org/makelist?t=${searchQuery.replace(' ', '+')}`);

  if (data.length !== 0 && loading === true) {
    let result = magazineParser(data);
    setTitles(result.titles);
    setLinks(result.links);
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
            <MagList data={titles} links={links} nav={navigation} />
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
  bottomContainer: {marginBottom: 90},
  textStyle: {fontWeight: 'bold', marginBottom: 5}
});

export default Mag;
