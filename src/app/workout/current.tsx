import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { Text, View } from '@/components/general/Themed'
import Card from '@/components/general/Card'
import SetItem from '@/components/trainer/SetItem'
import Screen from '@/components/general/Screen'
import CustomButton from '@/components/general/CustomButton'
import WorkoutExerciseItem from '@/components/trainer/WorkoutExerciseItem'
import WorkoutHeader from '@/components/trainer/WorkoutHeader'

const Page = () => {




  return (
    <Screen>
     <FlatList
        data={[1, 2, 3]}
        contentContainerStyle={{ gap : 10 }}
        renderItem={() => <WorkoutExerciseItem />}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={()=><WorkoutHeader />}


      />
    </Screen>
  )
}

export default Page

const styles = StyleSheet.create({

})