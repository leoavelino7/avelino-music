import { useState, useContext, useEffect } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { useRouteMatch } from 'react-router'

// Context
import { SpotifySearchResponseContext } from '../../data/contexts/SpotifySearchResponseContext'
import { TopTracksContext } from '../../data/contexts/TopTracksContext'
import { PlaylistContext } from '../../data/contexts/PlaylistContext'
import { NavigationContext } from '../../data/contexts/NavigationContext'

// Hooks
import { useAuth } from '../../data/hooks/useAuth'
import { useAudioPlayer } from '../../data/hooks/useAudioPlayer'
import { useNotification } from '../../data/hooks/useNotification'

// Actions
import { Actions as spotifySearchResponseActions } from '../../data/reducers/spotifySearchResponseReducer'
import { Actions as topTracksActions, Track } from '../../data/reducers/topTracksReducer'
import { Actions as playlistReducerActions } from '../../data/reducers/playlistReducer'

// Clients
import { searchAll, getTopTracks } from '../../data/clients/SpotifyClient'
import { TrackObject } from '../../data/clients/types/Spotify'

// Components
import Navigation from '../components/Navigation'
import AudioPlayer, { AudioPlayerProps } from '../components/AudioPlayer'
import SignInForm from '../components/SignInForm'
import SearchForm from '../components/SearchForm'
import ToogleTheme from '../components/ToggleTheme'
import TitleHeader from '../components/TitleHeader'
import { Item } from '../components/CardItem'
import ListCards from '../components/ListCards'

// Icons
import PlayIcon from '../components/icons/PlayIcon'
import StartIcon from '../components/icons/StartIcon'

// Enum
enum STATUS_TITLE {
  SEARCH_FOR = 'Busque por seus principais artistas e músicas',
  WELCOME = 'Seja bem vindo ao Avelino Music. Entre com seu Spotify para poder montar a sua playlist favorita',
  SEARCHING_FOR = 'Buscando resultados para:',
  RESULT_FOR = 'Resultados para:',
  NOT_FOUND_RESULT_FOR = 'Não encontramos nada por:',
  TOP_TEN = 'TOP 10:'
}

// Functions
const getTreatedTracks = (tracks: TrackObject[], playlistTracks: Track[]): Track[] => {
  const treatedTracks = tracks.map(track => {
    const [artist] = track.artists
    return {
      id: track.id,
      musicName: track.name,
      artistId: artist.id,
      artistName: artist.name,
      image: track.album.images.length > 0 ? track.album.images[0].url : '/images/default-photo-for-cards.jpg',
      audioPreview: track.preview_url || '',
      favorited: playlistTracks.some(trackFavorited => trackFavorited.id === track.id)
    }
  })

  return treatedTracks
}

const convertTrackToCardType = (tracks: Track[], playlistTracks: Track[]): Item[] => {
  const convertedTracks = tracks.map(track => ({
    id: track.id,
    image: {
      url: track.image,
      title: `${track.artistName} - ${track.musicName}`
    },
    mainText: track.musicName,
    secondaryText: track.artistName,
    active: playlistTracks.some(trackItem => trackItem.id === track.id),
    LeftIcon: PlayIcon,
    RightIcon: StartIcon,
    rightIconColorWhenActive: 'text-green-500'
  }))

  return convertedTracks
}

// Others
const minCharsQuery = 3
const favoriteAudio = new Audio('audios/notification-favorite.mp3')

const Home: React.FC = () => {
  // Context
  const [spotifySearchState, spotifySearchDispatch] = useContext(SpotifySearchResponseContext)
  const [topTracksState, topTracksDispatch] = useContext(TopTracksContext)
  const [playlistState, playlistDispatch] = useContext(PlaylistContext)
  const [menuItems] = useContext(NavigationContext)

  // Hooks
  const [, signed, signWithSpotify] = useAuth()
  const [, createNotification] = useNotification()
  const [audioIsPlaying, resetAudio] = useAudioPlayer()
  const { path } = useRouteMatch()

  // States
  const [selectedAudio, setSelectedAudio] = useState<AudioPlayerProps>()
  const [isOpenTopTracks, setIsOpenTopTracks] = useState(false)
  const [queryApproved, setQueryApproved] = useState(true)
  const [titleSearch, setTitleSearch] = useState(STATUS_TITLE.SEARCH_FOR)
  const [resultList, setResultList] = useState<Item[]>([])

  // Functions
  const handleSearch = (query = '', offset: number = spotifySearchState.offset, limit: number = spotifySearchState.limit): void => {
    const isApproved = query.trim().length > minCharsQuery

    setQueryApproved(isApproved)

    if (isApproved) {
      spotifySearchDispatch({
        type: spotifySearchResponseActions.LOADING,
        payload: {
          query
        }
      })

      searchAll(query, offset, limit)
        .then(response => {
          const treatedTracks = getTreatedTracks(response.tracks.items, playlistState.tracks)

          spotifySearchDispatch({
            type: spotifySearchResponseActions.SUCCESS,
            payload: {
              tracks: treatedTracks,
              lastResponse: response
            }
          })
        })
        .catch((err: Error) => {
          spotifySearchDispatch({
            type: spotifySearchResponseActions.ERROR,
            payload: {
              error: err?.message
            }
          })
        })
    }
  }

  const handleSelect = (card: Item): void => {
    const trackFound = spotifySearchState.tracks.find(trackItem => trackItem.id === card.id)

    if (trackFound?.artistId) {
      topTracksDispatch({
        type: topTracksActions.LOADING,
        payload: {
          artistId: trackFound?.artistId,
          artistName: trackFound.artistName
        }
      })

      getTopTracks({
        id: trackFound.artistId,
        market: 'from_token'
      })
        .then(response => {
          const topTracks = getTreatedTracks(response.tracks, playlistState.tracks)

          topTracksDispatch({
            type: topTracksActions.SUCCESS,
            payload: {
              tracks: topTracks
            }
          })
        })
        .catch(err => {
          topTracksDispatch({
            type: topTracksActions.ERROR,
            payload: {
              error: err?.message
            }
          })
        })
    }
  }

  const handlePlayPreview = (card: Item): void => {
    const selectedTrack = spotifySearchState.tracks.find(track => track.id === card.id)

    if (selectedTrack) {
      setSelectedAudio({
        image: {
          src: selectedTrack.image,
          title: `${selectedTrack.artistName} - ${selectedTrack.musicName}`
        },
        mainText: selectedTrack.musicName,
        secondaryText: selectedTrack.artistName,
        audioSrc: selectedTrack.audioPreview
      })
    }
  }

  const toggleFavorite = (card: Item): void => {
    const { id: trackId } = card

    if (audioIsPlaying(favoriteAudio)) resetAudio(favoriteAudio)

    const trackFound = playlistState.tracks.find(favoritedTrack => favoritedTrack.id === trackId)

    if (!trackFound) {
      const newFavoritedTrack = spotifySearchState.tracks.find(track => track.id === trackId)

      if (newFavoritedTrack) {
        playlistDispatch({
          type: playlistReducerActions.FAVORITE,
          payload: {
            track: {
              ...newFavoritedTrack,
              favorited: true
            }
          }
        })
      }

      createNotification(`Salvo na Playlist: ${newFavoritedTrack?.artistName} - ${newFavoritedTrack?.musicName}`)
    } else {
      playlistDispatch({
        type: playlistReducerActions.UNFAVORITE,
        payload: {
          trackId
        }
      })
    }

    favoriteAudio.play()
  }

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) return

    if (result.source.droppableId === result.destination.droppableId && result.source.index === result.destination.index) {
      return
    }

    const newResultList = [...resultList]

    const draggedItem = newResultList[result.source.index]

    newResultList.splice(result.source.index, 1)
    newResultList.splice(result.destination.index, 0, draggedItem)

    setResultList(newResultList)
  }

  const handleCloseTopTracks = (): void => {
    setIsOpenTopTracks(false)
    setTitleSearch(STATUS_TITLE.RESULT_FOR)
  }

  // Effects
  useEffect(() => {
    if (spotifySearchState.loading) {
      setTitleSearch(STATUS_TITLE.SEARCHING_FOR)
    } else if (spotifySearchState.success) {
      setTitleSearch(STATUS_TITLE.RESULT_FOR)

      setResultList(convertTrackToCardType(spotifySearchState.tracks, playlistState.tracks))
    } else if (spotifySearchState.error) {
      setTitleSearch(STATUS_TITLE.NOT_FOUND_RESULT_FOR)
    }
  }, [spotifySearchState.loading, spotifySearchState.success, spotifySearchState.error, spotifySearchState.tracks, playlistState.tracks])

  useEffect(() => {
    if (topTracksState.loading) {
      setTitleSearch(STATUS_TITLE.RESULT_FOR)
    } else if (topTracksState.success) {
      setTitleSearch(STATUS_TITLE.TOP_TEN)
      setIsOpenTopTracks(true)
    } else if (topTracksState.error) {
      setTitleSearch(STATUS_TITLE.NOT_FOUND_RESULT_FOR)
    }
  }, [topTracksState.loading, topTracksState.success, topTracksState.error])

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="grid grid-rows-3 grid-cols-12 flex-grow">
        <header className="col-span-2 lg:col-span-3 xl:col-span-2 row-span-3 hidden lg:flex relative  bg-gray-50 dark:bg-black">
          <Navigation title="Avelino Music" menuItems={menuItems} path={path} />
        </header>
        <div
          className={`
          col-span-12 lg:col-span-9 xl:col-span-10 row-span-3 px-3 
          lg:px-5 bg-white lg:bg-gray-200 dark:bg-black lg:dark:bg-customBlack
          `}
        >
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
              <section>
                <div className="flex flex-row justify-between items-center">
                  <TitleHeader title={titleSearch} description={spotifySearchState.query} />
                  {isOpenTopTracks && (
                    <button
                      type="button"
                      onClick={handleCloseTopTracks}
                      className={`
                      bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 
                      rounded mr-5 transition duration-300 ease-out`}
                    >
                      Fechar
                    </button>
                  )}
                </div>
                {topTracksState.tracks?.length > 0 && isOpenTopTracks ? (
                  <ListCards
                    listId="top-tracks-list"
                    cards={convertTrackToCardType(topTracksState.tracks, playlistState.tracks)}
                    actions={{
                      onHandleClick: handlePlayPreview,
                      onHandleClickLeftIcon: handlePlayPreview,
                      onHandleClickRightIcon: toggleFavorite
                    }}
                    isDragDisabled
                  />
                ) : (
                  <>
                    <ListCards
                      listId="result-list"
                      cards={resultList}
                      actions={{
                        onHandleClick: handleSelect,
                        onHandleClickLeftIcon: handlePlayPreview,
                        onHandleClickRightIcon: toggleFavorite
                      }}
                      onDragEnd={onDragEnd}
                      isDragDisabled={false}
                    />
                    {spotifySearchState.hasMore && (
                      <button
                        type="button"
                        onClick={() => handleSearch(spotifySearchState.query)}
                        className={`
                        bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold py-2 px-4 mt-2 border-b-4 
                        border-gray-700 hover:border-gray-500 rounded mr-5 transition duration-300 ease-out float-right`}
                      >
                        Carregar mais
                      </button>
                    )}
                  </>
                )}
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

        <Navigation title="Avelino Music" menuItems={menuItems} path={path} />
      </div>
    </div>
  )
}

export default Home
