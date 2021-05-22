import React, { useContext, useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'

// Hooks
import { DropResult } from 'react-beautiful-dnd'
import { useAudioPlayer } from '../../data/hooks/useAudioPlayer'
import { useNotification } from '../../data/hooks/useNotification'

// Context
import { NavigationContext } from '../../data/contexts/NavigationContext'
import { PlaylistContext } from '../../data/contexts/PlaylistContext'

// Reducers
import { Actions as playlistReducerActions } from '../../data/reducers/playlistReducer'
import { Track } from '../../data/reducers/topTracksReducer'

// Components
import AudioPlayer, { AudioPlayerProps } from '../components/AudioPlayer'
import { Item } from '../components/CardItem'
import TitleHeader from '../components/TitleHeader'
import Navigation from '../components/Navigation'
import ToogleTheme from '../components/ToggleTheme'

// Icon
import PlayIcon from '../components/icons/PlayIcon'
import StartIcon from '../components/icons/StartIcon'
import ListCards from '../components/ListCards'

// Enum
enum STATUS_TITLE {
  MY_FAVORITES = 'Aqui estão suas músicas favoritas',
  PLAYLIST_EMPTY = 'Você não tem nenhuma música na sua Playlist =('
}

// Functions
const convertTrackToCardType = (tracks: Track[]): Item[] => {
  const convertedTracks = tracks.map(track => ({
    id: track.id,
    image: {
      url: track.image
    },
    mainText: track.musicName,
    secondaryText: track.artistName,
    active: true,
    LeftIcon: PlayIcon,
    RightIcon: StartIcon,
    rightIconColorWhenActive: 'text-green-500'
  }))

  return convertedTracks
}

// Others
const favoriteAudio = new Audio('audios/notification-favorite.mp3')

const Playlist: React.FC = () => {
  // Context
  const [menuItems] = useContext(NavigationContext)
  const [playlistState, playlistDispatch] = useContext(PlaylistContext)

  // Hooks
  const [audioIsPlaying, resetAudio] = useAudioPlayer()
  const { path } = useRouteMatch()
  const [, createNotification] = useNotification()

  // States
  const [titleSearch, setTitleSearch] = useState(STATUS_TITLE.MY_FAVORITES)

  const [selectedAudio, setSelectedAudio] = useState<AudioPlayerProps>()

  // Functions
  const handlePlayPreview = (card: Item): void => {
    const selectedTrack = playlistState.tracks.find(track => track.id === card.id)

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
      const newFavoritedTrack = playlistState.tracks.find(track => track.id === trackId)
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

    const newTracks = [...playlistState.tracks]

    const draggedItem = newTracks[result.source.index]

    newTracks.splice(result.source.index, 1)
    newTracks.splice(result.destination.index, 0, draggedItem)

    playlistDispatch({
      type: playlistReducerActions.UPDATE,
      payload: {
        tracks: newTracks
      }
    })
  }

  // Effects
  useEffect(() => {
    if (playlistState.tracks.length === 0) {
      setTitleSearch(STATUS_TITLE.PLAYLIST_EMPTY)
    }
  }, [playlistState.tracks])

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="grid grid-rows-3 grid-cols-12 flex-grow">
        <header className="col-span-2 lg:col-span-3 xl:col-span-2 row-span-3 hidden lg:flex relative  bg-gray-50 dark:bg-black">
          <Navigation menuItems={menuItems} path={path} />
        </header>
        <div
          className={`
          col-span-12 lg:col-span-9  xl:col-span-10 row-span-3 px-3 lg:px-5
           bg-white lg:bg-gray-200 dark:bg-black lg:dark:bg-customBlack`}
        >
          <section className="flex justify-between items-center">
            <div className="flex flex-row justify-end w-full mt-5">
              <ToogleTheme />
            </div>
          </section>

          <section>
            <div className="flex flex-row justify-between items-center">
              <TitleHeader title={titleSearch} />
            </div>
            {playlistState.tracks?.length > 0 && (
              <ListCards
                listId="top-tracks-list"
                cards={convertTrackToCardType(playlistState.tracks)}
                actions={{
                  onHandleClick: handlePlayPreview,
                  onHandleClickLeftIcon: handlePlayPreview,
                  onHandleClickRightIcon: toggleFavorite
                }}
                isDragDisabled={false}
                onDragEnd={onDragEnd}
              />
            )}
          </section>
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

        <Navigation menuItems={menuItems} path={path} />
      </div>
    </div>
  )
}

export default Playlist
