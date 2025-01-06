import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Card from '../general/Card'
import Colors from '@/constants/Colors'
import { Text, View } from '../general/Themed'

type WorkoutExerciseItemProps = {
    exercise: ExerciseWithSets
}

const WorkoutExerciseItem: FC<WorkoutExerciseItemProps> = ({ exercise }) => {
    return (
        <View>
            <Card title={exercise.name} key={exercise.id}>
                {
                    exercise.sets.map(set => {

                        const bestSet = exercise.sets.reduce((prev, current) => {
                            return (prev.oneRM ?? 0) > (current.oneRM ?? 0) ? prev : current
                        })

                        return (
                            <View key={set.id} style={[styles.setContainer, { backgroundColor: bestSet.id === set.id ? Colors.dark.tint + '50' : 'transparent' }]}>
                                <Text>{set.reps} x {set.weight}kg</Text>
                                {set?.oneRM && <Text>{set.oneRM?.toFixed(2)} kg</Text>}
                            </View>
                        )
                    })
                }
            </Card>
        </View>
    )
}

export default WorkoutExerciseItem

const styles = StyleSheet.create({
    setContainer: {
        flexDirection: 'row',
        gap: 8,
        padding: 8,
        justifyContent: 'space-between'
    }
})