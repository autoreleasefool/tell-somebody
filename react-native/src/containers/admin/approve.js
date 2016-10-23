/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  LayoutAnimation,
  ListView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {serverUrl} from 'env';
import {retrieveToken} from 'storage';
const MaterialIcons = require('react-native-vector-icons/MaterialIcons');

export default class Resolve extends Component {

  props: {
    navigator: any,
  }

  state: {
    dataSource: ListView.DataSource,
    error: boolean,
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      error: false,
    }
  }

  componentDidMount() {
    this._requestUnresolved();
  }

  _requestUnresolved() {
    fetch(
      serverUrl + '/commendation/unapproved',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
        .then(this._handleResponse.bind(this))
        .catch(this._handleResponse.bind(this));
  }

  _onApprove(commendation: any, index: number) {
    if (commendation.is_approved) {
      return;
    }

    retrieveToken(AsyncStorage)
        .then((token: string) =>
          fetch(
            serverUrl + '/commendation/approve',
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                auth_token: token,
                commendation_id: commendation.id,
              }),
            }
          )
        )
        .then(this._handleVote.bind(this, index))
        .catch(this._handleVote.bind(this, index));
  }

  _handleVote(response: any, index: number) {
    this._requestUnresolved();
  }

  _handleResponse(response) {
    LayoutAnimation.easeInEaseOut();
    if (response != null && response.ok) {
      response.json()
          .then((responseJson: any) => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(responseJson),
            });
          });
    } else {
      this.setState({
        error: true,
      });
    }
  }

  _renderRow(commendation: any, sectionIndex: number, rowIndex: number) {
    let backgroundColor = 'rgba(0,0,0,0)';
    if (rowIndex % 2 === 1) {
      backgroundColor = 'rgba(0,0,0,0.1)';
    }

    return (
      <View style={{backgroundColor: backgroundColor}}>
        <View style={[styles.report, {flexDirection: 'row', alignItems: 'center'}]}>
          <View style={{flex: 1}}>
            <Text style={styles.subtitle}>{'who? '}<Text style={styles.message}>{commendation.receiver_name}</Text></Text>
            <Text style={styles.subtitle}>{'why? '}<Text style={styles.message}>{commendation.message}</Text></Text>
          </View>
          <TouchableOpacity onPress={this._onApprove.bind(this, commendation, rowIndex)}>
            <View style={styles.resolveContainer}>
              <MaterialIcons
                  size={24}
                  color={'rgba(0, 0, 0, 0.5)'}
                  name={'check'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderHeader() {
    return (
      <View>
        <View style={styles.report}>
          <Text style={styles.title}>{'be proud of what your students can accomplish.'}</Text>
          <Text style={styles.title}>{'then, let them be proud.'}</Text>
        </View>
        <View style={styles.thickSeparator} />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
          <View style={styles.button}>
            <MaterialIcons
                size={24}
                name={'arrow-back'}
                style={styles.back}
                color={'white'} />
            <Text style={styles.login}>{'return.'}</Text>
          </View>
        </TouchableOpacity>
        <ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            style={styles.listview}
            renderHeader={this._renderHeader.bind(this)}
            renderRow={this._renderRow.bind(this)} />
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
  button: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 50,
  },
  login: {
    color: 'white',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  report: {
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  thickSeparator: {
    height: 1,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  message: {
    fontWeight: 'normal',
  },
  resolveContainer: {
    marginRight: 16,
    marginLeft: 8,
    alignItems: 'center',
  },
});
