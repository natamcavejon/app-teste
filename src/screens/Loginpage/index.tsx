import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { MessegeBox } from '../../components/MessegeBox/index'
import { styles } from './Style'
import { LoginBox } from '../../components/LoginBox'
import { ImgBoxLogin } from '../../components/ImgBoxLogin'

export function LoginpageScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <ImgBoxLogin />
        <MessegeBox />
        <LoginBox />
      </ScrollView>
    </View>
  )
}
