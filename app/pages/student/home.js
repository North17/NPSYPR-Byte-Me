import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../userContext'
import CourseList from '../../components/courseList'

export default function StudentHome ({ navigation }) {
    const pressHandler = id => {
        navigation.navigate('CourseDetails', { id })
    }

    const [ courses, setCourses ] = useState([])
    const context = useContext(UserContext)

    

    let [ refreshing, setRefreshing ] = useState(false)
    const refresh = () => {
        setRefreshing(true)
        fetch('https://byte-me-npsypr.el.r.appspot.com/students/courses?userId='+context.id)
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
    
    useEffect(() => {
        fetch('https://byte-me-npsypr.el.r.appspot.com/students/courses?userId='+context.id)
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


    return (
        <CourseList
            courses={courses}
            pressHandler={pressHandler}
            refresh={refresh}
            refreshing={refreshing}
        />
    )
}