import { createStackNavigator, createAppContainer } from 'react-navigation';

import Settings from './Screens/Settings';
import Home from './Screens/Home';
import About from './Screens/About';
import Downloads from './Screens/Downloads';
import Fiction from './Screens/Fiction'; 
import Fiction1 from './Screens/Fiction1';
import Comics from './Screens/Comics';
import SciTech from './Screens/SciTech';
import Scimag from './Screens/Scimag';
import Mag from './Screens/Mag';

const AppNavigator = createStackNavigator({

  HomeScreen: { screen: Home, navigationOptions: {header: null, },},

  SettingScreen: { screen: Settings, navigationOptions: {header: null},},

  AboutScreen: { screen: About, navigationOptions:  {header: null},},

  DownloadsScreen: { screen: Downloads, navigationOptions: {header: null, },},

  FictionScreen: { screen: Fiction, navigationOptions: {header: null},},

  Fiction1Screen: { screen: Fiction1, navigationOptions: {header: null},},

  ComicsScreen: {screen: Comics, navigationOptions: {header: null},},

  SciTechScreen: {screen: SciTech, navigationOptions: {header: null}},

  ScimagScreen: {screen: Scimag, navigationOptions: {header: null}},

  MagScreen: {screen: Mag, navigationOptions: {header: null},},

})

const App = createAppContainer(AppNavigator);

export default App;