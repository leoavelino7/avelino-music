import { useEffect, useState } from 'react'
import { getAuthCode, isAuthExpired, signWithSpotify } from '../clients/SpotifyClient'

export function useAuth(): [boolean, boolean, () => void] {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [signed, setSigned] = useState<boolean>(true)

  const checkIsSigned = (): void => {
    getAuthCode()

    const isExpired = isAuthExpired()

    setSigned(!isExpired)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    checkIsSigned()
  }, [])

  return [isLoading, signed, signWithSpotify]
}
