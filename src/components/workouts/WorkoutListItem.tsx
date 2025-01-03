import { StyleSheet } from 'react-native'
import React from 'react'
import { Text, useThemeColor, View } from '@/components/general/Themed'
import Card from '../general/Card'
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'

const WorkoutListItem = () => {
    const separatorColor = useThemeColor({}, 'separator')
    return (
        <Card title="Workout" style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold' }}>Exercise</Text>
                <Text style={{ fontWeight: 'bold' }}>Best Set</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'gray' }}>3 x Barbell Row</Text>
                <Text style={{ color: 'gray' }}>7 x 75kg</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'gray' }}>3 x Barbell Row</Text>
                <Text style={{ color: 'gray' }}>7 x 75kg</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'gray' }}>3 x Barbell Row</Text>
                <Text style={{ color: 'gray' }}>7 x 75kg</Text>
            </View>

            <View style={{ flexDirection: 'row',

                 gap: 22, borderTopWidth: 1, borderColor: separatorColor
                 , paddingTop: 8, marginTop: 8 }}>

                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <Fontisto name="clock" size={15} color="gray" />
                    <Text style={{}}>00:00</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <MaterialCommunityIcons name="weight-kilogram" size={17} color="gray" />
                    <Text style={{}}>1200 kg</Text>
                </View>
            </View>

        </Card>
    )
}

export default WorkoutListItem

const styles = StyleSheet.create({})