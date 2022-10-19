/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react'
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'
import { style } from './Styled'
import AuthContext from '../../hooks/useAuth'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ErrorMessage from '../ErrorUser'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../screens/RootStackParams'

const schema = yup.object({
  user: yup.string().required('Informe seu nome!'),
  password: yup.string().required('Informe seu senha!')
})

interface Data {
  user: string
  password: string
}

type LoginpageScreenProps = StackNavigationProp<RootStackParamList, 'Loginpage'>

export function LoginBox(): JSX.Element {
  const { signed, signIn, user, showError } = useContext(AuthContext)
  const navigation = useNavigation<LoginpageScreenProps>()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  async function handleSignIn(data: Data) {
    try {
      const ret = await signIn(data)

      if (ret) {
        navigation.navigate('Homepage')
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
  return (
    <View style={style.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={style}
      >
        <View style={style.containerInputs}>
          <Text style={style.textLabel}>Nome</Text>
          <Controller
            control={control}
            name="user"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  style.Input,
                  {
                    borderWidth: errors.user && 1,
                    borderColor: errors.user && '#ff375b'
                  }
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              ></TextInput>
            )}
          />
        </View>
        {errors.user && (
          <Text style={style.labelError}>{errors.user?.message}</Text>
        )}
        <View style={style.containerInputs2}>
          <Text style={style.textLabel}>Senha</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  style.Input,
                  {
                    borderWidth: errors.password && 1,
                    borderColor: errors.password && '#ff375b'
                  }
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              ></TextInput>
            )}
          />
        </View>
        {errors.password && (
          <Text style={style.labelError}>{errors.password?.message}</Text>
        )}
        <View style={style.ButtonView}>
          <TouchableOpacity
            style={style.Button}
            onPress={handleSubmit(handleSignIn)}
          >
            <Text style={style.Text1}>Login</Text>
          </TouchableOpacity>
          <ErrorMessage />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
