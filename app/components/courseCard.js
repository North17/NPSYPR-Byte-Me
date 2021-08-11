import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'; 
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

export default function CourseCard ({ course }) {
    let { pressHandler, title, tid, start, end, courseid, subject, lev } = course
    
    return (
        <TouchableWithoutFeedback onPress={() => pressHandler(courseid)}>
            <View style={styles.container}>
                <AntDesign name="book" size={35} color="black" style={styles.bookIcon}/>
                <View style={styles.details}>
                    <Text>{ title }</Text>
                    {tid ? <Text><Text style={styles.underline}>Teacher:</Text> { tid }</Text> : false}
                    <Text><Text style={styles.underline}>{ subject }:</Text> { lev }</Text>
                    <Text>{ start } - { end }</Text>
                </View>
                <MaterialIcons name="chevron-right" size={30} color="black" />
            </View>
        </TouchableWithoutFeedback>
    )
}


let styles = StyleSheet.create({
    container: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#333',
        marginTop: 10,
    },
    details: {
        flex: 1
    },
    bookIcon: {
        paddingRight: 15
    },
    underline: {
        textDecorationLine: 'underline'
    }
})