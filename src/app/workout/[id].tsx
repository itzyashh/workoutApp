import { FlatList, StyleSheet } from 'react-native'

import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View } from '@/components/general/Themed'
import workouts from "@/data/dummyWorkouts";
import Card from '@/components/general/Card';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Colors from '@/constants/Colors';
import WorkoutExerciseItem from '@/components/workouts/WorkoutExerciseItem';
import Screen from '@/components/general/Screen';

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
    <Screen>

      <FlatList
        data={workout.exercises}
        keyExtractor={item => item.id}
        contentContainerStyle={{ marginTop: 16, gap: 16 }}
        renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
          <Text style={styles.title} >Workout Details</Text>
          <Text>{formattedDate}</Text>
          </View>
        )
        }
      />
    </Screen>
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