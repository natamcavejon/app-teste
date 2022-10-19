import React from 'react'
// import { RootStackParamList } from '../../screens/RootStackParams'
// import { StackNavigationProp } from '@react-navigation/stack'
// import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, View, Text } from 'react-native'
import { styles } from './Styled'
import { signIn } from '../../services/auth'

// type HelloScreenProps = StackNavigationProp<RootStackParamList, 'Hello'>

export function ButtonLogin(): JSX.Element {
  // const navigation = useNavigation<HelloScreenProps>()
  async function handleSignIn() {
    const response = await signIn()
  }
  return (
    <View>
      <TouchableOpacity style={styles.Button} onPress={handleSignIn}>
        <Text style={styles.Text1}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}
