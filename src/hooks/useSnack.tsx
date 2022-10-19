/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Snackbar } from 'react-native-paper'
import { theme } from '../global/styles/theme'

interface SnackType {
  message: string
  label: string
  open: boolean
}

interface SnackContextData {
  snack: SnackType
  setSnack: (snack: SnackType) => void
}

interface SnackProviderProps {
  children: ReactNode
}

export const SnackbarContext = createContext<SnackContextData>(
  {} as SnackContextData
)
function SnackProvider({ children }: SnackProviderProps): JSX.Element {
  const [snack, setSnack] = useState<SnackType>({} as SnackType)

  function onDismissSnackBar(): void {
    setSnack({ message: '', open: false, label: '' })
  }

  return (
    <SnackbarContext.Provider
      value={{
        snack,
        setSnack
      }}
    >
      {children}
      <Snackbar
        theme={{ colors: { accent: 'white' } }}
        style={{
          flex: 1,
          backgroundColor: theme.colors.primary,
          marginBottom: 60
        }}
        visible={snack.open}
        onDismiss={onDismissSnackBar}
        action={{
          label: snack.label,
          onPress: () => {
            // Do something
          }
        }}
      >
        {snack.message}
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

function useSnack(): SnackContextData {
  const context = useContext(SnackbarContext)

  return context
}

export { SnackProvider, useSnack }
