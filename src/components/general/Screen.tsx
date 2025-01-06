import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

type ScreenProps = {
    children: React.ReactNode
}

const Screen:FC<ScreenProps> = ({ children }) => {
  return (
    <View style={styles.container}>
        {children}
    </View>
  )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        backgroundColor: undefined,
      },
})