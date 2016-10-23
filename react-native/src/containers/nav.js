/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Login from './login'
import Student from './student/student'
import Admin from './admin/admin'

export const screens = {
  login: 0,
  admin: 1,
  student: 2,
};

export default class Nav extends Component {

  _configureScene(): Object {
    return Navigator.SceneConfigs.PushFromRight;
  }

  _renderScene(route: { id: number }, navigator: any) {
    switch(route.id) {
      case screens.login:
        return (
          <Login navigator={navigator} />
        );
      case screens.student:
        return (
          <Student navigator={navigator} />
        );
      case screens.admin:
        return (
          <Admin navigator={navigator} />
        );
      default:
        return (
          <View />
        );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'tell\nsomebody'}</Text>
        <View style={styles.border}/>
        <Navigator
            configureScene={this._configureScene}
            initialRoute={{id: screens.login}}
            renderScene={this._renderScene.bind(this)}
            style={styles.container} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
  title: {
    marginTop: 20,
    marginBottom: 4,
    marginLeft: 16,
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
});
