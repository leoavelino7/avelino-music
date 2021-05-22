import { useState } from 'react'

// Components
import Navigation from '../components/Navigation'
import AudioPlayer, { AudioPlayerProps } from '../components/AudioPlayer'

// Icons
import SearchIcon from '../components/icons/SearchIcon'
import MusicIcon from '../components/icons/MusicIcon'

const menuItems = [
  {
    id: '1',
    text: 'Buscar',
    path: '/',
    Icon: SearchIcon
  },
  {
    id: '2',
    text: 'Minha Playlist',
    path: '/playlist',
    Icon: MusicIcon
  }
]

const Home: React.FC = () => {
  const [selectedAudio] = useState<AudioPlayerProps>()

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="grid grid-rows-3 grid-cols-12 flex-grow">
        <header className="col-span-2 lg:col-span-3 row-span-3 hidden lg:flex relative  bg-gray-50 dark:bg-black">
          <Navigation title="Avelino Music" menuItems={menuItems} path="/" />
        </header>
        <div className="col-span-12 lg:col-span-9 row-span-3 px-3 lg:px-5 bg-white lg:bg-gray-200 dark:bg-black lg:dark:bg-customBlack" />
      </div>
      <div className="fixed bottom-0 w-full bg-customBlack">
        {selectedAudio && (
          <AudioPlayer
            audioSrc={selectedAudio.audioSrc}
            image={selectedAudio.image}
            mainText={selectedAudio.mainText}
            secondaryText={selectedAudio.secondaryText}
          />
        )}

        <Navigation title="Avelino Music" menuItems={menuItems} path="/" />
      </div>
    </div>
  )
}

export default Home
