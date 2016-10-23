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
import {retrieveToken, retrieveId} from 'storage';
const MaterialIcons = require('react-native-vector-icons/MaterialIcons');

export default class Board extends Component {

  props: {
    navigator: any,
  }

  state: {
    dataSource: ListView.DataSource,
    voted: Array < boolean >,
    error: boolean,
    errorIndex: number,
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      voted: [],
      error: false,
      errorIndex: -1,
    }
  }

  componentDidMount() {
    retrieveId(AsyncStorage)
        .then((id: string) => {
          this.userId = (id == null) ? 0 : parseInt(id);
        })
        .then(() =>
          fetch(
            serverUrl + '/commendation/approved',
            {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }
          )
        )
        .then(this._handleResponse.bind(this))
        .catch(this._handleResponse.bind(this));
  }

  commendations: Array < Object >;

  userId: number;

  _onVote(commendation: any, index: number) {
    if (this.state.voted[index]) {
      return;
    }

    const updatedVotes = this.state.voted.splice(0);
    updatedVotes[index] = true;

    this.commendations = this.commendations.splice(0);
    if (this.commendations[index].votes == null) {
      this.commendations[index].votes = [];
    }
    this.commendations[index].votes.push(0);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.commendations),
      voted: updatedVotes,
      error: false,
    });

    retrieveToken(AsyncStorage)
        .then((token: string) =>
          fetch(
            serverUrl + '/commendation/vote',
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
    if (response == null || !response.ok) {
      const updatedVotes = this.state.voted.splice(0);
      updatedVotes[index] = false;

      this.setState({
        voted: updatedVotes,
        error: true,
        errorIndex: index,
      });
    }
  }

  _handleResponse(response) {
    LayoutAnimation.easeInEaseOut();
    if (response != null && response.ok) {
      response.json()
          .then((responseJson: any) => {
            this.commendations = responseJson;

            const votes = []
            const totalCommendations = responseJson.length;
            for (let i = 0; i < totalCommendations; i++) {
              const totalVotes = this.commendations[i].votes.length;
              let found = false;
              for (let j = 0; j < totalVotes; j++) {
                if (this.commendations[i].votes[j].user_id == this.userId) {
                  votes.push(true);
                  found = true;
                  break;
                }
              }

              if (!found) {
                votes.push(false);
              }
            }

            this.setState({
              voted: votes,
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
    let backgroundColor = 'white';
    if (rowIndex % 2 === 1) {
      backgroundColor = 'rgba(0,0,0,0.1)';
    }

    const iconName = this.state.voted[rowIndex] ? 'star' : 'star-border';
    let iconColor = this.state.voted[rowIndex] ? '#DAA520' : 'rgba(0, 0, 0, 0.5)';

    if (this.state.error && this.state.errorIndex == rowIndex) {
      iconColor = '#a94442';
    }

    return (
      <View style={{backgroundColor: backgroundColor}}>
        <View style={[styles.commendation, {flexDirection: 'row', alignItems: 'center'}]}>
          <View style={{flex: 1}}>
            <Text style={styles.subtitle}>{'who? '}<Text style={styles.message}>{commendation.receiver_name}</Text></Text>
            <Text style={styles.subtitle}>{'why? '}<Text style={styles.message}>{commendation.message}</Text></Text>
          </View>
          <TouchableOpacity onPress={this._onVote.bind(this, commendation, rowIndex)}>
            <View style={styles.voteContainer}>
              <Text style={[styles.voteCount, {color: iconColor}]}>{commendation.votes.length}</Text>
              <MaterialIcons
                  size={24}
                  color={iconColor}
                  name={iconName} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderHeader() {
    return (
      <View>
        <View style={styles.commendation}>
          <Text style={styles.title}>{'never be afraid to tell your peers that you think they\'re doing a great job.'}</Text>
          <Text style={styles.title}>{'it can make a difference.'}</Text>
          <Text style={styles.title}>{'take a look below to see who\'s been doing a great job recently.'}</Text>
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
  commendation: {
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
  voteContainer: {
    marginRight: 16,
    marginLeft: 8,
    alignItems: 'center',
  },
  voteCount: {
    fontSize: 24,
    color: 'rgba(0,0,0,0.5)',
  },
});
