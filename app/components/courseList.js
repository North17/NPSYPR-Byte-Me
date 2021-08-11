import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import CourseCard from './courseCard'


export default function CourseList ({ courses, pressHandler }) {
    const mapper = ({ item: course }) => {
        return (
            <CourseCard
                course={{...course, pressHandler }}
            />
        )
    }

    if (!courses.length) {
        return <></>
    }

    return (
        <FlatList
            style={styles.list}
            keyExtractor={item => item.courseid}
            data={courses}
            renderItem={mapper}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        padding: 20,
        flex: 1
    }
})