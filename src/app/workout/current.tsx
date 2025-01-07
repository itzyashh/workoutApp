import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { Text, View } from '@/components/general/Themed'
import Card from '@/components/general/Card'
import SetItem from '@/components/trainer/SetItem'
import Screen from '@/components/general/Screen'
import CustomButton from '@/components/general/CustomButton'
import WorkoutExerciseItem from '@/components/trainer/WorkoutExerciseItem'
import WorkoutHeader from '@/components/trainer/WorkoutHeader'
import workouts from '@/data/dummyWorkouts'
import { Stack } from 'expo-router'

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


      />
    </Screen>
  )
}

export default Page

const styles = StyleSheet.create({

})