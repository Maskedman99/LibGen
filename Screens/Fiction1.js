import React, {Component} from 'react';
import axios from 'axios';
import {View, ScrollView} from 'react-native';
import {
  Text,
  Divider,
  Dialog,
  Portal,
  Button,
  ActivityIndicator,
  Appbar,
  Provider as PaperProvider,
  TouchableRipple,
  Snackbar,
} from 'react-native-paper';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Bar';
import RNFetchBlob from 'rn-fetch-blob';

var HTMLParser = require('fast-html-parser');

class Fiction1 extends Component {
  state = {
    Title: '',
    Author: '',
    flag: 0,
    root: '',
    md5: '',
    id: '',
    loading: true,
    loading1: true,
    visible: false,
    visible1: false,
  };
  _hideDialog = () => this.setState({visible: false});

  downloadfunction(downlinks, extension, i) {
    var downurl = downlinks[i].replace(/"/g, '').replace('\\', '');
    extension = extension.toLowerCase();

    if (i == 0) {
      downurl =
        'http://download.library1.org/fiction/' +
        this.state.id.substring(0, this.state.id.length - 3) +
        '000/' +
        this.state.md5.toLocaleLowerCase() +
        '.' +
        extension +
        '/';
    }
    ('/');
    //the substring section cuts of 3 last integer of id

    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir; // this is the Downloads directory.
    let options = {
      fileCache: true,
      appendExt: extension, //Adds Extension only during the download
      addAndroidDownloads: {
        useDownloadManager: true, //uses the device's native download manager.
        notification: true,
        title: this.state.Title, // Title of download notification.
        path: DownloadDir + '/' + this.state.Title + '.' + extension, // this is the path where your downloaded file will live in
        description: 'Downloading file.',
      },
    };
    config(options)
      .fetch('GET', downurl)
      .then(res => {
        //console.log("Success");
      })
      .catch(err => {
        this.setState({visible1: true});
      });
  }

  componentDidMount() {
    const {navigation} = this.props;
    const link = navigation.getParam('link', '');
    const title = navigation.getParam('title', '');
    const author = navigation.getParam('author', '');
    this.setState({Title: title, Author: author});

    let url = 'http://gen.lib.rus.ec' + link.replace(/"/g, '');
    axios
      .get(url)
      .then(data =>
        this.setState({
          root: HTMLParser.parse(data.data),
          loading: false,
        }),
      )
      .catch(err => alert('Something went wrong! Check your connection.'));
  }

  render() {
    if (this.state.loading === false) {
      var rows = this.state.root.querySelectorAll('tr');
      var desc = this.state.root.querySelectorAll('.description');
      var imgrows = this.state.root.querySelectorAll('.record_side');
      var dlinks = this.state.root.querySelectorAll('.record_mirrors');

      // Image link Parsing------------------------------------------------------------------------------
      var imglink = JSON.stringify(imgrows[0].childNodes[1].rawAttrs);
      var imgarr = imglink.split('\\');
      imglink = imgarr[1].replace('"', '');

      //Summary Parsing----------------------------------------------------------------------------------
      if (desc.length !== 0) {
        var summary = JSON.stringify(desc[0].rawText);
        var summary = summary.replace('"SUMMARY:', '');
      }

      //Details Parsing----------------------------------------------------------------------------------
      var details = '';
      for (let i = 0; i < rows.length; i++) {
        details =
          details +
          JSON.stringify(
            rows[i].rawText
              .replace('\n\t\t', '')
              .replace('\n\t', '')
              .replace('\n', '')
              .replace(/&nbsp;/g, ' '),
          );
      }
      var detailsarr = details.split('\\t');

      for (let i = 0; i < detailsarr.length; i++) {
        if (detailsarr[i] == '' || detailsarr[i] == '\\n') {
          detailsarr.splice(i, 1);
          i = 0;
        }
      }
      detailsarr.pop();
      detailsarr.pop();
      detailsarr.pop();
      var detailsarr1 = detailsarr.splice(0, 14);
      if (this.state.Author === '') {
        detailsarr.splice(3, 0, '');
      }
      var ext = detailsarr[detailsarr.length - 7]; //File Extension
      if (this.state.flag === 0) {
        this.setState({
          md5: detailsarr1[1],
          id: detailsarr[detailsarr.length - 3],
        });
      }

      //Downlnoad Links Parsing--------------------------------------------------------------------------
      var dlinks0 = [];
      if (this.state.flag === 0) {
        // if not present every time the screen renders the values change.
        dlinks[0].childNodes.pop();
        dlinks[0].childNodes.pop();
        dlinks[0].childNodes.shift();
        this.setState({flag: 1});
      }
      dlinks0 = dlinks[0].childNodes;

      var dlinks1 = [];
      for (let i = 0; i < dlinks0.length; i++) {
        dlinks1[i] = JSON.stringify(
          dlinks0[i].childNodes[0].rawAttrs.replace('href="', ''),
        );
      }

      //Debugging----------------------------------------------------------------------------------------
      //console.log(imglink);
    }

    return (
      <PaperProvider>
        <Appbar.Header style={{backgroundColor: '#B40404'}}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content
            title={this.state.Title}
            subtitle={this.state.Author}
          />
        </Appbar.Header>
        {this.state.loading ? (
          <ActivityIndicator
            animating={true}
            color="#B40404"
            size={40}
            style={{flex: 1}}
          />
        ) : (
          <ScrollView>
            <View
              style={{
                width: 243,
                height: 363,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItem: 'center',
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#B40404',
              }}>
              {imglink == '/img/blank.png' ? (
                <Image
                  style={{width: 240, height: 360}}
                  resizeMode="cover"
                  imageStyle={{width: 239, height: 360}}
                  source={require('../Assets/blank.png')}
                />
              ) : (
                <Image
                  style={{width: 240, height: 360}}
                  indicator={Progress.Pie}
                  indicatorProps={{
                    size: 40,
                    borderWidth: 0,
                    color: 'rgba(180, 4, 4, 1)',
                    unfilledColor: 'rgba(0, 0, 0, 0.2)',
                  }}
                  resizeMode="cover"
                  source={{uri: imglink}}
                />
              )}
            </View>
            <Text style={{alignSelf: 'center', fontSize: 12}}>File Cover</Text>

            <View style={{marginLeft: 5, marginTop: 10, marginRight: 10}}>
              {detailsarr.map((items, key) =>
                key % 2 ? (
                  <View>
                    <Text style={{alignSelf: 'flex-end'}}>
                      {items.replace('\\n', '')}
                    </Text>
                    <Divider />
                  </View>
                ) : (
                  <Text style={{fontWeight: 'bold'}}>
                    {items.replace(/"/g, '')}
                  </Text>
                ),
              )}
              <TouchableRipple
                onPress={() => this.setState({visible: true})}
                rippleColor="#B40404">
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginRight: -5,
                    alignSelf: 'center',
                    textDecorationLine: 'underline',
                    fontSize: 16,
                  }}>
                  {'\n'}Download{'\n'}
                </Text>
              </TouchableRipple>
              <Divider />

              <Text style={{fontWeight: 'bold'}}>Summary:</Text>
              {desc.length == 0 ? (
                <Text style={{alignSelf: 'flex-end'}}>Not Available</Text>
              ) : (
                <Text>
                  {summary}
                  {'\n'}
                </Text>
              )}

              <Text style={{alignSelf: 'center', marginRight: -5}}>Hashes</Text>
              <Divider
                style={{backgroundColor: '#B40404', scaleY: 4, marginRight: -5}}
              />
              {detailsarr1.map((items, key) =>
                key % 2 ? (
                  <View>
                    <Text style={{fontSize: 12}}>
                      {items.replace('\\n', '')}
                    </Text>
                    <Divider />
                  </View>
                ) : (
                  <Text style={{fontWeight: 'bold'}}>
                    {items.replace(/"/g, '')}
                  </Text>
                ),
              )}

              <Portal>
                <Dialog
                  visible={this.state.visible}
                  onDismiss={this._hideDialog}>
                  <Dialog.Title>Download</Dialog.Title>
                  <Divider />
                  <Dialog.Content>
                    <Button
                      onPress={() => this.downloadfunction(dlinks1, ext, 0)}
                      color="#B40404">
                      Gen.lib.rus.ec
                    </Button>
                    <Button
                      onPress={() => this.downloadfunction(dlinks1, ext, 1)}
                      color="#B40404">
                      Libgen.io
                    </Button>
                    <Button
                      disabled={true}
                      onPress={() => this.downloadfunction(dlinks1, ext, 2)}
                      color="#B40404">
                      Libgen.pw
                    </Button>
                  </Dialog.Content>
                </Dialog>
                <Snackbar
                  visible={this.state.visible1}
                  onDismiss={() => this.setState({visible1: false})}
                  style={{backgroundColor: '#8A0808'}}>
                  Download Failed
                </Snackbar>
              </Portal>
            </View>
          </ScrollView>
        )}
      </PaperProvider>
    );
  }
}

export default Fiction1;
