import React, { ReactNode } from 'react'
import { Dialog, Button, Portal } from 'react-native-paper'

import { theme } from '../../global/styles/theme'

import { styles } from './styles'

interface CustomModalProps {
  title: string
  showModal: boolean
  children: ReactNode
  buttonText: string
  isConfirmation: boolean
  hideDialog: () => void
  actionConfirmation?: () => Promise<void>
}

export function CustomModal({
  title,
  showModal,
  children,
  buttonText = 'Ok',
  hideDialog,
  isConfirmation,
  actionConfirmation
}: CustomModalProps): JSX.Element {
  async function handleActionConfirmation() {
    if (actionConfirmation != null) {
      await actionConfirmation()
      hideDialog()
    }
  }

  return (
    <Portal>
      <Dialog visible={showModal} onDismiss={hideDialog}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content style={styles.content}>{children}</Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          {(isConfirmation ?? false) && (
            <Button
              style={{ width: '50%' }}
              color={theme.colors.white}
              onPress={() => hideDialog()}
            >
              Cancelar
            </Button>
          )}
          <Button
            style={{ width: (isConfirmation ?? false) ? '50%' : '100%' }}
            color={theme.colors.white}
            onPress={async () => !isConfirmation ? hideDialog() : await handleActionConfirmation()}
          >
            {buttonText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
