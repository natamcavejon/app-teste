/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { Order } from '../models/Order.model'
import { api } from '../services/api'
import AuthContext from './useAuth'
import { useSnack } from './useSnack'

export interface OrderContextData {
  loadingOrders: boolean
  listOrders: Order[]
  loadOrders: () => Promise<void>
}

interface OrderProviderProps {
  children: ReactNode
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData)

function OrderContextProvider({ children }: OrderProviderProps): JSX.Element {
  const { companyid } = useContext(AuthContext)
  const { setSnack } = useSnack()
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [listOrders, setListOrders] = useState<Order[]>([])

  async function loadOrders(): Promise<void> {
    try {
      setLoadingOrders(true)
      const { data } = await api.get<Order[]>('ordertoday/1')
      setListOrders(data)
    } catch (err) {
      setSnack({
        label: 'OK',
        message: 'Erro ao carregar ordens de serviço',
        open: false
      })
    } finally {
      setLoadingOrders(false)
    }
  }

  useEffect(() => {
    void loadOrders()
  }, [])
  return (
    <OrderContext.Provider
      value={{
        loadingOrders,
        listOrders,
        loadOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

function useOrder(): OrderContextData {
  const context = useContext(OrderContext)

  return context
}

export { OrderContextProvider, useOrder }
