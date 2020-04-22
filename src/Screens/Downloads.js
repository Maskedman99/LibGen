import React from 'react';
import {ScrollView} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import NavBar from '../Components/NavBar';

export const Downloads = props => {
  return (
    <PaperProvider>
      <NavBar nav={props.navigation} title={'Downloads'} />
      <ScrollView />
    </PaperProvider>
  );
};

export default Downloads;
