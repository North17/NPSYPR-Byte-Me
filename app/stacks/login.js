import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../pages/login/landingPage'
import Login from '../pages/login/login'
import SignupLanding from '../pages/login/signupLanding'
import Signup from '../pages/login/signup'

const Stack = createNativeStackNavigator()

export default function Teacher ({ setUser }) {
    function LandingWithSetUser (props) {
        return <Landing {...props} setUser={setUser} />
    } 
    function LoginwWithSetUser (props) {
        return <Login {...props} setUser={setUser} />
    } 
    function SignupLandingWithSetUser (props) {
        return <SignupLanding {...props} setUser={setUser} />
    } 
    function SignupWithSetUser (props) {
        return <Signup {...props} setUser={setUser} />
    } 
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Landing" options={{ title: '[App Name]' }} component={LandingWithSetUser} />
                <Stack.Screen name="Login" options={{ title: '' }} component={LoginwWithSetUser} />
                <Stack.Screen name="SignupLanding" options={{ title: '' }} component={SignupLandingWithSetUser} />
                <Stack.Screen name="Signup" options={{ title: '' }} component={SignupWithSetUser} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}