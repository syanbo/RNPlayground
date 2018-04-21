/**
 * Author   : Syan
 * Date     : 2018/1/16
 * Project [ yiautoUnion ] Coded on WebStorm.
 * 全局样式相关的常量与判断
 */

import {
  Dimensions,
  Platform,
  PixelRatio,
  StyleSheet,
  DeviceInfo,
  NativeModules,
  StatusBar
} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const { PlatformConstants = {} } = NativeModules;
const { minor = 0 } = PlatformConstants.reactNativeVersion || {};

const isIPhoneX = (() => {
  if (Platform.OS === 'web') return false;

  if (minor >= 50) {
    return DeviceInfo.isIPhoneX_deprecated;
  }

  return (
    Platform.OS === 'ios' &&
    ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
      (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
  );
})();

const statusBarHeight = (() => {
  if (isIPhoneX) {
    return 44;
  }
  if (Platform.OS === 'android') {
    if (Platform.Version < 19) return 0;
    return StatusBar.currentHeight;
  }
  return 20;
})();

const { width, height } = Dimensions.get('window');

// iOS 文字
export const sanFranciscoWeights = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400',
    backgroundColor: 'transparent'
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '600',
    backgroundColor: 'transparent'
  },
  semibold: {
    fontFamily: 'System',
    fontWeight: '700',
    backgroundColor: 'transparent'
  }
};

// Android 文字
export const robotoWeights = {
  regular: {
    includeFontPadding: false,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    backgroundColor: 'transparent'
  },
  medium: {
    includeFontPadding: false,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'normal',
    backgroundColor: 'transparent'
  },
  semibold: {
    includeFontPadding: false,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  }
};

export default {
  isIOS: Platform.OS === 'ios',
  isANDROID: Platform.OS === 'android',
  pixelRation: PixelRatio.get(),
  pixel1: 1 / PixelRatio.get(),
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  hairlineWidth: StyleSheet.hairlineWidth,
  isIPhoneX,
  statusBarHeight,

  baseColor: '#E6C3A1', // 主色
  minorColor: '#CB8F5C', // 副色
  grayColor: '#CCCCCC',
  darkGreyColor: '#AAAAAA',
  warnColor: '#FF7E73', // 警告色
  bgColor: '#FAFAFA', // 详情页面的背景色

  black12: 'rgba(0,0,0,0.12)',
  black26: 'rgba(0,0,0,0.26)',
  black56: 'rgba(0,0,0,0.56)',
  black87: 'rgba(0,0,0,0.87)',

  black30: 'rgba(0,0,0,0.3)',
  black70: 'rgba(0,0,0,0.7)',
  black: 'rgba(0,0,0,1)',

  transparent: 'transparent',

  shadowStyle: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12
      },
      android: {
        elevation: 4
      }
    })
  },

  select: Platform.select,

  Regular:
    Platform.OS === 'ios' ? sanFranciscoWeights.regular : robotoWeights.regular,
  Medium:
    Platform.OS === 'ios' ? sanFranciscoWeights.medium : robotoWeights.medium,
  Semibold:
    Platform.OS === 'ios'
      ? sanFranciscoWeights.semibold
      : robotoWeights.semibold
};
