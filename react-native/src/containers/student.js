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

import Report from './report';
import Commend from './commend';
import Board from './board';

export const screens = {
  options: 0,
  report: 1,
  commend: 2,
  expert: 3,
  board: 4,
};

export default class Student extends Component {

  _configureScene(): Object {
    return Navigator.SceneConfigs.PushFromRight;
  }

  _switchScene(scene: number) {
    this.refs.Navigator.push({id: scene});
  }

  _renderOptions() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={{flex: 1, justifyContent: 'space-around'}}>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.body}>{'are you, or is someone you know being harassed?'}</Text>
              <TouchableOpacity onPress={this._switchScene.bind(this, screens.report)}>
                <View style={styles.button}>
                  <Text style={styles.login}>{'report it.'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.body}>{'did you see someone standing up for another, or supporting a peer?'}</Text>
              <TouchableOpacity onPress={this._switchScene.bind(this, screens.commend)}>
                <View style={styles.button}>
                  <Text style={styles.login}>{'commend them.'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.body}>{'do you think your friends might be taking the jokes too far?'}</Text>
              <TouchableOpacity onPress={this._switchScene.bind(this, screens.expert)}>
                <View style={styles.button}>
                  <Text style={styles.login}>{'ask an expert.'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.body}>{'see how your peers are making a difference.'}</Text>
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
      case screens.options:
        return this._renderOptions();
      case screens.report:
        return (
          <Report navigator={navigator} />
        );
      case screens.commend:
        return (
          <Commend navigator={navigator} />
        );
      case screens.board:
        return (
          <Board navigator={navigator} />
        );
      default:
        return (
          <View />
        );
    }
  }

  render() {
    return (
      <Navigator
          configureScene={this._configureScene}
          initialRoute={{id: screens.options}}
          ref='Navigator'
          renderScene={this._renderScene.bind(this)}
          style={styles.container} />
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
});
