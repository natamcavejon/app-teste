import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  Button: {
    backgroundColor: theme.colors.secondary,
    width: 144,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 150
  },
  Text1: {
    fontSize: 18,
    fontFamily: theme.fonts.light,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.colors.white,
    padding: 12,
    paddingBottom: 5
  }
})
