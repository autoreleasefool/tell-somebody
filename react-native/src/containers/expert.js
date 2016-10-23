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

export default class Expert extends Component {

  props: {
    navigator: any,
  }

  state: {
  }

  constructor(props: {}) {
    super(props);
    this.state = {
    }
  }

  _onSubmit() {
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

  render() {
    let form = null;

    if (this.state.submitted) {
      form = this._renderSubmitted();
    } else {
      form = this._renderForm();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
