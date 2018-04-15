/**
 * Author   : Syan
 * Date     : 2018/4/15
 * Project [ RNPlayground ] Coded on WebStorm.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CIcon from '../../components/IconFont';
import { observer, inject } from 'mobx-react';
import Config from '../../common/config';
import ShadowView from 'react-native-shadow-view';

@inject('user')
@observer
export default class index extends React.Component {
  render() {
    console.log(Platform.Version);
    return (
      <View style={styles.container}>
        <Icon name="rocket" size={30} color="#900" />
        <CIcon.Button name="play" size={30} color="#FFF" style={styles.button}>
          自定义 IconFont
        </CIcon.Button>
        <CIcon name={'yes'} size={30} color={'red'} />
        <Text>Hello Mobx {this.props.user.age}</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.user.updateAge(this.props.user.age + 1);
          }}
        >
          <Text style={styles.welcome}>修改 age</Text>
        </TouchableOpacity>
        <Text>{Config.HOST_TITLE}</Text>
        <Shadow style={{ backgroundColor: '#fff' }} />
      </View>
    );
  }
}

class Shadow extends React.PureComponent {
  /**
   * PureComponent 使用注意
   * 当有深层次的props赋值的时候
   * 需要自己控制shouldComponentUpdate
   */
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  render() {
    const { style } = this.props;
    return (
      <ShadowView style={[styles.shadow, style]}>
        <Text>阴影</Text>
      </ShadowView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    backgroundColor: 'red'
  },
  shadow: {
    marginTop: 10,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'red',
    shadowOffset: {
      x: 0,
      y: 0
    },
    shadowOpacity: 0.12,
    shadowRadius: 6
  }
});
