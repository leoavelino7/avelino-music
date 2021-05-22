import { createContext, useReducer } from 'react'
import { initialState, playlistReducer, State, Action } from '../reducers/playlistReducer'

export const PlaylistContext = createContext<[state: State, dispatch: React.Dispatch<Action>]>([initialState, () => null])

interface PlaylistProviderProps {
  children: React.ReactNode
}

export const PlaylistProvider: React.FC<PlaylistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(playlistReducer, initialState)

  return <PlaylistContext.Provider value={[state, dispatch]}>{children}</PlaylistContext.Provider>
}
