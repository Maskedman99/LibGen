import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import KeyValueText from '../Components/KeyValueText';

const FictionDisplay = ({T, S, A, F, Li, La, nav}) => {
  return T.map((item, key) => (
    <TouchableRipple
      style={styles.container}
      onPress={() =>
        nav.navigate('Fiction1Screen', {
          link: Li[key],
          title: S[key].replace(/"/g, ''),
          author: A[key].replace(/"/g, '')
        })
      }
      rippleColor="#B40404">
      <View style={styles.innerContainer}>
        <KeyValueText Key={'Title                '} Value={item.replace(/"/g, '')} />
        <KeyValueText Key={'Series            '} Value={S[key].replace(/"/g, '')} />
        <KeyValueText Key={'Author           '} Value={A[key].replace(/"/g, '')} />
        <KeyValueText Key={'File                 '} Value={F[key].replace(/"/g, '')} />
        <KeyValueText Key={'Language     '} Value={La[key].replace(/"/g, '')} />
      </View>
    </TouchableRipple>
  ));
};

const styles = StyleSheet.create({
  innerContainer: {paddingBottom: 5, paddingLeft: 5},
  container: {borderBottomWidth: 1, borderBottomColor: '#B40404'}
});

export default FictionDisplay;
