import React from 'react';
import {Text, TouchableRipple} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const MagList = ({data, links, nav}) => {
  return data.map((item, key) => (
    <View style={styles.container}>
      <TouchableRipple
        rippleColor="#B40404"
        onPress={() =>
          nav.navigate('Mag1Screen', {
            link: links[key],
            title: item
          })
        }>
        <View>
          <View style={styles.title}>
            <Text style={styles.textHead}>{item}</Text>
          </View>
          <View style={styles.index}>
            <Text style={styles.textHead}>{key + 1}</Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {borderBottomWidth: 1, borderBottomColor: '#B40404'},
  title: {marginBottom: 10, paddingLeft: 5},
  textHead: {fontWeight: 'bold', fontSize: 14, marginLeft: 5},
  index: {alignItems: 'flex-end', marginRight: 10}
});

export default MagList;
