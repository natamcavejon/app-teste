import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Text, View, RefreshControl } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import { changeOrderStatus, IChangeStatusForm } from '../../services/orderService'
import { RootStackParamList } from '../RootStackParams'
import { CardOrder } from '../../components/CardOrder'
import { useLoading } from '../../hooks/useLoading'
import { Header } from '../../components/Header'
import { useOrder } from '../../hooks/useOrders'
import { useSnack } from '../../hooks/useSnack'
import { Load } from '../../components/Load'

import { styles } from './styles'
import { ListCardsEmpty } from '../../components/ListCardsEmpty'

type HomepageScreenProps = StackNavigationProp<RootStackParamList, 'Homepage'>

export function HomepageScreen(): JSX.Element {
  const { setSnack } = useSnack()
  const { listOrders, loadOrders } = useOrder()
  const { changeStatusLoading } = useLoading()
  const navigation = useNavigation<HomepageScreenProps>()

  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)

  async function fetchOrders(): Promise<void> {
    setLoading(true)
    try {
      await loadOrders()
    } catch (err: any) {
      setSnack({ label: 'Ok', message: err.message ?? 'Error', open: true })
    } finally {
      setLoading(false)
    }
  }

  async function handleCardAction(orderId: string, orderStatus: string) {
    if (orderStatus === '1') {
      return await handleUpdateCardStatus(orderId)
    }

    if (orderStatus === '2') {
      return await handleSendPicture(String(orderId))
    }
  }

  async function handleUpdateCardStatus(orderId: string) {
    const formData: IChangeStatusForm = { status: '2' }
    changeStatusLoading(true)
    try {
      await changeOrderStatus(orderId, formData)
      await loadOrders()
    } catch (err) {
      setSnack({ message: 'Erro ao atualizar status', label: 'Ok', open: true })
    } finally {
      changeStatusLoading(false)
    }
  }

  async function handleSendPicture(orderId: string) {
    navigation.navigate('CameraRegister', { orderId })
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchOrders()
    setSnack({
      label: 'Ok',
      message: 'Ordens atualizadas com sucesso',
      open: true
    })
    setRefreshing(false)
  }, [])

  useEffect(() => {
    fetchOrders().catch((err: any) => {
      setSnack({ label: 'Ok', message: err.message, open: true })
    })
  }, [])

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.headerOrdersList}>Conferência de mercadorias</Text>
      <View style={styles.homeWrapper}>
        {loading ? (
          <Load />
        ) : (
          <FlatList
            data={listOrders}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
            ListEmptyComponent={<ListCardsEmpty />}
            numColumns={1}
            renderItem={({ item }) => (
              <CardOrder
                orderId={item.idpedido}
                clientePedido={item.cliente}
                numNotaPedido={item.numnota}
                orderStatus={item.status}
                enderecoPedido={item.endereco}
                telefonePedido={item.telefone}
                callCameraScreen={handleCardAction}
              />
            )}
            style={styles.ordersList}
          />
        )}
      </View>
    </View>
  )
}
