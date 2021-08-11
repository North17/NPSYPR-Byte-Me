import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function StudentCourseDetails ({ route }) {
  let id = route.params.id

  let [ clas, setClass ] = useState(false)

  useEffect(() => {
    fetch('https://byte-me-npsypr.el.r.appspot.com/class?classId='+id)
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
        setClass(data)
      }
    })
  }, [])



  if (!clas) {
    return <></>
  }

  let details = clas['Class:']


  return (
    <View style={styles.container}>
        <Text style={{fontWeight:"bold", fontSize:26}}>{ details.title }</Text>
        <Text style={{fontSize:20}}>{details.start} - {details.end}</Text>
        <Text style={{fontSize:20}}>{details.link}</Text>
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
});