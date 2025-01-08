import { StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Text, View } from '../general/Themed'
import { calculateMinutesAndSeconds } from '@/utils/time'

type WorkoutHeaderProps = {
    workout: Workout
}
const WorkoutHeader:FC<WorkoutHeaderProps> = ({ workout }) => {

    const [timer, setTimer] = useState('00:00')

    useEffect(() => {
        const interval = setInterval(() => {
            const duration = calculateMinutesAndSeconds(workout.createdAt, new Date())
            setTimer(duration)
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