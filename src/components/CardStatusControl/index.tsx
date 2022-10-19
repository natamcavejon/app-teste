import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../../global/styles/theme'

import { styles } from './styles'

interface CardStatusControlProps {
  status: string
}

export function CardStatusControl({ status }: CardStatusControlProps): JSX.Element {
  switch (status) {
    case '1':
      return (
        <View style={styles.statusControl}>
          <Text style={styles.textStatusControl}>EM PREPARAÇÃO</Text>
        </View>
      )
    case '2':
      return (
        <View style={[styles.statusControl, { backgroundColor: theme.colors.info }]}>
          <Text style={styles.textStatusControl}>EM ROTA DE ENTREGA</Text>
        </View>
      )
    case '3':
      return (
        <View style={[styles.statusControl, { backgroundColor: theme.colors.success }]}>
          <Text style={styles.textStatusControl}>ENTREGUE</Text>
        </View>
      )
    default:
      return (<></>)
  }
}
