import { FlatList, StyleSheet } from 'react-native'

import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View } from '@/components/general/Themed'
import workouts from "@/data/dummyWorkouts";
import Card from '@/components/general/Card';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Colors from '@/constants/Colors';

dayjs.extend(relativeTime);


const Page = () => {

  const { id } = useLocalSearchParams()
  const workout = workouts.find(workout => workout.id === id)

  if (!workout) {
    return <Text>Workout not found</Text>
  }

  const createdAt = dayjs(workout.createdAt)
  const formattedDate = createdAt.format('HH:mm dddd, DD MMM').toString()

  return (
    <View style={styles.container}>

      <FlatList
        data={workout.exercises}
        keyExtractor={item => item.id}
        contentContainerStyle={{ marginTop: 16, gap: 16 }}
        renderItem={({ item }) => (
          <Card title={item.name} key={item.id}>
            {
              item.sets.map(set => {

                const bestSet = item.sets.reduce((prev, current) => {
                  return prev.oneRM > current.oneRM ? prev : current
                })

                return (
                <View key={set.id} style={{ 
                  flexDirection: 'row',
                  gap: 8,
                  padding: 8,
                  backgroundColor: bestSet.id === set.id ? Colors.dark.tint + '50' : undefined,
                 justifyContent: 'space-between' }}>
                  <Text>{set.reps} x {set.weight}kg</Text>
                  <Text>{set.oneRM?.toFixed(2)} kg</Text>
                </View>
                )
              })
            }
          </Card>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
          <Text style={styles.title} >Workout Details</Text>
          <Text>{formattedDate}</Text>
          </View>
        )
        }
      />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: undefined,
    padding: 4,
  },
  header: {
    marginBottom: 16,
    gap: 8,
    backgroundColor: undefined,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

})