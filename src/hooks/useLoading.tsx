/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { Load } from '../components/Load'

interface LoadingContextData {
  statusLoading: boolean
  changeStatusLoading: (status: boolean) => void
}

interface LoadingContextProviderProps {
  children: ReactNode
}

const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData)

function LoadingContextProvider({ children }: LoadingContextProviderProps) {
  const [statusLoading, setStatusLoading] = useState(false)

  function changeStatusLoading(status: boolean): void {
    setStatusLoading(status)
  }

  const contextData = useMemo(() => ({
    statusLoading,
    changeStatusLoading
  }), [statusLoading, changeStatusLoading])

  return (
        <LoadingContext.Provider value={contextData}>
            {statusLoading ? <Load /> : children}
        </LoadingContext.Provider>
  )
}

function useLoading() {
  const context = useContext(LoadingContext)
  return context
}

export { LoadingContextProvider, useLoading }
