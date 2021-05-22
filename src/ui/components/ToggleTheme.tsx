import { useTheme } from '../../data/hooks/useTheme'
import MoonIcon from './icons/MoonIcon'

const ToogleTheme: React.FC = () => {
  const [, toggleTheme] = useTheme()

  return (
    <button type="button" onClick={toggleTheme} className="outline-none focus:outline-none text-black dark:text-white p-0">
      <span className="hidden">Mudar tema</span>
      <MoonIcon />
    </button>
  )
}

export default ToogleTheme
