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
  constructor({ setUser })
  {
    super();
    this.state={
      UserID:"",
      Age:0,
      Password:"",
      // Confirm_Password:"",
    }
    this.setUser = setUser
  }

  submit () {
    if (!this.state.UserID) {
      alert('Please enter user ID')
      return
    }
    else if (!this.state.Password) {
      alert('Please enter your password')
      return
    }
    // else if (!this.state.Age) {
    //   alert('Please enter your age')
    //   return
    // }
    // else if (this.state.Password != this.state.Confirm_Password) {
    //   alert('oops, passwords dont match!')
    //   return
    // }
    else {
      fetch(`https://byte-me-npsypr.el.r.appspot.com/login?userId=${this.state.UserID}&password=${this.state.Password}`)
      .then(res => {
        if (res.status == 200) {
          return res.json()
        }
        else {
          return false
        }
      })
      .then(data => {
        if (data) {
          if (data['authorised (student)']) {
            this.setUser({
              type: "student",
              id: this.state.UserID
            })
          } else if (data['authorised (teacher)']) {
            this.setUser({
              type: "teacher",
              id: this.state.UserID
            })
          }
        }
        else {
          alert('oops, wrong credentials entered')
        }
      })
    }
  }

  render()
  {
    return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.text}>LOG IN</Text>
      <Text styles={styles.label}>USERNAME:</Text><TextInput placeholder="Enter UserID" style={styles.input} onChangeText={(text)=>{this.setState({UserID:text})}}/>
      {/* <Text styles={styles.label}>AGE:</Text><TextInput placeholder="Enter Age" style={styles.input} keyboardType="numeric" onChangeText={(text)=>{this.setState({Age:text})}}/> */}
      <Text styles={styles.label}>PASSWORD:</Text><TextInput placeholder="Enter Password" style={styles.input} onChangeText={(text)=>{this.setState({Password:text})}}/>
      {/* <Text styles={styles.label}>CONFIRM PASSWORD:  </Text><TextInput placeholder="Confirm Password" style={styles.input} onChangeText={(text)=>{this.setState({Confirm_Password:text})}}/> */}
       
      <Button title="Submit" onPress={()=>{this.submit()}} color='lightblue' x/>
    </View>
    </ScrollView>)
  }
}

export default App