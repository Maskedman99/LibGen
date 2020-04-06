import React from 'react';
import {Text, TouchableRipple} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const MagList = ({data, links}) => {
  return data.map((item, key) => (
    <View style={styles.container}>
      <TouchableRipple
        rippleColor="#B40404"
        onPress={() =>
          this.props.navigation.navigate('Mag1Screen', {
            link: links[key],
            title: item.replace(/"/g, '')
          })
        }>
        <View>
          <Text>
            <Text style={styles.textHead}>
              {item.replace(/"/g, '')}
              {'\n'}
            </Text>
          </Text>
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
  textHead: {fontWeight: 'bold', fontSize: 14},
  index: {alignItems: 'flex-end', marginRight: 10}
});

export default MagList;
