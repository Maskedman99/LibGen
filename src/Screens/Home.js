import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform
} from 'react-native';
import {
  Text,
  RadioButton,
  Searchbar,
  Provider as PaperProvider,
  HelperText
} from 'react-native-paper';

import HomeFab from '../Components/HomeFab';

const onSubmitSearch = (nav, genre, query, category) => {
  genre === 'scitech'
    ? nav.navigate('SciTechScreen', {
        search: query,
        sIn: category
      })
    : genre === 'fiction'
    ? nav.navigate('FictionScreen', {
        search: query,
        sIn: category
      })
    : genre === 'comics'
    ? nav.navigate('ComicsScreen', {
        search: query
      })
    : genre === 'scimag'
    ? nav.navigate('ScimagScreen', {
        search: query,
        sIn: category
      })
    : genre === 'mag'
    ? nav.navigate('MagScreen', {
        search: query
      })
    : nav.navigate('SettingScreen');
};

const Home = ({navigation}) => {
  const [firstQuery, setFirstQuery] = useState('');
  const [genre, setGenre] = useState('scitech');
  const [searchIn, setSearchIn] = useState('All');

  useEffect(() => {
    async function writeExternalStoragePermission() {
      try {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'LibGen Storage Permission',
          message: 'LibGen needs access to writing in Storage so you can download files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        });
      } catch (err) {
        console.warn(err);
      }
    }

    if (Platform.OS === 'android') {
      writeExternalStoragePermission();
    }
  }, []);

  return (
    <PaperProvider>
      <StatusBar backgroundColor="#8A0808" barStyle="light-content" />

      <View style={styles.imgview}>
        <Image style={styles.img} source={require('../Assets/LibGenLong.png')} />
      </View>

      <Searchbar
        raised
        theme={{roundness: 3}}
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={query => setFirstQuery(query)}
        value={firstQuery}
        selectionColor="#B40404"
        enablesReturnKeyAutomatically={true}
        onIconPress={() => onSubmitSearch(navigation, genre, firstQuery, searchIn)}
        onSubmitEditing={() => onSubmitSearch(navigation, genre, firstQuery, searchIn)}
      />
      <HelperText type="error" visible={firstQuery.length < 3}>
        Length of the search string must be greater than 2 characters
      </HelperText>

      <ScrollView keyboardShouldPersistTaps="always">
        <RadioButton.Group onValueChange={i => setSearchIn(i)} value={searchIn}>
          <View style={styles.radio1}>
            <RadioButton value="All" color="#B40404" />
            <TouchableWithoutFeedback onPress={() => setSearchIn('All')}>
              <Text style={styles.radiotext1}>All</Text>
            </TouchableWithoutFeedback>

            <RadioButton value="Title" color="#B40404" />
            <TouchableWithoutFeedback onPress={() => setSearchIn('Title')}>
              <Text style={styles.radiotext1}>Title</Text>
            </TouchableWithoutFeedback>

            <RadioButton value="Author" color="#B40404" />
            <TouchableWithoutFeedback onPress={() => setSearchIn('Author')}>
              <Text style={styles.radiotext1}>Author</Text>
            </TouchableWithoutFeedback>
          </View>
        </RadioButton.Group>

        <RadioButton.Group onValueChange={i => setGenre(i)} value={genre}>
          <View style={styles.radio}>
            <RadioButton value="scitech" color="#B40404" />
            <TouchableWithoutFeedback onPress={() => setGenre('scitech')}>
              <Text style={styles.radiotext}>LibGen (Sci -Tech)</Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.radio}>
            <RadioButton value="scimag" color="#B40404" />
            <TouchableWithoutFeedback onPress={() => setGenre('scimag')}>
              <Text style={styles.radiotext}>Scientific Articles</Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.radio}>
            <RadioButton value="fiction" color="#B40404" />
            <TouchableWithoutFeedback onPress={() => setGenre('fiction')}>
              <Text style={styles.radiotext}>Fiction</Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.radio}>
            <RadioButton value="comics" color="#B40404" />
            <TouchableWithoutFeedback onPress={() => setGenre('comics')}>
              <Text style={styles.radiotext}>Comics</Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.radio}>
            <RadioButton value="fifth" color="#B40404" />
            <TouchableWithoutFeedback onPress={() => setGenre('fifth')}>
              <Text style={styles.radiotext}>Standards</Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.radio}>
            <RadioButton value="mag" color="#B40404" />
            <TouchableWithoutFeedback onPress={() => setGenre('mag')}>
              <Text style={styles.radiotext}>Magazines</Text>
            </TouchableWithoutFeedback>
          </View>
        </RadioButton.Group>
      </ScrollView>
      <HomeFab nav={navigation} />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  imgview: {alignItems: 'center'},
  img: {
    height: 50,
    width: 325,
    marginVertical: 25
  },
  radio1: {
    flexDirection: 'row',
    paddingTop: 5,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B40404'
  },
  radio: {
    flexDirection: 'row',
    padding: 10
  },
  radiotext1: {
    fontSize: 16,
    textAlignVertical: 'center',
    paddingLeft: 5,
    flex: 1
  },
  radiotext: {
    fontSize: 19,
    textAlignVertical: 'center',
    paddingLeft: 10
  },
  searchbar: {
    marginHorizontal: 5,
    borderColor: '#B40404',
    height: 55,
    borderWidth: 1
  }
});

export default Home;
