import { StyleSheet } from 'react-native'

import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View } from '@/components/general/Themed'

const Page = () => {

  const { id } = useLocalSearchParams()

  return (
    <View>
      <Text>Page ID - {id}</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})