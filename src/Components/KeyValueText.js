import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const KeyValueText = ({Key, Value, size}) => {
  return (
    <View style={styles.container}>
      <View style={styles.keyView}>
        <Text style={[styles.keyStyle, {fontSize: size}]}>
          {Key}:{'\t\t'}
        </Text>
      </View>
      <Text style={{fontSize: size}}>{Value}</Text>
    </View>
  );
};

KeyValueText.defaultProps = {
  size: 14
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'flex-start'},
  keyStyle: {fontWeight: 'bold'}
});

export default KeyValueText;
