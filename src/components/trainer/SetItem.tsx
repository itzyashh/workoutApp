import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Text, TextInput, View } from '../general/Themed'

type SetItemProps = {
    index: number
    set: ExerciseSet
}

const SetItem: FC<SetItemProps> = ({ index, set }) => {

    const [weight, setWeight] = React.useState(set?.weight?.toString() || '')
    const [reps, setReps] = React.useState(set?.reps?.toString() || '')

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{index + 1}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', gap: 25
                }}>
                    <TextInput
                        value={weight}
                        style={styles.input}
                        keyboardType='numeric'
                        onChangeText={setWeight}
                    />
                    <TextInput
                        value={reps}
                        keyboardType='numeric'
                        onChangeText={setReps}
                        style={styles.input} />
                </View>
            </View>
        </View>
    )
}

export default SetItem

const styles = StyleSheet.create({
    input: {
        width: 50,
        height: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})