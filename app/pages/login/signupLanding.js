import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

export default function LandingPage ({ navigation }) {
    const navigate = type => {
        navigation.navigate('Signup', {type})
    }
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigate('student')}>
                    <Text style={styles.text}>STUDENT</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigate('teacher')}>
                    <Text style={styles.text}>TEACHER</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingLeft: 40,
        paddingRight: 40,
        marginBottom: 70
    },
    button: {
        backgroundColor: 'lightblue',
        marginTop: 30,
        borderRadius: 10,
        padding: 20
    },
    text: {
        textAlign: 'center',
        color: '#555',
        fontSize: 20,
        fontWeight: '700'
    }
})