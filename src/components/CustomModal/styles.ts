import { theme } from './../../global/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: theme.fonts.bold
  },
  content: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: theme.fonts.regular
  },
  actions: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center'
  }
})
