import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Card from '../general/Card'
import Colors from '@/constants/Colors'
import { Text, View } from '../general/Themed'
import CustomButton from '../general/CustomButton'
import SetItem from './SetItem'
import { useWorkoutStore } from '@/store'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated'

type WorkoutExerciseItemProps = {
  exercise: ExerciseWithSets
}

const WorkoutExerciseItem: FC<WorkoutExerciseItemProps> = ({exercise}) => {

  const addSet = useWorkoutStore(state => state.addSet)

  return (
        <View>
      <Card title={exercise?.name} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles.rowLabel, {textAlign: 'left'}]}>Set</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 25 }}>
          <Text style={styles.rowLabel}>kg</Text>
          <Text style={styles.rowLabel}>Reps</Text>
             </View>
        </View>
        <View style={{ gap: 10 , marginTop: 10}}>
                     {exercise.sets.map((set, i) => (
                              <Animated.View
                              key={set.id}
                              entering={FadeInDown}
                              >
                      <SetItem index={i} set={set} />
                      </Animated.View>
                    )
                    )}
        </View>
        <CustomButton
          style={{ marginTop: 10 }}
         type='link' title='+ Add Set' onPress={() => addSet(exercise.id)} />
      </Card>
      </View>
    )
}

export default WorkoutExerciseItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        backgroundColor: undefined,
      },
      rowLabel: {
        fontWeight: 'bold',
        width: 50,
        textAlign: 'center',
      }
})