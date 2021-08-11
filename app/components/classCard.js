import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

export default function ClassCard ({ clas }) {
    let { pressHandler, title, clasid, start, end, link } = clas
    
    return (
        <TouchableWithoutFeedback onPress={() => pressHandler(clasid)}>
            <View style={styles.container}>
                <MaterialIcons name="label" size={35} color="black" style={styles.bookIcon}/>
                <View style={styles.details}>
                    <Text>{ title }</Text>
                    <Text>{ start } - { end }</Text>
                    <Text>{ link }</Text>
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