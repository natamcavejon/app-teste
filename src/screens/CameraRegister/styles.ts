import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  cameraContainer: {
    flex: 1, width: '100%'
  },

  cameraActions: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },

  flexButton: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },

  buttonContainer: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center'
  },

  takePictureButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff'
  },

  previewPictureContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },

  previewPicture: {
    height: '80%'
  },

  title: {
    flex: 1,
    color: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '2%',
    backgroundColor: 'transparent',
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '900'
  },

  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    marginRight: 32,
    marginLeft: 32
  },

  secondaryButton: {
    borderRadius: 8,
    marginTop: 5,
    marginRight: 32,
    marginLeft: 32
  }
})
