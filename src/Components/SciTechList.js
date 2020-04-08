import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

import KeyValueText from './KeyValueText';

const SciTechList = ({details}) => {
  return details.map((item, key) => (
    <View style={styles.container}>
      <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
        <View style={styles.innerContainer}>
          <KeyValueText keys={'Author       '} value={item[0].replace(/"/g, '')} />
          <KeyValueText
            keys={'Publisher  '}
            value={item[1].replace(/"/g, '').replace(/&amp;/g, '&')}
          />
          <KeyValueText keys={'Language '} value={item[4].replace(/"/g, '')} />

          <View style={styles.details}>
            <KeyValueText keys={'Year'} value={item[2].replace(/"/g, '')} size={13} />
            <KeyValueText keys={'Pages'} value={item[3].replace(/"/g, '')} size={13} />
            <KeyValueText keys={'Size'} value={item[5].replace(/"/g, '')} size={13} />
            <KeyValueText keys={'Extension'} value={item[6].replace(/"/g, '')} size={13} />
          </View>
        </View>
      </TouchableRipple>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {borderBottomWidth: 1, borderBottomColor: '#B40404'},
  innerContainer: {paddingTop: 10, marginHorizontal: 5},
  details: {marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'},
  textHead: {fontWeight: 'bold'},
  textNormal: {fontSize: 12}
});

export default SciTechList;
