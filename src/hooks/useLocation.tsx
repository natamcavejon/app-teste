/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import * as Location from 'expo-location'

interface LocationContextData {
  actualLocation: Location.LocationObjectCoords
  updateCurrentLocation: () => void
}

interface LocationProviderProps {
  children: ReactNode
}

export const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData
)
function LocationProvider({ children }: LocationProviderProps): JSX.Element {
  const [actualLocation, setActualLocation] = useState<Location.LocationObjectCoords>({} as Location.LocationObjectCoords)

  async function updateCurrentLocation(): Promise<void> {
    const permission = await Location.getForegroundPermissionsAsync()
    if (!permission.granted) {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (!granted) {
        return
      }
    }
    const location = await Location.getCurrentPositionAsync()
    setActualLocation(location.coords)
  }

  useEffect(() => {
    updateCurrentLocation()
  }, [])

  return (
    <LocationContext.Provider
      value={{ actualLocation, updateCurrentLocation }}
    >
      {children}
    </LocationContext.Provider>
  )
}

function useLocation(): LocationContextData {
  const context = useContext(LocationContext)

  return context
}

export { LocationProvider, useLocation }
