/**
 * Author   : Syan
 * Date     : 2019-08-27
 * Project [ godfrey ] Coded on WebStorm.
 */
import {PixelRatio, Platform, StyleSheet} from 'react-native';
import _ from 'lodash';
import * as screenUtil from './screenUtil';

const {scaleSize, setSpText} = screenUtil;

let hairlineWidth = PixelRatio.roundToNearestPixel(0.4);
if (hairlineWidth === 0) {
  hairlineWidth = 1 / PixelRatio.get();
}
const isAndroid = Platform.OS === 'android';

const absoluteFill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};
if (__DEV__) {
  Object.freeze(absoluteFill);
}

const flattenStyle = style => {
  if (style === null || typeof style !== 'object') {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style;
  }

  const result = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        result[key] = computedStyle[key];
      }
    }
  }
  return result;
};

const getSafeBorderWidth = value => {
  if (isAndroid) {
    return value;
  }
  let round = Math.round(value * PixelRatio.get());
  if (round <= 0) {
    round = 1;
  }
  return round / PixelRatio.get();
};

const transformKeys = [
  'width',
  'height',
  'start',
  'end',
  'top',
  'left',
  'right',
  'bottom',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'margin',
  'marginVertical',
  'marginHorizontal',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginEnd',
  'padding',
  'paddingVertical',
  'paddingHorizontal',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingEnd',
  'borderRadius',
  'borderWidth',
  'borderTopWidth',
  'borderStartWidth',
  'borderEndWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'lineHeight',
  'borderBottomEndRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStartRadius',
  'borderTopEndRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStartRadius',
];

export default {
  hairlineWidth,

  absoluteFill,

  absoluteFillObject: absoluteFill,

  compose: (style1, style2) => {
    if (style1 != null && style2 != null) {
      return [style1, style2];
    } else {
      return style1 != null ? style1 : style2;
    }
  },

  flatten: flattenStyle,

  create: StyleSheet.create(obj => {
    for (const key in obj) {
      const styleObj = obj[key];
      if (styleObj) {
        for (const prop in styleObj) {
          const propObj = styleObj[prop];
          if (_.isObject(propObj) && _.has(propObj, 'value')) {
            styleObj[prop] = propObj.value;
          } else {
            if (propObj) {
              if (transformKeys.some(v => v === prop) && _.isNumber(propObj)) {
                styleObj[prop] = scaleSize(propObj);
              }
              if (key === 'fontSize') {
                styleObj[prop] = setSpText(propObj);
              }
            }
          }
        }
      }
    }
    return obj;
  }),

  ...screenUtil,

  isIOS: Platform.OS === 'ios',
  isAndroid,
  getSafeBorderWidth,
};

export class IgnoreValue {
  constructor(value) {
    this.value = value;
  }
}
