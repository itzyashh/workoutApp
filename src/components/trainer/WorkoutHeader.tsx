import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text, View } from '../general/Themed'

const WorkoutHeader = () => {

    const [timer, setTimer] = useState()

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('tick')
            setTimer(new Date().toLocaleTimeString())
        }, 1000)
        return () => clearInterval(interval)
    }
    , [])

    return (
        <View style={{ backgroundColor: undefined }}>
            <Text style={styles.title}>Workout Tracker</Text>
            <Text style={styles.subTitle}>{timer}</Text>
        </View>
    )
}

export default WorkoutHeader

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 15,
        marginBottom: 16,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
      },
})