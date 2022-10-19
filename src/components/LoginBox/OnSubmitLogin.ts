import httpClient from '../../services/httpClient'
import { FormValues } from './index'

export async function OnSubmitLogin(formValues: FormValues) {
  try {
    const result = await httpClient.post('/users/login', formValues)

    return result
  } catch (err) {
    throw new Error('Falha ao realizar login!')
  }
}
