import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Card from '../general/Card'
import Colors from '@/constants/Colors'
import { Text, View } from '../general/Themed'
import CustomButton from '../general/CustomButton'
import SetItem from './SetItem'

type WorkoutExerciseItemProps = {

}
const sets: ExerciseSet[] = [
    {
      id: '1',
      exerciseId: '1',
      weight: 10,
      reps: 10,
    },
    {
      id: '2',
      exerciseId: '1',
      weight: 10,
      reps: 10,
    },
    {
      id: '3',
      exerciseId: '1',
      weight: 10,
      reps: 10,
    },
  ]
const WorkoutExerciseItem: FC<WorkoutExerciseItemProps> = () => {
    return (
        <View>
      <Card title='Exercise'>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles.rowLabel, {textAlign: 'left'}]}>Set</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 25 }}>
          <Text style={styles.rowLabel}>kg</Text>
          <Text style={styles.rowLabel}>Reps</Text>
             </View>
        </View>
        <View style={{ gap: 10 , marginTop: 10}}>
                     {sets.map((set, i) => <SetItem key={i} index={i} set={set} />)}
        </View>
        <CustomButton
          style={{ marginTop: 10 }}
         type='link' title='+ Add Set' onPress={() => console.log('add set')} />
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