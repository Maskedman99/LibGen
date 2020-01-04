import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform,
  Share,
} from 'react-native';
import {
  FAB,
  Portal,
  Text,
  RadioButton,
  Searchbar,
  Provider as PaperProvider,
  HelperText,
} from 'react-native-paper';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstQuery: '',
      genre: 'scitech',
      searchIn: 'All',
      open: false,
    };
  }

  componentDidMount() {
    async function writeExternalStoragePermission() {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'LibGen Storage Permission',
            message:
              'LibGen needs access to writing in Storage so you can download files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      } catch (err) {
        console.warn(err);
      }
    }

    if (Platform.OS === 'android') {
      writeExternalStoragePermission();
    }
  }

  render() {
    const {firstQuery} = this.state;

    return (
      <PaperProvider>
        <StatusBar backgroundColor="#8A0808" barStyle="light-content" />

        <View style={styles.imgview}>
          <Image
            style={styles.img}
            source={require('../Assets/LibGenLong.png')}
          />
        </View>

        <Searchbar
          raised
          theme={{roundness: 3}}
          style={styles.searchbar}
          placeholder="Search"
          onChangeText={query => {
            this.setState({firstQuery: query});
          }}
          value={firstQuery}
          selectionColor="#B40404"
          enablesReturnKeyAutomatically={true}
          onIconPress={
            this.state.genre === 'scitech'
              ? () =>
                  this.props.navigation.navigate('SciTechScreen', {
                    search: this.state.firstQuery,
                    sIn: this.state.searchIn,
                  })
              : this.state.genre === 'fiction'
              ? () =>
                  this.props.navigation.navigate('FictionScreen', {
                    search: this.state.firstQuery,
                    sIn: this.state.searchIn,
                  })
              : this.state.genre === 'comics'
              ? () =>
                  this.props.navigation.navigate('ComicsScreen', {
                    search: this.state.firstQuery,
                  })
              : this.state.genre === 'scimag'
              ? () =>
                  this.props.navigation.navigate('ScimagScreen', {
                    search: this.state.firstQuery,
                    sIn: this.state.searchIn,
                  })
              : this.state.genre === 'mag'
              ? () =>
                  this.props.navigation.navigate('MagScreen', {
                    search: this.state.firstQuery,
                  })
              : () => this.props.navigation.navigate('SettingScreen')
          }
          onSubmitEditing={
            this.state.genre === 'scitech'
              ? () =>
                  this.props.navigation.navigate('SciTechScreen', {
                    search: this.state.firstQuery,
                    sIn: this.state.searchIn,
                  })
              : this.state.genre === 'fiction'
              ? () =>
                  this.props.navigation.navigate('FictionScreen', {
                    search: this.state.firstQuery,
                    sIn: this.state.searchIn,
                  })
              : this.state.genre === 'comics'
              ? () =>
                  this.props.navigation.navigate('ComicsScreen', {
                    search: this.state.firstQuery,
                  })
              : this.state.genre === 'scimag'
              ? () =>
                  this.props.navigation.navigate('ScimagScreen', {
                    search: this.state.firstQuery,
                    sIn: this.state.searchIn,
                  })
              : this.state.genre === 'mag'
              ? () =>
                  this.props.navigation.navigate('MagScreen', {
                    search: this.state.firstQuery,
                  })
              : () => this.props.navigation.navigate('SettingScreen')
          }
        />
        <HelperText type="error" visible={this.state.firstQuery.length < 3}>
          Length of the search string must be greater than 2 characters
        </HelperText>

        <ScrollView
          //  contentContainerStyle={{paddingBottom: 50}}
          keyboardShouldPersistTaps="always">
          <RadioButton.Group
            onValueChange={searchIn => this.setState({searchIn})}
            value={this.state.searchIn}>
            <View style={styles.radio1}>
              <RadioButton value="All" color="#B40404" />
              <TouchableWithoutFeedback
                onPress={() => this.setState({searchIn: 'All'})}>
                <Text style={styles.radiotext1}>All</Text>
              </TouchableWithoutFeedback>

              <RadioButton value="Title" color="#B40404" />
              <TouchableWithoutFeedback
                onPress={() => this.setState({searchIn: 'Title'})}>
                <Text style={styles.radiotext1}>Title</Text>
              </TouchableWithoutFeedback>

              <RadioButton value="Author" color="#B40404" />
              <TouchableWithoutFeedback
                onPress={() => this.setState({searchIn: 'Author'})}>
                <Text style={styles.radiotext1}>Author</Text>
              </TouchableWithoutFeedback>
            </View>
          </RadioButton.Group>

          <RadioButton.Group
            onValueChange={genre => this.setState({genre})}
            value={this.state.genre}>
            <View style={styles.radio}>
              <RadioButton value="scitech" color="#B40404" />
              <TouchableWithoutFeedback
                onPress={() => this.setState({genre: 'scitech'})}>
                <Text style={styles.radiotext}>LibGen (Sci -Tech)</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.radio}>
              <RadioButton value="scimag" color="#B40404" />
              <TouchableWithoutFeedback
                onPress={() => this.setState({genre: 'scimag'})}>
                <Text style={styles.radiotext}>Scientific Articles</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.radio}>
              <RadioButton value="fiction" color="#B40404" />
              <TouchableWithoutFeedback
                onPress={() => this.setState({genre: 'fiction'})}>
                <Text style={styles.radiotext}>Fiction</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.radio}>
              <RadioButton value="comics" color="#B40404" />
              <TouchableWithoutFeedback
                onPress={() => this.setState({genre: 'comics'})}>
                <Text style={styles.radiotext}>Comics</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.radio}>
              <RadioButton value="fifth" color="#B40404" />
              <TouchableWithoutFeedback
                onPress={() => this.setState({genre: 'fifth'})}>
                <Text style={styles.radiotext}>Standards</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.radio}>
              <RadioButton value="mag" color="#B40404" />
              <TouchableWithoutFeedback
                onPress={() => this.setState({genre: 'mag'})}>
                <Text style={styles.radiotext}>Magazines</Text>
              </TouchableWithoutFeedback>
            </View>
          </RadioButton.Group>
        </ScrollView>

        <Portal>
          <FAB.Group
            open={this.state.open}
            icon={
              this.state.open
                ? 'unfold-less-horizontal'
                : 'unfold-more-horizontal'
            }
            fabStyle={styles.fabstyle}
            style={styles.fab}
            actions={[
              {
                icon: 'share-variant',
                label: 'Share',
                color: '#B40404',
                onPress: () => {
                  Share.share(
                    {
                      message: 'http://gen.lib.rus.ec/  ',
                      url: 'http://gen.lib.rus.ec/', //Only IOS
                      title: 'Hey there, checkout this link!',
                    },
                    {
                      // Android only:
                      dialogTitle: 'Share LibGen, spread the knowledge!',
                      // iOS only:
                      excludedActivityTypes: [
                        'com.apple.UIKit.activity.PostToTwitter',
                      ],
                    },
                  );
                },
              },
              {
                icon: 'information-variant',
                label: 'About',
                color: '#B40404',
                onPress: () => this.props.navigation.navigate('AboutScreen'),
              },
              {
                icon: 'settings',
                label: 'Settings',
                color: '#B40404',
                onPress: () => this.props.navigation.navigate('SettingScreen'),
              },
              {
                icon: 'file-download',
                label: 'Downloads',
                color: '#B40404',
                onPress: () =>
                  this.props.navigation.navigate('DownloadsScreen'),
              },
            ]}
            onStateChange={({open}) => this.setState({open})}
          />
        </Portal>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  imgview: {justifyContent: 'center', alignItems: 'center'},
  img: {
    height: 50,
    width: 325,
    marginBottom: 25,
    marginTop: 25,
  },
  radio1: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingLeft: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#B40404',
  },
  radio: {
    flexDirection: 'row',
    margin: 10,
    marginLeft: 15,
  },
  radiotext1: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 7,
    marginLeft: 5,
    flex: 1,
  },
  radiotext: {
    fontSize: 19,
    fontWeight: '400',
    marginTop: 6,
    marginLeft: 10,
    flex: 1,
  },
  fab: {
    paddingBottom: 10,
    paddingRight: 10,
  },
  searchbar: {
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#B40404',
    height: 55,
    borderWidth: 1,
  },
  fabstyle: {backgroundColor: '#B40404'},
});

export default Home;
