import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';


export default class App extends React.Component {
  render(){
  return (
    <AppContainer/>
  )
  }
}
const SwitchNavigator = createSwitchNavigator({
      HomeScreen : {screen : HomeScreen},
     Drawer:{screen: AppDrawerNavigator}
});
var AppContainer = createAppContainer(SwitchNavigator)


