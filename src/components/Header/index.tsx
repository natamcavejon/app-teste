import React from 'react'
import { View, Image } from 'react-native'

import { styles } from './styles'

export function Header(): JSX.Element {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/entregae_branca.png')} style={styles.image}/>
    </View>
  )
}
