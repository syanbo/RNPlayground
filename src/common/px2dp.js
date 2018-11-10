/**
 * Author   : Syan
 * Date     : 2018/4/22
 * Project [ RNPlayground ] Coded on WebStorm.
 */
import { Dimensions } from 'react-native';

const basePixelWidth = 375;
const px2dp = px => {
  return (px * Dimensions.get('window').width) / basePixelWidth;
};

export default px2dp;
