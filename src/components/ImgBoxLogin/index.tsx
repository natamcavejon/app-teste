import React from 'react'
import { View, Image } from 'react-native'
import { styles } from './Styled'

export function ImgBoxLogin(): JSX.Element {
  return (
    <View style={styles.ContainerImg}>
      <View style={styles.Img1}>
        <Image
          style={styles.img2}
          source={require('../../image/Entregae_logo.png')}
        ></Image>
        <Image
          style={styles.img}
          source={require('../../image/div_banner_marca.png')}
        ></Image>
      </View>
    </View>
  )
}
