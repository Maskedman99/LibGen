import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

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

const AppNavigator = createStackNavigator({
  HomeScreen: {screen: Home, navigationOptions: {headerShown: false}},

  SettingScreen: {screen: Settings, navigationOptions: {headerShown: false}},

  AboutScreen: {screen: About, navigationOptions: {headerShown: false}},

  DownloadsScreen: {screen: Downloads, navigationOptions: {headerShown: false}},

  FictionScreen: {screen: Fiction, navigationOptions: {headerShown: false}},

  Fiction1Screen: {screen: Fiction1, navigationOptions: {headerShown: false}},

  ComicsScreen: {screen: Comics, navigationOptions: {headerShown: false}},

  SciTechScreen: {screen: SciTech, navigationOptions: {headerShown: false}},

  ScimagScreen: {screen: Scimag, navigationOptions: {headerShown: false}},

  MagScreen: {screen: Mag, navigationOptions: {headerShown: false}},

  Mag1Screen: {screen: Mag1, navigationOptions: {headerShown: false}},
});

const App = createAppContainer(AppNavigator);

export default App;
