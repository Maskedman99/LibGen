import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import Spinner from '../Components/Spinner';
import NavBar from '../Components/NavBar';

export const Mag1 = ({navigation}) => {
  const [loading] = useState(true);
  return (
    <PaperProvider>
      <NavBar nav={navigation} title={navigation.getParam('title', '')} />
      {loading ? (
        <Spinner />
      ) : (
        <View>
          <ScrollView />
        </View>
      )}
    </PaperProvider>
  );
};

export default Mag1;
