import { useState } from 'react'

// Components
import Navigation from '../components/Navigation'
import AudioPlayer, { AudioPlayerProps } from '../components/AudioPlayer'
import SignInForm from '../components/SignInForm'
import SearchForm from '../components/SearchForm'
import ToogleTheme from '../components/ToggleTheme'

// Icons
import SearchIcon from '../components/icons/SearchIcon'
import MusicIcon from '../components/icons/MusicIcon'

// Others
const minCharsQuery = 3

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
  const [signed] = useState(true)
  const [isOpenTopTracks] = useState(false)
  const [queryApproved] = useState(true)

  const signWithSpotify = (): void => {
    console.log('login')
  }

  const handleSearch = (): void => {
    console.log('handle search')
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="grid grid-rows-3 grid-cols-12 flex-grow">
        <header className="col-span-2 lg:col-span-3 row-span-3 hidden lg:flex relative  bg-gray-50 dark:bg-black">
          <Navigation title="Avelino Music" menuItems={menuItems} path="/" />
        </header>
        <div className="col-span-12 lg:col-span-9 row-span-3 px-3 lg:px-5 bg-white lg:bg-gray-200 dark:bg-black lg:dark:bg-customBlack">
          {!signed && <SignInForm onSubmit={signWithSpotify} />}

          {signed && (
            <>
              <section className="flex justify-between items-center">
                <div>
                  <SearchForm
                    inputProps={{
                      type: 'search',
                      name: 'search',
                      placeholder: 'Título, artista, gênero musical...',
                      disabled: isOpenTopTracks
                    }}
                    onHandleSearch={handleSearch}
                  />
                  {!isOpenTopTracks && !queryApproved && (
                    <div className="flex items-center bg-red-500 text-white text-sm font-normal px-4 py-3 rounded-sm mt-2" role="alert">
                      <p>Por favor, escreva ao menos {minCharsQuery} caracteres para realizar uma busca</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-row justify-center">
                  <ToogleTheme />
                </div>
              </section>
            </>
          )}
        </div>
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
