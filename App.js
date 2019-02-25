import { createStackNavigator, createAppContainer } from 'react-navigation';

import Settings from './Screens/Settings';
import Home from './Screens/Home';
import About from './Screens/About';
import Downloads from './Screens/Downloads';
import Fiction from './Screens/Fiction';
import Comics from './Screens/Comics';

const AppNavigator = createStackNavigator({

  HomeScreen: { screen: Home, navigationOptions: {header: null, },},

  SettingScreen: { screen: Settings, navigationOptions: {header: null},},

  AboutScreen: { screen: About, navigationOptions:  {header: null},},

  DownloadsScreen: { screen: Downloads, navigationOptions: {header: null, },},

  FictionScreen: { screen: Fiction, navigationOptions: {header: null},},

  ComicsScreen: {screen: Comics, navigationOptions: {header: null},},

})

const App = createAppContainer(AppNavigator);

export default App;