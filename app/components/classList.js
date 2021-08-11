import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ClassCard from './classCard'


export default function ClassList ({ classes, pressHandler }) {
    const mapper = ({ item: clas }) => {
        return (
            <ClassCard
                clas={{...clas, pressHandler }}
            />
        )
    }

    // if (!courses.length) {
    //     return <></>
    // }

    return (
        <FlatList
            style={styles.list}
            keyExtractor={item => item.clasid}
            data={classes}
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