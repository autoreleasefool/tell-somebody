/**
 * @flow
 */

import React, { Component } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  cognitiveTextApiKey,
  cognitiveTextEndpoint,
  cognitiveEmotionApiKey,
  cognitiveEmotionEndpoint,
} from 'env';
const MaterialIcons = require('react-native-vector-icons/MaterialIcons');

const NONE = 0;
const TEXT = 1;
const IMAGE = 2;

export default class Expert extends Component {

  props: {
    navigator: any,
  }

  state: {
    option: number,
    message: string,
    error: boolean,
    submitEnabled: boolean,
    textResponse: number,
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      option: NONE,
      message: '',
      error: false,
      submitEnabled: true,
      textResponse: -1,
      imageResponse: -1,
    }
  }

  _submitText() {
    if (!this.state.submitEnabled) {
      return;
    }
    this.setState({
      submitEnabled: false,
    })

    const message = this.state.message;
    fetch(
      cognitiveTextEndpoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': cognitiveTextApiKey,
        },
        body: JSON.stringify({
          documents: [
            {
              language: 'en',
              id: '0',
              text: message,
            },
          ],
        }),
      }
    )
        .then(this._handleTextResponse.bind(this))
        .catch(this._handleTextResponse.bind(this));
  }

  _handleTextResponse(response: any) {
    if (response != null && response.ok) {
      response.json()
          .then((responseJson: Object) => {
            this.setState({
              submitEnabled: true,
              error: false,
              textResponse: responseJson.documents[0].score,
            })
          });
    } else {
      this.setState({
        error: true,
        submitEnabled: true,
      })
    }
  }

  _switchOption(option: number) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      option: option,
      error: false,
      submitEnabled: true,
      textResponse: -1,
    })
  }

  _renderForm() {
    return (
      <View>
        <Text style={styles.instructions}>{'feeling a bit uneasy at something somebody sent you?'}</Text>
        <Text style={styles.instructions}>{'with this tool, you can upload text and we\'ll do our best to tell you how we\'d feel if we received something similar.'}</Text>
        <Text style={styles.instructions}>{'this tool is 100% anonymous and it\'s up to you what to do with the advice given.'}</Text>
        <TouchableOpacity onPress={this._switchOption.bind(this, TEXT)}>
          <View style={styles.button}>
            <Text style={styles.login}>{'paste some text.'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderImageInput() {
    let text = null;
    if (this.state.textResponse >= 0) {
      if (this.state.textResponse < 0.1) {
        text = <Text style={[styles.textResponse, styles.bad]}>{'this doesn\'t sound very good to us. have you spoken to anybody?'}</Text>;
      } else if (this.state.textResponse < 0.25) {
        text = <Text style={[styles.textResponse, styles.poor]}>{'that\'s not something good friends should say. if you\'re in an uncomfortable situation, it always helps to talk to someone.'}</Text>;
      } else if (this.state.textResponse < 0.5) {
        text = <Text style={[styles.textResponse, styles.uneasy]}>{'i don\'t feel too great after reading that. how about you? need somebody to talk to?'}</Text>;
      } else if (this.state.textResponse < 0.75) {
        text = <Text style={[styles.textResponse, styles.good]}>{'this sounds alright to us. if you\'re still not certain, remember, we aren\'t perfect. don\'t be afraid to speak up and ask someone for help.'}</Text>;
      } else {
        text = <Text style={[styles.textResponse, styles.great]}>{'we can\'t find anything wrong here, but nobody\'s perfect and if you\'re still not sure, ask a friend or adult you trust.'}</Text>;
      }
    }

    return (
      <View>
        <View>
          <Text style={styles.instructions}>{'upload an image or screenshot from your phone, and we\'ll let you know how we\'d feel about receiving a similar image.'}</Text>

          {text}
          {this.state.error
          ? <View style={[styles.button, styles.redButton]}>
              <Text style={[styles.login, {fontWeight: 'normal'}]}>{'there was an error submitting your text. please, try again later.'}</Text>
            </View>
          : null
        }
          <TouchableOpacity onPress={this._submitText.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.login}>{'submit.'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this._switchOption.bind(this, NONE)}>
          <View style={styles.button}>
            <Text style={styles.login}>{'cancel.'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderTextInput() {
    let text = null;
    if (this.state.textResponse >= 0) {
      if (this.state.textResponse < 0.1) {
        text = <Text style={[styles.textResponse, styles.bad]}>{'this doesn\'t sound very good to us. have you spoken to anybody?'}</Text>;
      } else if (this.state.textResponse < 0.25) {
        text = <Text style={[styles.textResponse, styles.poor]}>{'that\'s not something good friends should say. if you\'re in an uncomfortable situation, it always helps to talk to someone.'}</Text>;
      } else if (this.state.textResponse < 0.5) {
        text = <Text style={[styles.textResponse, styles.uneasy]}>{'i don\'t feel too great after reading that. how about you? need somebody to talk to?'}</Text>;
      } else if (this.state.textResponse < 0.75) {
        text = <Text style={[styles.textResponse, styles.good]}>{'this sounds alright to us. if you\'re still not certain, remember, we aren\'t perfect. don\'t be afraid to speak up and ask someone for help.'}</Text>;
      } else {
        text = <Text style={[styles.textResponse, styles.great]}>{'we can\'t find anything wrong here, but nobody\'s perfect and if you\'re still not sure, ask a friend or adult you trust.'}</Text>;
      }
    }

    return (
      <View>
        <View>
          <Text style={styles.instructions}>{'you can paste any text in the field below and we\'ll let you know how we\'d feel if we received a similar message.'}</Text>
          <TextInput
              underlineColorAndroid={'rgba(0,0,0,0)'}
              placeholder={'your text'}
              style={styles.input}
              value={this.state.message}
              onChangeText={(text: string) => this.setState({message: text})} />
          {text}
          {this.state.error
          ? <View style={[styles.button, styles.redButton]}>
              <Text style={[styles.login, {fontWeight: 'normal'}]}>{'there was an error submitting your text. please, try again later.'}</Text>
            </View>
          : null
        }
          <TouchableOpacity onPress={this._submitText.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.login}>{'submit.'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this._switchOption.bind(this, NONE)}>
          <View style={styles.button}>
            <Text style={styles.login}>{'cancel.'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let form = null;

    if (this.state.option === NONE) {
      form = this._renderForm();
    } else if (this.state.option === TEXT) {
      form = this._renderTextInput();
    } else if (this.state.option === IMAGE) {
      form = this._renderImageInput();
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

const elementSpacing = 4;
const textSpacing = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 16,
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
  instructions: {
    fontSize: 16,
    color: 'black',
    marginLeft: textSpacing,
    marginRight: textSpacing,
    marginTop: elementSpacing,
    marginBottom: elementSpacing,
  },
  redButton: {
    height: 50,
    backgroundColor: '#a94442',
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginTop: elementSpacing,
    marginBottom: elementSpacing,
    height: 40,
  },
  input: {
    paddingLeft: 8,
    marginTop: elementSpacing,
    marginBottom: elementSpacing,
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
    marginLeft: textSpacing,
  },
  textResponse: {
    marginLeft: textSpacing,
    marginRight: textSpacing,
    marginTop: elementSpacing,
    marginBottom: elementSpacing,
    fontSize: 16,
    textAlign: 'left',
  },
  bad: {
    color: '#a94442',
  },
  poor: {
    color: '#a94442',
  },
  uneasy: {
    color: '#B8860B',
  },
  good: {
    color: '#006400',
  },
  great: {
    color: '#006400',
  },
});
