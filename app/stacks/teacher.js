import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeacherHome from '../pages/teacher/home'
import CourseDetails from '../pages/teacher/courseDetails'
import ClassDetails from '../pages/teacher/classDetails'
import CreateCourse from '../pages/teacher/createCourse'
import CreateClass from '../pages/teacher/createClass'

const Stack = createNativeStackNavigator()

export default function Teacher () {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeStack" options={{ title: 'My Courses' }} component={TeacherHome} />
                <Stack.Screen name="CourseDetails" options={{ title: 'Course Details' }} component={CourseDetails} />
                <Stack.Screen name="ClassDetails" options={{ title: 'Class Details' }} component={ClassDetails} />
                <Stack.Screen name="CreateCourse" options={{ title:'Create Course' }} component={CreateCourse}/>
                <Stack.Screen name="CreateClass" options={{ title: 'Create Class'}} component={CreateClass}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}