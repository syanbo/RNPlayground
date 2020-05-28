import {PixelRatio, Dimensions, Platform, StatusBar} from 'react-native';
import _ from 'lodash';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;

// See https://mydevice.io/devices/ for device dimensions
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const getResolvedDimensions = () => {
  const {width, height} = Dimensions.get('window');
  if (width === 0 && height === 0) return Dimensions.get('screen');
  return {width, height};
};

const {height: D_HEIGHT, width: D_WIDTH} = getResolvedDimensions();

const {width, height} = getResolvedDimensions();

export const screenW = Math.min(width, height);
export const screenH = Math.max(width, height);

export const pixelRatio = PixelRatio.get();
// px转换成dp
// 以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的defaultWidth和defaultHeight为对应尺寸即可. 以下为1倍图时
const defaultWidth = 375;
const defaultHeight = 667;

// 缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH / defaultHeight;

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export const isIphoneX = () => {
  if (Platform.OS === 'web') return false;
  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  );
};

/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleSize(size: Number) {
  if (_.isNumber(size)) {
    return size * _scaleWidth;
  } else {
    return size;
  }
}

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleHeight(size: Number) {
  return size * _scaleHeight;
}

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp ,会随系统缩放比例改变，如不需要请去掉 * fontScale
 */
export function setSpText(size: Number) {
  const scale = Math.min(_scaleWidth, _scaleHeight);
  return size * scale;
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  } else if (Platform.OS === 'ios') {
    return iosStyle;
  } else {
    if (androidStyle) return androidStyle;
    return iosStyle;
  }
}

/**
 * 状态栏高度
 */
export function statusBarHeight() {
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 44;
    }
    return 20;
  } else {
    // 自动获取导航栏高度，官方参考 720 * 1280 尺寸为 48
    return StatusBar.currentHeight;
  }
}

/**
 * 常规导航栏高度（包含状态栏）
 */
export function navigationBarHeight() {
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 88;
    }
    return 64;
  } else {
    return HEADER_HEIGHT;
  }
}
