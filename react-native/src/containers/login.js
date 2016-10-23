/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import {serverUrl} from 'env';
import {storeToken, storeId} from 'storage';
import {screens} from './nav';

const NONE = 0;
const LOGIN = 1;
const SIGNUP = 2;


export default class Login extends Component {

  props: {
    navigator: any,
  }

  state: {
    username: string,
    password: string,
    optionSelected: number,
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      optionSelected: NONE,
      username: '',
      password: '',
    }
  }

  isAdmin: boolean = false;

  _onSubmit(endpoint: string) {
    if (endpoint === 'new') {
      this.refs.SignupUsername.blur();
      this.refs.SignupPassword.blur();
    } else {
      this.refs.LoginUsername.blur();
      this.refs.LoginPassword.blur();
    }

    const username = this.state.username;
    const password = this.state.password;

    fetch(
      serverUrl + '/user/' + endpoint,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.username,
          password: this.state.password,
        })
      }
    )
        .then(this._handleResponse.bind(this))
        .catch((err: any) => console.error(err));
  }

  _handleResponse(response) {
    if (response.ok) {
      response.json()
          .then((responseJson) => {
            this.setState({
              username: '',
              password: '',
            });
            this.isAdmin = responseJson.is_admin;
            storeId(AsyncStorage, responseJson.id);
            storeToken(AsyncStorage, responseJson.auth_token);
          })
          .then(() => {
            this.props.navigator.push({id: this.isAdmin ? screens.admin : screens.student});
          });
    } else {
      this.setState({
        password: '',
      });
    }
  }

  _onSelectOption(option: number) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      optionSelected: option,
      username: '',
      password: '',
    });
  }

  _renderLogin() {
    return (
      <View>
        <TextInput
            underlineColorAndroid={'rgba(0,0,0,0)'}
            ref='LoginUsername'
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'username'}
            style={styles.input}
            value={this.state.username}
            onChangeText={(text: string) => this.setState({username: text})} />
        <TextInput
            underlineColorAndroid={'rgba(0,0,0,0)'}
            ref='LoginPassword'
            autoCapitalize={'none'}
            placeholder={'password'}
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
            onChangeText={(text: string) => this.setState({password: text})} />
        <TouchableOpacity onPress={this._onSubmit.bind(this, 'login')}>
          <View style={styles.button}>
            <Text style={styles.login}>{'login.'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onSelectOption.bind(this, NONE)}>
          <View style={styles.button}>
            <Text style={styles.login}>{'cancel.'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderSignup() {
    return (
      <View>
        <TextInput
            underlineColorAndroid={'rgba(0,0,0,0)'}
            ref='SignupUsername'
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'username'}
            style={styles.input}
            value={this.state.username}
            onChangeText={(text: string) => this.setState({username: text})} />
        <TextInput
            underlineColorAndroid={'rgba(0,0,0,0)'}
            ref='SignupPassword'
            autoCapitalize={'none'}
            placeholder={'password'}
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
            onChangeText={(text: string) => this.setState({password: text})} />
        <TouchableOpacity onPress={this._onSubmit.bind(this, 'new')}>
          <View style={styles.button}>
            <Text style={styles.login}>{'signup.'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onSelectOption.bind(this, NONE)}>
          <View style={styles.button}>
            <Text style={styles.login}>{'cancel.'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderOptions() {
    return (
      <View>
        <TouchableOpacity onPress={this._onSelectOption.bind(this, LOGIN)}>
          <View style={styles.button}>
            <Text style={styles.login}>{'login.'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onSelectOption.bind(this, SIGNUP)}>
          <View style={styles.button}>
            <Text style={styles.login}>{'signup.'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let form = null;

    switch (this.state.optionSelected) {
      case NONE:
        form = this._renderOptions();
        break;
      case LOGIN:
        form = this._renderLogin();
        break;
      case SIGNUP:
        form = this._renderSignup();
        break;
    }

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.container} />
          {form}
          <View style={styles.container} />
          <KeyboardSpacer />
        </View>
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
  input: {
    paddingLeft: 8,
    marginTop: elementMargins,
    marginBottom: elementMargins,
    fontSize: 16,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  login: {
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
