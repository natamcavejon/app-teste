import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  homeWrapper: {
    flex: 1
    // justifyContent: 'center',
    // alignContent: 'center',
    // backgroundColor: 'red'
  },
  headerOrdersList: {
    marginVertical: 12,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: theme.fonts.bold
  },
  ordersList: {
    // marginTop: 12,
    marginHorizontal: 24
  }
})
