import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const Spinner = () => {
  // eslint-disable-next-line react-native/no-inline-styles
  return <ActivityIndicator animating={true} color="#B40404" size={40} style={{flex: 1}} />;
};

export default Spinner;
