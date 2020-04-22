import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Spinner = () => {
  return <ActivityIndicator animating={true} color="#B40404" size={40} style={styles.flexed} />;
};

export const styles = StyleSheet.create({
  flexed: {flex: 1}
});

export default Spinner;
