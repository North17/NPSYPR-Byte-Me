import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import ClassList from '../../components/classList';
import { MaterialIcons } from '@expo/vector-icons';

export default function TeacherCourseDetails ({ route, navigation }) {
  let id = route.params.id

  const pressHandler = id => {
    navigation.navigate('ClassDetails', { id })
  }

  const addCourse = () => {
    navigation.navigate('CreateClass', { id })
  } 

  let [ course, setCourse ] = useState(false)

  useEffect(() => {
    fetch('https://byte-me-npsypr.el.r.appspot.com/course?courseId='+id)
    .then(res => {
      if (res.status >= 400) {
        return false
      }
      else {
        return res.json()
      }
    })
    .then(data => {
      if (!data) {
        return
      }
      else {
        setCourse(data)
      }
    })
  }, [])



  if (!course) {
    return <></>
  } 

  let details = course[0]["Course:"]
  let classes = course[1]['Classes:']


  return (
    <View style={styles.container}>
      <Text style={{fontWeight:"bold", fontSize:26}}>{details.title}</Text>
      <Text style={{fontSize:20}}>{details.title}</Text>
      <Text style={{fontSize:20}}>{details.lev}</Text>
      <Text style={{fontSize:20}}>{details.start} - {details.end}</Text>
      <Text style={{fontSize:20}}>Description:</Text>
      <Text numberOfLine={2} style={{fontSize:20,}}>{details.desc}</Text>

      <ClassList classes={classes} pressHandler={pressHandler} />
      
      <TouchableHighlight style={styles.actionButton} onPress={addCourse}>
        <MaterialIcons name="add" size={50} color="white" />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"#008B8B",
    justifyContent:"flex-start",
    paddingTop:40,
    paddingLeft:40,
  },
  actionButton: {
      backgroundColor: 'lightblue',
      position: 'absolute',
      right: 25,
      bottom: 25,
      borderRadius: 25
  }
});