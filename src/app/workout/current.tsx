import { FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Text, View } from '@/components/general/Themed'
import Card from '@/components/general/Card'
import SetItem from '@/components/trainer/SetItem'
import Screen from '@/components/general/Screen'
import CustomButton from '@/components/general/CustomButton'
import WorkoutExerciseItem from '@/components/trainer/WorkoutExerciseItem'
import WorkoutHeader from '@/components/trainer/WorkoutHeader'
import workouts from '@/data/dummyWorkouts'
import { Redirect, Stack } from 'expo-router'
import SelectExerciseModal from '@/components/trainer/SelectExerciseModal'
import { useWorkoutStore } from '@/store'

const Page = () => {

  

  const {currentWorkout:workout, finishWorkout, addExercise} = useWorkoutStore(state => state)

  if (!workout) {
    console.log('no workout')
    return <Redirect href="/" />
  }

  const onExerciseSelect = (exercise: any) => {
    addExercise(exercise.name)
  }

  const onFinished = () => {
    finishWorkout()
  }

  return (
    <Screen>
      <Stack.Screen options={{ 
        headerRight: () => <CustomButton title="Finish" onPress={()=>onFinished()} style={{ width: 'auto', padding: 7, borderRadius: 10 }} />,
       }} />
     <FlatList
        data={workout.exercises}
        contentContainerStyle={{ gap : 10 }}
        renderItem={({item}) => <WorkoutExerciseItem exercise={item}/>}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={()=><WorkoutHeader workout={workout}/>}
        ListFooterComponent={()=><SelectExerciseModal onExerciseSelect={onExerciseSelect} />}
      />
    </Screen>
  )
}

export default Page

const styles = StyleSheet.create({

})