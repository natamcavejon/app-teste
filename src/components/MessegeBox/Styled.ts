import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  ViewMain: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '93%',
    height: 100,
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    textAlign: 'center',
    marginBottom: 15
  },
  Text1: {
    fontSize: 25,
    fontFamily: theme.fonts.light,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.colors.white,
    padding: 15,
    paddingBottom: 5
  },
  Text2: {
    fontFamily: theme.fonts.light,
    fontSize: 14,
    alignItems: 'center',
    textAlign: 'center',
    color: theme.colors.white
  }
})
