import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './Styled'

export function MessegeBox(): JSX.Element {
  return (
    <View style={styles.ViewMain}>
      <Text style={styles.Text1}>Olá! Seja bem vindo(a)!</Text>
      <Text style={styles.Text2}>Insira seu nome e sua senha para logar.</Text>
    </View>
  )
}
