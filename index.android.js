/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;



class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg"        
    }
  }
  render() {
    let pic = {
     
    }
    const responseInfoCallback = (error, result) => {
      if (error) {
        alert('Error fetching data: ' + error.toString());
      } else {
        console.log(result);
        this.setState({ uri: result.picture.data.url });        
      }
    }
    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me?fields=id,first_name,last_name,name,picture.type(large),email,gender',
      null,
      responseInfoCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              console.log(result)
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled." + error);
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.") }/>
        <Image source={this.state} style={{ width: 193, height: 110 }}/>
      </View>
    );
  }
}


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
