import React, { createContext, useState, useEffect } from 'react'
import * as auth from '../services/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Props from '../services/auth'

interface AuthContextData {
  signed: Boolean
  signIn: (data: Props) => Promise<boolean>
  user: object | null
  signOut?: VoidFunction
  showError: Boolean
  loading: Boolean
  companyid: String
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null)
  const [loading, setLoading] = useState(true)
  const [showError, SetShowError] = useState(false)
  const [companyid, SetCompanyid] = useState('1')

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user')
      const storageToken = await AsyncStorage.getItem('@RNAuth:token')
      const companyid = await AsyncStorage.getItem('@RNAuth:company_id')

      if (companyid) {
        SetCompanyid(companyid)
      }

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }
    }

    loadStorageData()
  }, [])

  async function signIn(data: Props): Promise<boolean> {
    const response = await auth.signIn(data)

    if (response.token === 'error') {
      SetShowError(true)
      return false
    }
    SetShowError(false)
    setUser(response.user)

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user))
    await AsyncStorage.setItem(
      '@RNAuth:company_id',
      JSON.stringify(response.user.company_id)
    )
    await AsyncStorage.setItem('@RNAuth:token', response.token)

    return true
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null)
      SetShowError(false)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
        loading,
        showError,
        companyid
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
