import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../userContext'
import CourseList from '../../components/courseList'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function StudentHome ({ navigation }) {
    const pressHandler = id => {
        navigation.navigate('CourseDetails', { id })
    }

    const addCourse = () => {
        navigation.navigate('CreateCourse')
    } 

    let [ refreshing, setRefreshing ] = useState(false)
    const refresh = () => {
        setRefreshing(true)
        fetch('https://byte-me-npsypr.el.r.appspot.com/teachers/courses?userId='+context.id)
        .then(res => {
            if (res.status >= 500) {
                return false
            }
            return res.json()
        })
        .then(data => {
            if (data) {
                setRefreshing(false)
                setCourses(data.message)
            }
        })
    }

    const [ courses, setCourses ] = useState([])
    const context = useContext(UserContext)

    useEffect(() => {
        fetch('https://byte-me-npsypr.el.r.appspot.com/teachers/courses?userId='+context.id)
        .then(res => {
            if (res.status >= 500) {
                return false
            }
            return res.json()
        })
        .then(data => {
            if (data) {
                setCourses(data.message)
            }
        })
    },
    []
    )

    const styles = StyleSheet.create({
        actionButton: {
            backgroundColor: 'lightblue',
            position: 'absolute',
            right: 25,
            bottom: 25,
            borderRadius: 25
        }
    })


    return (
        <>
            <CourseList
                courses={courses}
                pressHandler={pressHandler}
                refresh={refresh}
                refreshing={refreshing}
            />
            <TouchableHighlight style={styles.actionButton} onPress={addCourse}>
                <MaterialIcons name="add" size={50} color="white" />
            </TouchableHighlight>
        </>
    )
}