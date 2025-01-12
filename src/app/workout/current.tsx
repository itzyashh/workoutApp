import { FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Text, View } from '@/components/general/Themed'
import Card from '@/components/general/Card'
import SetItem from '@/components/trainer/SetItem'
import Screen from '@/components/general/Screen'
import CustomButton from '@/components/general/CustomButton'
import WorkoutExerciseItem from '@/components/trainer/WorkoutExerciseItem'
import WorkoutHeader from '@/components/trainer/WorkoutHeader'
import { Redirect, router, Stack } from 'expo-router'
import SelectExerciseModal from '@/components/trainer/SelectExerciseModal'
import { useWorkoutStore } from '@/store'
import Animated, { LinearTransition } from 'react-native-reanimated'

const Page = () => {

  
  const currentWorkout = useWorkoutStore(state => state.currentWorkout)
  const finishWorkout = useWorkoutStore(state => state.finishWorkout)
  const addExercise = useWorkoutStore(state => state.addExercise)
  const workout = currentWorkout!

  if (!workout) {
    return <Redirect href="/" />
  }

  const onFinished = () => {
    finishWorkout()
    router.push('/')
  }

  const onExerciseSelect = (exercise: any) => {
    addExercise(exercise.name)
  }

  return (
    <Screen>
      <Stack.Screen options={{ 
        headerRight: () => <CustomButton title="Finish" onPress={()=>onFinished()} style={{ width: 'auto', padding: 7, borderRadius: 10 }} />,
       }} />
     <Animated.FlatList
        data={workout.exercises}
        contentContainerStyle={{ gap : 10 }}
        itemLayoutAnimation={LinearTransition}
        renderItem={({item}) => <WorkoutExerciseItem exercise={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={()=><WorkoutHeader workout={workout}/>}
        ListFooterComponent={()=><SelectExerciseModal onExerciseSelect={onExerciseSelect} />}
      />
    </Screen>
  )
}

export default Page

const styles = StyleSheet.create({

})