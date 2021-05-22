import { createContext, useReducer } from 'react'
import { initialState, spotifySearchResponseReducer, State, Action } from '../reducers/spotifySearchResponseReducer'

export const SpotifySearchResponseContext = createContext<[state: State, dispatch: React.Dispatch<Action>]>([initialState, () => null])

interface SpotifySearchResponseProviderProps {
  children: React.ReactNode
}

export const SpotifySearchResponseProvider: React.FC<SpotifySearchResponseProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(spotifySearchResponseReducer, initialState)

  return <SpotifySearchResponseContext.Provider value={[state, dispatch]}>{children}</SpotifySearchResponseContext.Provider>
}
