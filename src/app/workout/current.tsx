import { StyleSheet } from 'react-native'
import React from 'react'
import { Text, View } from '@/components/general/Themed'
import Card from '@/components/general/Card'
import SetItem from '@/components/trainer/SetItem'
import Screen from '@/components/general/Screen'

const Page = () => {

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


  return (
    <Screen>
      <Text style={styles.title}>Exercise Tracker</Text>
      <Text style={styles.subTitle}>00:49</Text>
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
    </Card>
    </Screen>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: undefined,
  },
  subTitle: {
    fontSize: 15,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rowLabel: {
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
  }
})