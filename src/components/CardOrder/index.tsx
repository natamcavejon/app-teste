import React, { useState } from 'react'

import { TouchableOpacity, View } from 'react-native'
import { Card, IconButton, Paragraph } from 'react-native-paper'

import { CardStatusControl } from '../CardStatusControl'
import { useSnack } from '../../hooks/useSnack'
import { CustomModal } from '../CustomModal'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

export interface CardOrderProps {
  orderId: number
  clientePedido: string
  numNotaPedido: number
  orderStatus: string
  enderecoPedido: string
  telefonePedido: string
  callCameraScreen: (orderId: string, orderStatus: string) => Promise<void>
}

const LeftContent = (props: any): JSX.Element => (
  <IconButton
    {...props}
    color={theme.colors.primary}
    style={{ backgroundColor: '#FFFFFF' }}
    icon="file"
    size={30}
  />
)

export function CardOrder({
  orderId,
  clientePedido,
  numNotaPedido,
  orderStatus,
  enderecoPedido,
  telefonePedido,
  callCameraScreen
}: CardOrderProps): JSX.Element {
  const [showCardInfoModal, setShowCardInfoModal] = useState<boolean>(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)

  const { setSnack } = useSnack()

  function hideModal(): void {
    setShowCardInfoModal(!showCardInfoModal)
  }

  function handleOpenCardInfo(): void {
    setShowCardInfoModal(true)
  }

  async function triggerSubmitPicture() {
    await callCameraScreen(String(orderId), orderStatus)
  }

  async function handleSubmitPicture(): Promise<void> {
    try {
      setShowConfirmationModal(true)
    } catch (err: any) {
      setSnack({ label: 'Ok', message: err.message, open: true })
    }
  }

  return (
    <Card mode="elevated" elevation={8} style={styles.container}>
      <CardStatusControl status={orderStatus} />
      <Card.Title
        title={numNotaPedido}
        left={LeftContent}
        style={styles.cardHeader}
      />
      <Card.Content>
        <Paragraph
          numberOfLines={1}
          style={{ textAlign: 'left', marginLeft: 14, marginBottom: 10 }}
        >
          {clientePedido}
        </Paragraph>
      </Card.Content>
      <Card.Actions style={styles.cardFooter}>
        <TouchableOpacity onPress={handleOpenCardInfo}>
          <IconButton
            color={theme.colors.white}
            style={styles.btnAction}
            icon="magnify-plus"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => await handleSubmitPicture()}>
          <IconButton
            color={theme.colors.white}
            style={styles.btnAction}
            icon={orderStatus === '1' ? 'send' : orderStatus === '2' ? 'camera' : ''}
          />
        </TouchableOpacity>
      </Card.Actions>
        {/* Info modal */}
        <CustomModal
          showModal={showCardInfoModal}
          hideDialog={hideModal}
          title={`Ordem de serviço - ${orderId}`}
          buttonText="Ok"
          isConfirmation={false}
        >
          <View>
            <Paragraph>Número Nota Pedido: {numNotaPedido}</Paragraph>
            <Paragraph>Cliente: {clientePedido}</Paragraph>
            <Paragraph>Telefone cliente: {telefonePedido}</Paragraph>
            <Paragraph>Endereço entrega: {enderecoPedido}</Paragraph>
          </View>
        </CustomModal>

        {/* Confirmation modal */}
        <CustomModal
          showModal={showConfirmationModal}
          title={orderStatus === '1' ? 'Deseja iniciar a entrega?' : orderStatus === '2' ? 'Deseja registrar a entrega?' : ''}
          buttonText='Ok'
          isConfirmation
          hideDialog={() => setShowConfirmationModal(false)}
          actionConfirmation={async () => await triggerSubmitPicture()}
        >
          <View>
            <Paragraph>
              Cliente: {clientePedido}
            </Paragraph>
          </View>
        </CustomModal>
    </Card>
  )
}
