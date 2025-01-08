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
import { Stack } from 'expo-router'
import SelectExerciseModal from '@/components/trainer/SelectExerciseModal'

const Page = () => {

  

  const workout = workouts[0]

  const onFinished = () => {
    console.log('finished')
  }

  return (
    <Screen>
      <Stack.Screen options={{ 
        headerRight: () => <CustomButton title="Finish" onPress={()=>onFinished()} style={{ width: 'auto', padding: 7, borderRadius: 10 }} />,
       }} />
     <FlatList
        data={[1, 2, 3]}
        contentContainerStyle={{ gap : 10 }}
        renderItem={() => <WorkoutExerciseItem />}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={()=><WorkoutHeader workout={workout}/>}
        ListFooterComponent={()=><SelectExerciseModal />}
      />
    </Screen>
  )
}

export default Page

const styles = StyleSheet.create({

})