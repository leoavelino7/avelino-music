import { Link } from 'react-router-dom'

interface MenuItem {
  id: string
  text: string
  path: string
  Icon: React.FC
}

interface NavigationProps {
  title: string
  menuItems: MenuItem[]
  path: string
}

const Navigation: React.FC<NavigationProps> = ({ title, menuItems, path }) => (
  <nav className="lg:max-w-xs lg:w-full lg:absolute">
    <h3
      className={`
        hidden lg:block p-2 text-green-700 dark:text-green-400 my-8 mx-auto text-center font-sans font-medium tracking-tight text-2xl
      `}
    >
      {title}
    </h3>
    <ul className="flex justify-around lg:flex-col p-3 border-t-2 border-gray-200 border-opacity-5">
      {menuItems.map(menuItem => (
        <li key={menuItem.id} className="rounded-md lg:mb-1">
          <Link
            to={menuItem.path}
            className={`
              flex flex-col items-center py-2 px-3 lg:flex-row lg:px-5 font-medium text-gray-200 lg:text-black dark:text-gray-200 
              rounded-md transition duration-300 ease-in-out hover:bg-green-700 hover:text-white active:bg-green-700 ${
                menuItem.path === path && 'bg-gray-300 bg-opacity-10 lg:bg-green-700 lg:bg-opacity-40 dark:bg-gray-300 dark:bg-opacity-10'
              }`}
          >
            <menuItem.Icon />
            <span className="text-xs mt-1 lg:ml-5 lg:mt-0 lg:text-base">{menuItem.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default Navigation
