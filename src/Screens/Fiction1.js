import React, {Component} from 'react';
import axios from 'axios';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  Text,
  Divider,
  Dialog,
  Portal,
  Button,
  Provider as PaperProvider,
  TouchableRipple,
  Snackbar
} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';

var HTMLParser = require('fast-html-parser');

import NavBar from '../Components/Common/NavBar';
import Spinner from '../Components/Common/Spinner';
import LoadingImage from '../Components/Common/LoadingImage';

class Fiction1 extends Component {
  state = {
    Title: this.props.navigation.getParam('title', ''),
    Author: this.props.navigation.getParam('author', ''),
    flag: 0,
    root: '',
    md5: '',
    id: '',
    imglink: '',
    summary: '',
    ext: '',
    dlinks1: [],
    detailsarr: [],
    detailsarr1: [],
    loading: true,
    loading1: true,
    visible: false,
    visible1: false
  };
  _hideDialog = () => this.setState({visible: false});

  downloadfunction(downlinks, extension, i) {
    var downurl = downlinks[i].replace(/"/g, '').replace('\\', '');
    extension = extension.toLowerCase();

    if (i === 0) {
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
        description: 'Downloading file.'
      }
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
    let url = `http://gen.lib.rus.ec${this.props.navigation
      .getParam('link', '')
      .replace(/"/g, '')}`;
    axios
      .get(url)
      .then(data => {
        let root = HTMLParser.parse(data.data);
        var rows = root.querySelectorAll('tr');
        var desc = root.querySelectorAll('.description');
        var imgrows = root.querySelectorAll('.record_side');
        var dlinks = root.querySelectorAll('.record_mirrors');

        // Image link Parsing------------------------------------------------------------------------------
        var imglink = JSON.stringify(imgrows[0].childNodes[1].rawAttrs)
          .split('\\')[1]
          .replace('"', '');

        //Summary Parsing----------------------------------------------------------------------------------
        var summary =
          desc.length !== 0 ? JSON.stringify(desc[0].rawText).replace('"SUMMARY:', '') : '';

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
                .replace(/&nbsp;/g, ' ')
            );
        }
        var detailsarr = details.split('\\t');

        for (let i = 0; i < detailsarr.length; i++) {
          if (detailsarr[i] === '' || detailsarr[i] === '\\n') {
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
            id: detailsarr[detailsarr.length - 3]
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
          dlinks1[i] = JSON.stringify(dlinks0[i].childNodes[0].rawAttrs.replace('href="', ''));
        }

        this.setState({
          imglink: imglink,
          summary: summary,
          ext: ext,
          dlinks1: dlinks1,
          detailsarr: detailsarr,
          detailsarr1: detailsarr1,
          loading: false
        });
      })
      .catch(err => alert(err));
  }

  render() {
    return (
      <PaperProvider>
        <NavBar nav={this.props.navigation} title={this.state.Title} subtitle={this.state.Author} />
        {this.state.loading ? (
          <Spinner />
        ) : (
          <ScrollView style={styles.container}>
            <LoadingImage imageUrl={this.state.imglink} />

            <View>
              {this.state.detailsarr.map((items, key) =>
                key % 2 ? (
                  <View>
                    <Text style={styles.textValue}>{items.replace('\\n', '')}</Text>
                    <Divider />
                  </View>
                ) : (
                  <Text style={styles.textKey}>{items.replace(/"/g, '')}</Text>
                )
              )}
              <TouchableRipple onPress={() => this.setState({visible: true})} rippleColor="#B40404">
                <Text style={styles.downloadText}>Download</Text>
              </TouchableRipple>
              <Divider />

              <Text style={styles.textKey}>Summary:</Text>
              {this.state.summary === '' ? (
                <Text style={styles.textValue}>Not Available</Text>
              ) : (
                <Text style={styles.textValue}>{this.state.summary}</Text>
              )}

              <Text style={styles.textHash}>Hashes</Text>
              <Divider style={{backgroundColor: '#B40404', scaleY: 4, marginRight: -5}} />
              {this.state.detailsarr1.map((items, key) =>
                key % 2 ? (
                  <View>
                    <Text style={{fontSize: 12}}>{items.replace('\\n', '')}</Text>
                    <Divider />
                  </View>
                ) : (
                  <Text style={styles.textKey}>{items.replace(/"/g, '')}</Text>
                )
              )}

              <Portal>
                <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
                  <Dialog.Title>Download</Dialog.Title>
                  <Divider />
                  <Dialog.Content>
                    <Button
                      onPress={() => this.downloadfunction(this.state.dlinks1, this.state.ext, 0)}
                      color="#B40404">
                      Gen.lib.rus.ec
                    </Button>
                    <Button
                      onPress={() => this.downloadfunction(this.state.dlinks1, this.state.ext, 1)}
                      color="#B40404">
                      Libgen.lc
                    </Button>
                    <Button
                      disabled={true}
                      onPress={() => this.downloadfunction(this.state.dlinks1, this.state.ext, 2)}
                      color="#B40404">
                      Z-Library
                    </Button>
                  </Dialog.Content>
                </Dialog>
                <Snackbar
                  visible={this.state.visible1}
                  onDismiss={() => this.setState({visible1: false})}
                  style={styles.failedSnackbar}>
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

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  imgContainer: {
    width: 243,
    height: 363,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B40404'
  },
  downloadText: {
    fontWeight: 'bold',
    marginRight: -5,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontSize: 16,
    paddingVertical: 20
  },
  failedSnackbar: {backgroundColor: '#8A0808'},
  textKey: {fontWeight: 'bold'},
  textValue: {alignSelf: 'flex-end'},
  textHash: {textAlign: 'center', paddingTop: 5, fontWeight: 'bold'}
});

export default Fiction1;
