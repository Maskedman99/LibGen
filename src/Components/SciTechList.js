import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

import KeyValueText from './Common/KeyValueText';

const SciTechList = ({details}) => {
  return details.map((item, key) => (
    <View style={styles.container}>
      <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
        <View style={styles.innerContainer}>
          <KeyValueText Key={'Author       '} Value={item[0].replace(/"/g, '')} />
          <KeyValueText
            Key={'Publisher  '}
            Value={item[1].replace(/"/g, '').replace(/&amp;/g, '&')}
          />
          <KeyValueText Key={'Language '} Value={item[4].replace(/"/g, '')} />

          <View style={styles.details}>
            <KeyValueText Key={'Year'} Value={item[2].replace(/"/g, '')} size={13} />
            <KeyValueText Key={'Pages'} Value={item[3].replace(/"/g, '')} size={13} />
            <KeyValueText Key={'Size'} Value={item[5].replace(/"/g, '')} size={13} />
            <KeyValueText Key={'Extension'} Value={item[6].replace(/"/g, '')} size={13} />
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
