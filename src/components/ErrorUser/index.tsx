import React, { useContext } from 'react'
import { Text, StyleSheet } from 'react-native'
import AuthContext from '../../hooks/useAuth'

const style = StyleSheet.create({
  TextError: {
    padding: 2,
    color: '#ff375b',
    fontWeight: 'bolt'
  }
})

function ErrorMessage() {
  const { showError } = useContext(AuthContext)
  if (showError) {
    return <Text style={style.TextError}>Usuário ou senha inválidos</Text>
  }
  return <Text></Text>
}
export default ErrorMessage
