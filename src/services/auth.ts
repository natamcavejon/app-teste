import { api } from './api'

interface Return {
  token: string
  user: {
    user: string
    company_id: string
  }
}

export default interface Props {
  user: string
  password: string
}

export async function signIn(props: Props): Promise<Return> {
  try {
    const token = await api.post('users/login', props)
    const ret: Return = {
      token: token.data.token,
      user: {
        user: props.user,
        company_id: token.data.company_id
      }
    }
    return ret
  } catch (er) {
    return {
      token: 'error',
      user: {
        user: props.user,
        company_id: 'falied to get users token and company'
      }
    }
  }
}
