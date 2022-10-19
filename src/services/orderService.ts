import { api } from './api'

export interface ISubmitOrder {
  status: string
  foto: string
  latitude: number
  longitude: number
}

export interface IChangeStatusForm {
  status: string
}

export async function changeOrderStatus(orderId: string, formData: IChangeStatusForm) {
  try {
    const { data } = await api.put(`/order/updatestatus/${orderId}`, formData)
    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export async function submitOrderService(orderId: string, formData: ISubmitOrder) {
  try {
    const { data } = await api.put(`/order/updatetodown/${orderId}`, formData)
    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}
