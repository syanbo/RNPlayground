/**
 * Author   : Syan
 * Date     : 2020/5/28
 * Project [ RNPlayground ] Coded on WebStorm.
 */
import {NativeModules, Platform} from 'react-native';

const {RNPBridgeBase} = NativeModules;

const APP_ENV = RNPBridgeBase.APP_ENV;

const envDic = Platform.select({
  ios: {
    1: 'debug',
    2: 'staging',
    3: 'production',
  },
  android: {
    debug: 'debug',
    releaseStaging: 'staging',
    release: 'production',
  },
});

const appEnv = envDic[APP_ENV] || 'production';

export default {
  appEnv,
  isDebug: appEnv === 'debug',
  isStaging: appEnv === 'staging',
  isProd: appEnv === 'production',
};
