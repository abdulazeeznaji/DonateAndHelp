import React from 'react';
import { StyleSheet, Text, View , TextInput  , Button , FlatList, ActivityIndicator,  Alert} from 'react-native';
import axios from 'axios'
import promise from 'promise'
import { Actions } from 'react-native-router-flux'; 
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     username: '',
     email:'' ,
     password:'',
      confirmPassword: '',
      value: 'true'
   }
 }

  send (username,email,password , confirmPassword) { // sending post reqeust to the server
    console.log("good Click" , username)
  if (confirmPassword === password) {
   if (password !== '' && confirmPassword !== '') {
    axios.post('http://192.168.1.81:3000/Donater',
     {
      username: username,
      email:email,
      password:password
    })
    .then(function (res) {
        Actions.Donor()
        console.log('hello3' , res)

    }).catch(function (err) {
      console.log("err" , err)
    })
  }else {
        Alert.alert('enter your password')
      }
    } else {
      console.log('cococ  ', confirmPassword)
      Alert.alert("password doesn't match,rewrite it again")
    }
}



  render() {
    return (
      <View style={styles.container}>
      <Text
        onPress={() => Actions.gray()} // New Code
      >
        Scarlet Screen
      </Text>
      <Text>User Name : </Text>
      <TextInput 
      style = {styles.input}
      placeholder="Type here your username!"
      onChangeText={(username) => this.setState({username})}
      />
      <Text>Email : </Text>
      
      <TextInput style = {styles.input}
      placeholder="Type here your email!"
      onChangeText={(email) => this.setState({email})}
      />
      <Text>Password : </Text>

      <TextInput
      style = {styles.input}
       secureTextEntry={true}
      placeholder="Type here your password"
      onChangeText={(password) => this.setState({password})}
      />
      <Text> Confirm Password : </Text>

       <TextInput 
       style = {styles.input}
       secureTextEntry={true}
      placeholder="Type here your password"
      onChangeText={(confirmPassword) => this.setState({confirmPassword})}
      />
  
        <Button
      onPress={() => this.send(this.state.username,this.state.email , this.state.password,this.state.confirmPassword)}
      title="Sign up"
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
  input: {
      width:200 , 
      margin: 5,
      height: 40,
      borderColor: '#7a42f4',
   }
});

module.exports = Signup;