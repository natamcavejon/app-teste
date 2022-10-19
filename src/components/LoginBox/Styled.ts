import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const style = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 25,
    width: '93%',
    height: 240,
    position: 'relative',
    borderWidth: 1,
    borderColor: theme.colors.gray
  },
  containerInputs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginTop: 20,
    paddingBottom: 5
  },
  containerInputs2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 20,
    paddingBottom: 5
  },
  textLabel: {
    backgroundColor: theme.colors.primary,
    width: 80,
    height: 50,
    alignItems: 'center',
    textAlign: 'center',
    padding: 15,
    fontSize: 14,
    fontFamily: theme.fonts.light,
    color: theme.colors.white,
    fontWeight: 'bold',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25
  },
  Input: {
    position: 'relative',
    width: 240,
    height: 50,
    backgroundColor: '#EFEFEF',
    padding: 10,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25
  },
  scroll: {
    width: '100%',
    height: '100%'
  },
  labelError: {
    alignSelf: 'center',
    color: '#ff375b',
    marginLeft: 60
  },
  ButtonView: {
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10
  },
  Button: {
    backgroundColor: theme.colors.secondary,
    width: 170,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'column'
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
