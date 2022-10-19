/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { RootStackParamList } from '../screens/RootStackParams'

import { LoginpageScreen } from '../screens/Loginpage'
import { HomepageScreen } from '../screens/Homepage'
import { CameraRegister } from '../screens/CameraRegister'

import AuthContext from '../hooks/useAuth'

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

export function RouterNavigation(): JSX.Element {
  const { signed } = useContext(AuthContext)

  return (
    <NavigationContainer>
      <Navigator>
        {!signed ? (
          <Screen
            name="Loginpage"
            component={LoginpageScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Screen
              name="Homepage"
              component={HomepageScreen}
              options={{ headerShown: false }}
            />
            <Screen
              name="CameraRegister"
              component={CameraRegister}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  )
}
