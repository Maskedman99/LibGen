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
  HomeScreen: {screen: Home, navigationOptions: {header: null}},

  SettingScreen: {screen: Settings, navigationOptions: {header: null}},

  AboutScreen: {screen: About, navigationOptions: {header: null}},

  DownloadsScreen: {screen: Downloads, navigationOptions: {header: null}},

  FictionScreen: {screen: Fiction, navigationOptions: {header: null}},

  Fiction1Screen: {screen: Fiction1, navigationOptions: {header: null}},

  ComicsScreen: {screen: Comics, navigationOptions: {header: null}},

  SciTechScreen: {screen: SciTech, navigationOptions: {header: null}},

  ScimagScreen: {screen: Scimag, navigationOptions: {header: null}},

  MagScreen: {screen: Mag, navigationOptions: {header: null}},

  Mag1Screen: {screen: Mag1, navigationOptions: {header: null}},
});

const App = createAppContainer(AppNavigator);

export default App;
