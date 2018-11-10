/**
 * Author   : Syan
 * Date     : 2018/4/15
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import { createIconSet } from 'react-native-vector-icons';

const glyphMap = {
  play: 58932,
  error_image: 58939,
  yes: 58938,
};

const iconSet = createIconSet(glyphMap, 'IconFont', 'iconfont.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;
