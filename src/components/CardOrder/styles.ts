import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 190,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10
  },

  cardHeader: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'center'
  },

  cardFooter: {
    justifyContent: 'space-between',
    marginHorizontal: 12
    // width: '100%'
  },

  btnAction: {
    width: 80,
    backgroundColor: theme.colors.primary,
    borderRadius: 12
  }
})
