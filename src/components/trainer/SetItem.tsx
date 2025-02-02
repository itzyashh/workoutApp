import { StyleSheet } from 'react-native'
import React, { FC, useState } from 'react'
import { Text, TextInput, View } from '../general/Themed'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import CustomButton from '../general/CustomButton';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { useWorkoutStore } from '@/store';
import { debounce } from 'lodash';

type SetItemProps = {
    index: number
    set: ExerciseSet
}

const SetItem: FC<SetItemProps> = ({ index, set }) => {


    const [weight, setWeight] = useState(set?.weight?.toString() || '')
    const [reps, setReps] = useState(set?.reps?.toString() || '')

    const updateSet = useWorkoutStore(state => state.updateSet)
    const deleteSet = useWorkoutStore(state => state.deleteSet)

    const debouncedUpdateSet = debounce((id: string, updates: any) => {
        updateSet(id, updates);
    }, 300);

    const handleWeightChange = (value: string) => {
        setWeight(value)
        debouncedUpdateSet(set.id, { weight: Number(value) });
    }

    const handleRepsChange = (value: string) => {
        setReps(value)
        debouncedUpdateSet(set.id, { reps: Number(value) });
    }

    const handleDeleteSet = (id: string) => {
        deleteSet(id)
    }
    console.log('set', set)

    const renderRightActions = () => {
        return (
            <CustomButton
                onPress={() => deleteSet(set.id)}
                title='Delete'
                type='link'
                style={{ width: 'auto', padding: 5 }}
                color='crimson'
            />
        )
    }

    return (

            <Swipeable
                renderRightActions={renderRightActions}
            >
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
                            onChangeText={handleWeightChange}
                        />
                        <TextInput
                            value={reps}
                            keyboardType='numeric'
                            onChangeText={handleRepsChange}
                            style={styles.input} />
                    </View>
                </View>
            </Swipeable>

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