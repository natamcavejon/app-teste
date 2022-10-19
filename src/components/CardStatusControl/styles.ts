import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  statusControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.error,
    marginBottom: -10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    color: theme.colors.heading
  },
  textStatusControl: {
    color: '#FFFFFF'
  }
})
