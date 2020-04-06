import React from 'react';
import {Text, TouchableRipple} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const SciTechList = ({details}) => {
  return details.map((item, key) => (
    <View style={styles.container}>
      <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="#B40404">
        <View>
          <Text>
            <Text style={styles.textHead}>Author:{'\t\t\t\t\t\t\t\t'}</Text>
            {item[0].replace(/"/g, '')}
            {'\n'}
            <Text style={styles.textHead}>Publisher:{'\t\t\t\t\t\t'}</Text>
            {item[1].replace(/"/g, '').replace(/&amp;/g, '&')}
            {'\n'}
            <Text style={styles.textHead}>Language:{'\t\t\t\t\t'}</Text>
            {item[4].replace(/"/g, '')}
          </Text>

          <Text style={styles.textNormal}>
            <Text style={styles.textHead}>
              {'\n'}Year:{'\t\t'}
            </Text>
            {item[2].replace(/"/g, '')}
            {'\t\t'}
            <Text style={styles.textHead}>Pages:{'\t\t'}</Text>
            {item[3].replace(/"/g, '')}
            {'\t\t'}
            <Text style={styles.textHead}>Size:{'\t\t'}</Text>
            {item[5].replace(/"/g, '')}
            {'\t\t'}
            <Text style={styles.textHead}>Extension:{'\t\t'}</Text>
            {item[6].replace(/"/g, '')}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {borderBottomWidth: 1, borderBottomColor: '#B40404'},
  textHead: {fontWeight: 'bold'},
  index: {alignItems: 'flex-end', marginRight: 10},
  textNormal: {fontSize: 12}
});

export default SciTechList;
