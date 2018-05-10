import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
]);

console.disableYellowBox = true;

AppRegistry.registerComponent('RNPlayground', () => App);
