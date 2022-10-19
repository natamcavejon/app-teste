import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: getStatusBarHeight() + 55,
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center'
  },

  image: {
    marginTop: -5,
    width: 180,
    height: 50,
    resizeMode: 'stretch'
  }
})
