import React from 'react'
import { Button, StyleSheet, TouchableOpacity, View, Text } from 'react-native'

export default function LandingPage ({ navigation }) {
    const navigate = page => {
        navigation.navigate(page)
    }
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigate('Login')}>
                    <Text style={styles.text}>LOG IN</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigate('SignupLanding')}>
                    <Text style={styles.text}>SIGN UP</Text>
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