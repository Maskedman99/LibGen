import React from 'react';
import {ScrollView} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import NavBar from '../Components/Common/NavBar';

export const Downloads = () => {
  return (
    <PaperProvider>
      <NavBar title={'Downloads'} />
      <ScrollView />
    </PaperProvider>
  );
};

export default Downloads;
