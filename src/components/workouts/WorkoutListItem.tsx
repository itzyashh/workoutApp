import { FlatList, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Text, useThemeColor, View } from '@/components/general/Themed'
import Card from '../general/Card'
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'

type WorkoutListItemProps = {
    workout: WorkoutWithExercises
}

const WorkoutListItem:FC<WorkoutListItemProps> = ({workout}) => {
    const separatorColor = useThemeColor({}, 'separator')

    const createdAt = dayjs(workout.createdAt)
    const formattedDate = createdAt.format('HH:mm dddd, DD MMM').toString()

    const totalWeight = workout.exercises.reduce((prev, current) => {
        const totalWeight = current.sets.reduce((prev, current) => {
            return prev + current.weight * current.reps
        }, 0)
        return prev + totalWeight
    }
    , 0)


    const calculateDuration = (start: Date | string, end: Date | string | null) => {

        if (!start || !end) {
            return '00:00';
            }

        const startDate = new Date(start);
        const endDate = new Date(end);
        const durationMs = endDate.getTime() - startDate.getTime();
        const durationMinutes = Math.floor(durationMs / 60000);
        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      };
    
      const duration = calculateDuration(workout.createdAt, workout.finishedAt);
    

    console.log(duration)
    return (
        <Card title={formattedDate} style={{ gap: 8 }} href={`/workout/${workout.id}`}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold' }}>Exercise</Text>
                <Text style={{ fontWeight: 'bold' }}>Best Set</Text>
            </View>
            <FlatList
                data={workout.exercises}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {

                    // find the best set a set where you lifted the most weight to find this we need to multiply the weight with the reps
                    // and find the highest number
                    let bestSet = item.sets.reduce((prev, current) => {

                        if (!prev.weight || !current.weight) {
                            // if the weight is 0 || null we should select the set with the most reps
                            if (prev.reps > current.reps) {
                                return prev
                            } else {
                                return current
                            }
                        }

                        if (prev.weight * prev.reps > current.weight * current.reps) {
                            return prev
                        } else {
                            return current
                        }
                    }, item.sets[0] || { weight: 0, reps: 0 })

                   return (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'gray' }}>{item.sets.length} x {item.name}</Text>
                        { !bestSet.weight ? <Text style={{ color: 'gray' }}>{bestSet.reps} reps</Text> :
                        <Text style={{ color: 'gray' }}>{bestSet.weight} kg x {bestSet.reps}</Text>
                   }
                    </View>
                )}}
            />
    

            <View style={{ flexDirection: 'row',

                 gap: 22, borderTopWidth: 1, borderColor: separatorColor
                 , paddingTop: 8, marginTop: 8 }}>

                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <Fontisto name="clock" size={15} color="gray" />
                    <Text style={{}}>{duration}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <MaterialCommunityIcons name="weight-kilogram" size={17} color="gray" />
                    <Text style={{}}>{totalWeight} kg</Text>
                </View>
            </View>

        </Card>
    )
}

export default WorkoutListItem

const styles = StyleSheet.create({})