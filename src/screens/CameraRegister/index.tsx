import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import * as Location from 'expo-location'
import type { RouteProp } from '@react-navigation/native'

import { RootStackParamList } from '../RootStackParams'
import { useLoading } from '../../hooks/useLoading'
import { theme } from '../../global/styles/theme'

import { styles } from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ISubmitOrder, submitOrderService } from '../../services/orderService'
import { useSnack } from '../../hooks/useSnack'
import { Load } from '../../components/Load'
import { StackNavigationProp } from '@react-navigation/stack'

type CameraRegisterScreenProps = RouteProp<RootStackParamList, 'CameraRegister'>
type CameraRegisterNavigationProps = StackNavigationProp<RootStackParamList, 'Homepage'>

export function CameraRegister() {
  const route = useRoute<CameraRegisterScreenProps>()
  const navigation = useNavigation<CameraRegisterNavigationProps>()
  const { orderId } = route.params

  const { statusLoading, changeStatusLoading } = useLoading()
  const { setSnack } = useSnack()

  const [actualLocation, setActualLocation] = useState<Location.LocationObject>()
  const [hasPicturePreview, setHasPicturePreview] = useState(false)
  const [capturedPicture, setCapturedPicture] = useState<ImagePicker.ImageInfo | null>()

  async function resetCamera() {
    setHasPicturePreview(false)
    setCapturedPicture(null)

    return await takePhoto()
  }

  async function takePhoto() {
    const photo = await ImagePicker.launchCameraAsync({ base64: true, quality: 0.2 })
    if (!photo.cancelled) {
      setCapturedPicture(photo)
      const currentPosition = await Location.getCurrentPositionAsync()
      if (currentPosition != null) setActualLocation(currentPosition)
    } else {
      setSnack({ message: 'Você precisa selecionar uma foto para concluir a entrega', label: 'Ok', open: true })
    }
  }

  useEffect(() => {
    if (capturedPicture?.uri != null) {
      setHasPicturePreview(true)
    }
  }, [capturedPicture])

  function createSubmitOrderDAO(coords: Location.LocationObjectCoords): ISubmitOrder {
    return {
      status: '3',
      foto: capturedPicture?.base64 ?? '',
      latitude: coords.latitude,
      longitude: coords.longitude
    }
  }

  async function submitPhoto() {
    if (actualLocation == null) {
      return
    }
    const orderDAO = createSubmitOrderDAO(actualLocation.coords)

    changeStatusLoading(true)

    try {
      await submitOrderService(orderId, orderDAO)

      navigation.navigate('Homepage')
    } catch (err: any) {
      setSnack({ label: 'Ok', message: err.message, open: true })
    } finally {
      changeStatusLoading(false)
    }
  }

  useEffect(() => {
    takePhoto()
  }, [])

  return statusLoading || !hasPicturePreview
    ? <Load />
    : (
      <View style={styles.container}>
        <View style={styles.previewPictureContainer}>
          <View style={styles.previewPicture}>
            <ImageBackground
              source={{ uri: capturedPicture?.uri }}
              style={{
                flex: 1
              }}
            >
              <Text style={styles.title}>Foto</Text>
            </ImageBackground>
          </View>
          <View
            style={{
              marginTop: 36
            }}
          >
            <View style={{ marginBottom: 8 }}>
              <Button
                onPress={async () => await submitPhoto()}
                style={styles.primaryButton}
                loading={statusLoading}
                disabled={statusLoading}
              >
                <Text style={{ color: '#fff' }}>
                  Enviar foto
                </Text>
              </Button>
            </View>
            <View>
              <Button
                onPress={async () => await resetCamera()}
                mode="outlined"
                style={styles.secondaryButton}
                loading={statusLoading}
                disabled={statusLoading}
              >
                <Icon name="camera" size={20} color="#000" />
                <View style={{ width: 12, height: 1 }} />
                <Text style={{ color: theme.colors.primary, paddingLeft: 16 }}>
                  Tirar nova foto
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
      )
}
