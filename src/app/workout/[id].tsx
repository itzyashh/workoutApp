import { StyleSheet } from 'react-native'
import { Text, View } from '@/src/components/general/Themed'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {

    const {id} = useLocalSearchParams()

  return (
    <View>
      <Text>Page ID - {id}</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})