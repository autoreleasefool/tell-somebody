/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MaterialIcons = require('react-native-vector-icons/MaterialIcons');
import Board from '../common/board';
import Resolve from './resolve';
import Approve from './approve';

export const screens = {
  options: 0,
  resolve: 1,
  approve: 2,
  board: 3,
};

export default class Admin extends Component {

  _configureScene(): Object {
    return Navigator.SceneConfigs.PushFromRight;
  }

  _switchScene(scene: number) {
    this.refs.Navigator.push({id: scene});
  }

  _renderOptions() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
          <View style={styles.cancelButton}>
            <MaterialIcons
                size={24}
                name={'arrow-back'}
                style={styles.back}
                color={'white'} />
            <Text style={styles.cancel}>{'logout.'}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={{flex: 1, justifyContent: 'space-around'}}>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.body}>{'listen to what students have to say. it takes a lot of courage to come forward, now it\'s your turn to respond.'}</Text>
              <TouchableOpacity onPress={this._switchScene.bind(this, screens.resolve)}>
                <View style={styles.button}>
                  <Text style={styles.login}>{'review.'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.body}>{'your students want to know they\'re making a difference to somebody. see if anybody has been commended for their efforts.'}</Text>
              <TouchableOpacity onPress={this._switchScene.bind(this, screens.approve)}>
                <View style={styles.button}>
                  <Text style={styles.login}>{'approve.'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.body}>{'see how your students are making a difference.'}</Text>
              <TouchableOpacity onPress={this._switchScene.bind(this, screens.board)}>
                <View style={styles.button}>
                  <Text style={styles.login}>{'view the board.'}</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    );
  }

  _renderScene(route: { id: number }, navigator: any) {
    switch(route.id) {
      case screens.board:
        return (
          <Board navigator={navigator} />
        );
      case screens.options:
        return this._renderOptions();
      case screens.resolve:
        return (
          <Resolve navigator={navigator} />
        );
      case screens.approve:
        return (
          <Approve navigator={navigator} />
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
        <Navigator
            configureScene={this._configureScene}
            initialRoute={{id: screens.options}}
            ref='Navigator'
            renderScene={this._renderScene.bind(this)}
            style={styles.container} />
      </View>
    );
  }
}

const elementMargins = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 16,
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginTop: elementMargins,
    marginBottom: elementMargins,
    height: 40,
  },
  login: {
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: elementMargins * 2,
  },
  body: {
    marginLeft: elementMargins * 2,
    marginTop: elementMargins,
    marginBottom: elementMargins,
    color: 'black',
    textAlign: 'left',
    fontSize: 16,
  },
  title: {
    marginTop: elementMargins,
    marginBottom: elementMargins,
    color: 'black',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  back: {
    margin: 8,
  },
  cancel: {
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 50,
  },
});
