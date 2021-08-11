import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StudentHome from '../pages/student/home'
import CourseDetails from '../pages/student/courseDetails';
import ClassDetails from '../pages/student/classDetails'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

export default function Student () {
    let HomeStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="HomeStack" options={{ title: 'My Courses' }} component={StudentHome} />
            <Stack.Screen name="CourseDetails" options={{ title: 'Course Details' }} component={CourseDetails} />
            <Stack.Screen name="ClassDetails" options={{ title: 'Class Details' }} component={ClassDetails} />
        </Stack.Navigator>
    )

    
    // <NavigationContainer>
    //     <Drawer.Navigator initialRouteName="Home">
    //         <Drawer.Screen name="Home" component={HomeStack} />
    //     </Drawer.Navigator>
    // </NavigationContainer>


    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    )
}