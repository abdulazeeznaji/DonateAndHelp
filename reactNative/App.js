import React from 'react';
import { AppRegistry,StyleSheet, Text, View , TextInput  , Button , FlatList, ActivityIndicator,  Alert} from 'react-native';
import axios from 'axios'


import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     username: '',
     password:'',
     email:''
   }
 }

  send (username,password,email) { // sending post reqeust to the server
    console.log("good Click" , username)
    axios.post('http://192.168.1.105:3000/Donater',
     {
      username: username,
      password:password,
      email:email
    })
    .then(function (res) {
        console.log('hello3' , res)
    }).catch(function (err) {
      console.log("err" , err)
    })
}


  render() {
    return (
    <View style={styles.container}>
      <Text>Welcome To our App</Text>
      <Text>User Name : </Text>
      <TextInput
      placeholder="Type here your username!"
      onChangeText={(username) => this.setState({username})}
      />
      <Text>Email : </Text>
      
      <TextInput
      placeholder="Type here your email!"
      onChangeText={(email) => this.setState({email})}
      />
      <Text>Password : </Text>

      <TextInput secureTextEntry={true}
      placeholder="Type here your password"
      onChangeText={(password) => this.setState({password})}
      />
      <Text>So Cool Right !! </Text>
  
        <Button
      onPress={() => this.send(this.state.username,this.state.password,this.state.email)}
      title="Post Me"
      />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
