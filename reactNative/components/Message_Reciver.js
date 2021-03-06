import React from 'react'
import { StyleSheet, TextInput, Alert } from 'react-native'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { Avatar} from 'react-native-elements'
import { Container, Header, Content, SwipeRow, View, Text, Icon, Button, Item, Input } from 'native-base'
class Message extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      rightMes: [],
      rightMes2: [],
      text: '',
      message: '',
      sender: '',
      refresh:true ,
      M:''
    }
  }
  async componentDidUpdate() {
    
  }
  componentDidMount () {
    this.openMail(this.props.text, this.props.message, this.props.sender)
    this.setState({refresh:!this.state.refresh})

    this.props.ref = !this.props.ref
  }
  sendMessage (to, text) {
    var x = this
    axios.post('https://donatandhelp.herokuapp.com/sendMessage', {user: to, text: text})
      .then((res) => {
        console.log('aaa' , res)
        Alert.alert("Your message has been send")
        x.setState({M:res.message})
        x.componentDidMount()
        x.setState({
          messageForDOM: ' Your Message has been sent'
        })
      }).catch((err) => {
        x.setState({
          messageForDOM: ' User Not Found!'
        })
      })
  }

  openMail (personName, messages, senderMess) {
    var arr = []
    var arr2 = []
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].sender === personName) {
        arr.push(messages[i])
      }
    }
    for (var i = 0; i < senderMess.length; i++) {
      if (senderMess[i].reciver === personName) {
        arr2.push(senderMess[i])
      }
    }
    this.setState({rightMes: arr})
    this.setState({rightMes2: arr2})
  }

  remove (user, id) {
    axios.post('https://donatandhelp.herokuapp.com/removeMsg', {user: user, id: id})
      .then((res) => {

      }).catch((err) => {
        console.log('err', err)
      })
  }

  render () {
    return (
      <Container>
        <Header />
        <Content>
          {this.state.rightMes.map(item =>

            <SwipeRow
              leftOpenValue={75}
              rightOpenValue={-75}
              left={
                <Button success onPress={() => alert('Trash')} >
                  <Icon active name='add' />
                </Button>
              }
              body={
                <View>
                  <Text>{item.message}</Text>
                  {this.state.M}
                </View>
              }
              right={
                <Button danger  onPress={() => this.remove(item.sender, item._id)}>
                  <Icon active name='trash' />
                </Button>
              }
            />
          )}
          {this.state.rightMes2.map(item =>

            <SwipeRow
              leftOpenValue={75}
              rightOpenValue={-75}
              left={
                <Button success onPress={() => alert('Trash')}>
                  <Icon active name='add' />
                </Button>
              }
              body={
                <View>
                  <Text style={styles.sender}>{item.message}</Text>
                </View>
              }
              right={
                <Button danger  onPress={() => this.remove(item.sender, item._id)}>
                  <Icon active name='trash' />
                </Button>
              } />
          )}

        </Content>
        <Item>
          <Input placeholder='Aa'
            onChangeText={(text) => this.setState({text})}
          />
        </Item>
        <Button block dark
          onPress={() => this.sendMessage(this.props.text, this.state.text)}>
          <Text>Send</Text>
        </Button>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sender: {
    color: '#49D6BC'
  }
})

module.exports = Message
