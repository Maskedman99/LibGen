import React from 'react';
import {ScrollView} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import NavBar from '../Components/Common/NavBar';

export const Downloads = ({navigation}) => {
  return (
    <PaperProvider>
      <NavBar nav={navigation} title={'Downloads'} />
      <ScrollView />
    </PaperProvider>
  );
};

export default Downloads;
