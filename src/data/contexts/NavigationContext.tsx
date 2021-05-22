import { createContext } from 'react'
import { useNavigation, MenuItem } from '../hooks/useNavigation'

// Icons
import SearchIcon from '../../ui/components/icons/SearchIcon'
import MusicIcon from '../../ui/components/icons/MusicIcon'

export const NavigationContext = createContext<[menuItems: MenuItem[], setMenuItems: React.Dispatch<any>]>([[], () => null])

interface NavigationProviderProps {
  children: React.ReactNode
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [menuItems, setMenuItems] = useNavigation([
    { id: '1', text: 'Buscar', path: '/', Icon: SearchIcon },
    { id: '2', text: 'Minha Playlist', path: '/playlist', Icon: MusicIcon }
  ])

  return <NavigationContext.Provider value={[menuItems, setMenuItems]}>{children}</NavigationContext.Provider>
}
