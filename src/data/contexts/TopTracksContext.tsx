import { createContext, useReducer } from 'react'
import { initialState, topTracksReducer, State } from '../reducers/topTracksReducer'

export const TopTracksContext = createContext<[state: State, dispatch: React.Dispatch<any>]>([initialState, () => null])

interface TopTracksProviderProps {
  children: React.ReactNode
}

export const TopTracksProvider: React.FC<TopTracksProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(topTracksReducer, initialState)

  return <TopTracksContext.Provider value={[state, dispatch]}>{children}</TopTracksContext.Provider>
}
