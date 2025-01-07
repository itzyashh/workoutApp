import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'

type ScreenProps = {
    children: React.ReactNode
}

const Screen:FC<ScreenProps> = ({ children }) => {

  const headerHeight = useHeaderHeight()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
    style={styles.container}>
        {children}
    </KeyboardAvoidingView>
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