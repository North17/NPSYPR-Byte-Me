import React from 'react';
import { StyleSheet, Text, View, TextInput,Button, ScrollView } from 'react-native';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 50,
  },
  input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      fontSize: 18,
      borderRadius: 6,
      marginTop: 10,
      marginBottom: 20
  },
  text: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 50
  }
});

class App extends React.Component{
  constructor({ setUser, route })
  {
    super();
    this.state={
      UserID:"",
      Age:0,
      Password:"",
      Confirm_Password:"",
    }
    this.setUser = setUser
    this.type = route.params.type
  }

  submit () {
    if (!this.state.UserID) {
      alert('Please enter user ID')
      return
    }
    else if (!this.state.Password) {
      alert('Please enter a password')
      return
    }
    else if (!this.state.Age && this.type == "student") {
      alert('Please enter your age')
      return
    }
    else if (this.state.Password != this.state.Confirm_Password) {
      alert('oops, passwords dont match!')
      return
    }
    else {
      let age = ""
      if (this.type == "student") age = "&age="+this.state.Age

      fetch(`https://byte-me-npsypr.el.r.appspot.com/${this.type}signup?userId=${this.state.UserID}&password=${this.state.Password}${age}`)
      .then(res => {
        if (res.status == 200) {
          return res.json()
        }
        else if (res.status >= 400) {
          return res.status
        }
      })
      .then(data => {
        if (data == 401) {
          alert("oops, userID already in use!")
        } 
        else if (data >= 400) {
          alert("oops, an error occured!")
        }
        else if (data) {
          this.setUser({
            id: this.state.UserID,
            type: this.type
          })
        }
      })
    }
  }

  render()
  {
    return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.text}>SIGN UP</Text>
      <Text styles={styles.label}>USERNAME:</Text><TextInput placeholder="Enter UserID" style={styles.input} onChangeText={(text)=>{this.setState({UserID:text})}}/>
      
      {this.type=="student" &&
      <>
        <Text styles={styles.label}>AGE:</Text><TextInput placeholder="Enter Age" style={styles.input} keyboardType="numeric" onChangeText={(text)=>{this.setState({Age:text})}}/>
      </>
      }
      <Text styles={styles.label}>PASSWORD:</Text><TextInput placeholder="Enter Password" style={styles.input} onChangeText={(text)=>{this.setState({Password:text})}}/>
      <Text styles={styles.label}>CONFIRM PASSWORD:  </Text><TextInput placeholder="Confirm Password" style={styles.input} onChangeText={(text)=>{this.setState({Confirm_Password:text})}}/>
       
      <Button title="Submit" onPress={()=>{this.submit()}} color='lightblue' x/>
    </View>
    </ScrollView>)
  }
}

export default App