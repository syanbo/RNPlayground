/**
 * Author   : Syan
 * Date     : 2018/4/22
 * Project [ RNPlayground ] Coded on WebStorm.
 */
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import uuid from 'uuid/v4';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
export default class LoaderImage extends PureComponent {
  static propTypes = {
    /**
     * 是否使用缓存
     */
    noCache: PropTypes.bool,
    ...FastImage.propTypes
  };

  constructor(props) {
    super(props);
    this.state = {
      intensity: new Animated.Value(0.1)
    };
  }

  onLoadEnd = () => {
    const { intensity } = this.state;
    Animated.timing(intensity, {
      duration: 500,
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  /**
   * 不使用缓存
   */
  bustCache = url => {
    const bust = `?bust=${uuid()}`;
    return url + bust;
  };

  render() {
    const { intensity } = this.state;
    const { noCache, style, children, ...fastProps } = this.props;

    let source = fastProps.source;
    if (noCache) {
      source.uri = this.bustCache(fastProps.source.uri);
    }
    return (
      <AnimatedFastImage
        style={[style, { opacity: intensity }]}
        source={source}
        onLoadEnd={this.onLoadEnd}
        {...fastProps}
      >
        {children}
      </AnimatedFastImage>
    );
  }
}
