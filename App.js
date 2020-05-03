import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from './src/Screens/Settings';
import Home from './src/Screens/Home';
import About from './src/Screens/About';
import Downloads from './src/Screens/Downloads';
import Fiction from './src/Screens/Fiction';
import Fiction1 from './src/Screens/Fiction1';
import Comics from './src/Screens/Comics';
import SciTech from './src/Screens/SciTech';
import Scimag from './src/Screens/Scimag';
import Mag from './src/Screens/Mag';
import Mag1 from './src/Screens/Mag1';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Downloads" component={Downloads} />
        <Stack.Screen name="Fiction" component={Fiction} />
        <Stack.Screen name="FictionDetails" component={Fiction1} />
        <Stack.Screen name="Comics" component={Comics} />
        <Stack.Screen name="SciTech" component={SciTech} />
        <Stack.Screen name="Scimag" component={Scimag} />
        <Stack.Screen name="Mag" component={Mag} />
        <Stack.Screen name="MagDetails" component={Mag1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
