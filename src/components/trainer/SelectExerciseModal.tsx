import { FlatList, Modal, Pressable, StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Text, TextInput, useThemeColor, View } from '../general/Themed'
import CustomButton from '../general/CustomButton'
import Card from '../general/Card'
import { AntDesign } from '@expo/vector-icons'
import { dummyExercises } from '@/data/dummyexercises'

type SelectExerciseModalProps = {
    onExerciseSelect?: (exercise: any) => void
}

const SelectExerciseModal: FC<SelectExerciseModalProps> = ({ onExerciseSelect }) => {

    const [visibility, setVisibility] = useState(false)
    const [exercises, setExercises] = useState(dummyExercises)
    const [search, setSearch] = useState('')

    useEffect(() => {
        const filteredExercises = dummyExercises.filter((exercise) => {
            return exercise.name.toLowerCase().includes(search.toLowerCase())
        })

        if (search === '') {
            setExercises(dummyExercises)
        } else {
            setExercises(filteredExercises)
        }

    }, [search])

    const onClose = () => {
        setVisibility(false)
    }

    const onOpen = () => {
        setVisibility(true)
    }

    const onSelect = (exercise: any) => {
        onExerciseSelect && onExerciseSelect(exercise)
        setVisibility(false)
    }

    const easyColor = useThemeColor({}, 'easy')
    const mediumColor = useThemeColor({}, 'medium')
    const hardColor = useThemeColor({}, 'hard')

    const colorToApply = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner':
                return easyColor
            case 'Intermediate':
                return mediumColor
            case 'Advanced':
                return hardColor
            default:
                return undefined
        }
    }

    return (
        <View>
            <CustomButton title="Add Exercise" onPress={onOpen} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={visibility}
                onRequestClose={onClose}
            >
                <View style={styles.overlay}>
                    <Card title='Select Exercise' style={styles.container}>
                        <AntDesign onPress={onClose} name="closecircle" style={styles.closeIcon} size={24} color={useThemeColor({}, 'text')} />

                        <TextInput placeholder="Search Exercise" style={styles.search} value={search} onChangeText={setSearch} placeholderTextColor={'grey'} />

                        <FlatList
                            data={exercises}
                            keyExtractor={item => item.name}
                            contentContainerStyle={{ gap: 20 }}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => onSelect(item)}>
                                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <CustomButton title={item.difficulty} style={styles.difficulty} type="link" color={colorToApply(item.difficulty)} />
                                    </View>
                                    <Text style={styles.muscleGroup}>{item.muscleGroup} - Machine: {item.machine}</Text>
                                </Pressable>
                            )}
                        />
                    </Card>
                </View>
            </Modal>

        </View>
    )
}

export default SelectExerciseModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container: {
        width: '90%',
        height: '70%',
    },
    closeIcon: {
        position: 'absolute',
        top: 15,
        right: 20
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    muscleGroup: {
        fontSize: 15
    },
    difficulty: {
        width: 'auto',
        padding: 7,
    },
    search: {
        padding: 10,

        borderColor: 'lightgrey',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20
    }
})