import React, { useContext } from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { UserContext } from '../../userContext';


let styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    }
})

const reviewSchema = yup.object({
  title: yup.string()
    .required()
    .min(4),
  subject: yup.string()
    .required()
    .min(4),
  lev: yup.string()
    .required()
    .test('is-num-1-3', 'Level must be a number 1 - 3', (val) => {
      return parseInt(val) < 4 && parseInt(val) > 0;
    }),

    descr: yup.string()
        .required()
        .min(10),

    start: yup.string()
        .required(),
    
    end: yup.string()
        .required()
});


let initialValues = {
    subject: '',
    title: '',
    descr: '',
    lev: '',
    start: '',
    end: ''
}


export default function ReviewForm({ navigation }) {
  const id = useContext(UserContext).id

  const addReview = values => {
    values.tid = id
    values.courseid = parseInt(1000000+Math.random()*10000000)

    let uri = []

    for (let i of Object.keys(values)) {
      uri.push(i + "=" + values[i])
    }
    
    let str = encodeURI(uri.join("&"))

    fetch('https://byte-me-npsypr.el.r.appspot.com/course?'+str, {method: "POST"})
    .then(res => {
      if (res.status >= 400) {
        alert("oops, an error occured!")
        return res.json()
      }
      else {
        navigation.goBack()
      }
    })
    .then(console.log)
  }
    
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}><ScrollView>
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        onSubmit={values => addReview(values)}
      >
        {props => (
          <View>
            <TextInput
              style={styles.input}
              placeholder='Title'
              onChangeText={props.handleChange('title')}
              onBlur={props.handleBlur('title')} 
              value={props.values.title}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={styles.errorText}>{props.touched.title && props.errors.title}</Text>

            <TextInput
              style={styles.input}
              placeholder='Subject'
              onChangeText={props.handleChange('subject')}
              onBlur={props.handleBlur('subject')}
              value={props.values.subject}
            />
            <Text style={styles.errorText}>{props.touched.subject && props.errors.subject}</Text>

            <TextInput 
              style={styles.input}
              placeholder='Level (1-3)'
              onChangeText={props.handleChange('lev')}
              onBlur={props.handleBlur('lev')} 
              value={props.values.lev}
              keyboardType='numeric'
            />
            <Text style={styles.errorText}>{props.touched.lev && props.errors.lev}</Text>
            
            
            <TextInput 
              style={styles.input}
              multiline
              placeholder='description'
              onChangeText={props.handleChange('descr')}
              onBlur={props.handleBlur('descr')} 
              value={props.values.descr}
            />
            <Text style={styles.errorText}>{props.touched.descr && props.errors.descr}</Text>


            <TextInput 
              style={styles.input}
              placeholder='Start Time'
              onChangeText={props.handleChange('start')}
              onBlur={props.handleBlur('start')} 
              value={props.values.start}
            />
            <Text style={styles.errorText}>{props.touched.start && props.errors.start}</Text>

            
            <TextInput 
              style={styles.input}
              placeholder='End Time'
              onChangeText={props.handleChange('end')}
              onBlur={props.handleBlur('end')} 
              value={props.values.end}
            />
            <Text style={styles.errorText}>{props.touched.end && props.errors.end}</Text>

            <Button color='lightblue' title="Submit" onPress={props.handleSubmit} /> 
          </View>
        )}
      </Formik>
    </View>
    </ScrollView></TouchableWithoutFeedback>
    
  );
}