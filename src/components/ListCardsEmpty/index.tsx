import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export function ListCardsEmpty() {
  return (
        <View style={styles.container}>
            <Text>
                Você não possui entregas
            </Text>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%'
  }
})
