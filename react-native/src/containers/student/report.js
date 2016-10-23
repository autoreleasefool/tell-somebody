/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import {serverUrl} from 'env';
import {retrieveToken} from 'storage';
import {screens} from './student';
const MaterialIcons = require('react-native-vector-icons/MaterialIcons');

export default class Report extends Component {

  props: {
    navigator: any,
  }

  state: {
    submitted: boolean,
    message: string,
    offenderName: string,
    loaded: boolean,
    isAnonymous: boolean,
    error: boolean,
    enableButton: boolean,
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      submitted: false,
      message: '',
      offenderName: '',
      loaded: false,
      isAnonymous: true,
      error: false,
      enableButton: true,
    }
  }

  _onSubmit() {
    if (!this.state.enableButton) {
      return;
    }

    this.setState({
      enableButton: false,
    });

    const message = this.state.message;
    const offenderName = this.state.offenderName;
    const isAnonymous = this.state.isAnonymous;

    retrieveToken(AsyncStorage)
        .then((token: string) =>
          fetch(
            serverUrl + '/report/new',
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                auth_token: token,
                message: message,
                offender_name: offenderName,
                is_anonymous: isAnonymous,
              })
            }
          )
        )
        .then(this._handleResponse.bind(this))
        .catch(this._handleResponse.bind(this));
  }

  _handleResponse(response) {
    LayoutAnimation.easeInEaseOut();
    if (response != null && response.ok) {
      this.setState({
        submitted: true,
      });
    } else {
      this.setState({
        enableButton: true,
        error: true,
      });
    }
  }

  _renderSubmitted() {
    return (
      <View>
        <Text style={styles.text}>{'congratulations.'}</Text>
        <Text style={styles.text}>{'taking the first step is always the hardest part.'}</Text>
        <Text style={styles.text}>{'you\'ll hear back soon.'}</Text>
        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
          <View style={styles.button}>
            <Text style={styles.login}>{'return.'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _renderForm() {
    return (
      <View>
        <TextInput
            autoCapitalize={'words'}
            placeholder={'name of the offender'}
            style={styles.input}
            value={this.state.offenderName}
            onChangeText={(text: string) => this.setState({offenderName: text})} />
        <TextInput
            placeholder={'the incident'}
            style={styles.multilineInput}
            multiline={true}
            value={this.state.message}
            onChangeText={(text: string) => this.setState({message: text})} />
        <View style={styles.switch}>
          <Switch
              value={this.state.isAnonymous}
              onValueChange={(value: boolean) => this.setState({isAnonymous: value})} />
          <Text style={styles.switchText}>{'report anonymously?'}</Text>
        </View>
        <TouchableOpacity onPress={this._onSubmit.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.login}>{'submit.'}</Text>
          </View>
        </TouchableOpacity>

        {this.state.error
          ? <View style={[styles.button, styles.redButton]}>
              <Text style={[styles.login, {fontWeight: 'normal'}]}>{'there was an error submitting your report. please, try again later.'}</Text>
            </View>
          : null
        }
      </View>
    );
  }

  render() {
    let form = null;

    if (this.state.submitted) {
      form = this._renderSubmitted();
    } else {
      form = this._renderForm();
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
          <View style={styles.cancelButton}>
            <MaterialIcons
                size={24}
                name={'arrow-back'}
                style={styles.back}
                color={'white'} />
            <Text style={styles.cancel}>{'return.'}</Text>
          </View>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    margin: 16,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: elementMargins,
    marginBottom: elementMargins,
  },
  switchText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 8,
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginTop: elementMargins,
    marginBottom: elementMargins,
    height: 40,
  },
  redButton: {
    height: 50,
    backgroundColor: '#a94442',
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
  multilineInput: {
    paddingLeft: 8,
    marginTop: elementMargins,
    marginBottom: elementMargins,
    fontSize: 16,
    height: 90,
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
