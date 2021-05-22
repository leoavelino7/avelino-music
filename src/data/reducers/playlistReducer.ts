export enum Actions {
  FAVORITE = 'FAVORITE',
  UNFAVORITE = 'UNFAVORITE',
  UPDATE = 'UPDATE'
}

interface Track {
  id: string
  image: string
  musicName: string
  artistId: string
  artistName: string
  audioPreview: string
  favorited: boolean
}

export interface Action {
  type: Actions
  payload: {
    tracks?: Track[]
    track?: Track
    trackId?: string
  }
}

export interface State {
  tracks: Track[]
}

export const initialState: State = {
  tracks: JSON.parse(String(window.localStorage.getItem('@app/playlist'))) || []
}

export function playlistReducer(state: State, action: Action): State {
  const { tracks, track, trackId } = action.payload

  switch (action.type) {
    case Actions.FAVORITE:
      if (track) {
        const newTracks = [
          ...state.tracks,
          {
            ...track,
            favorited: true
          }
        ]

        window.localStorage.setItem('@app/playlist', JSON.stringify(newTracks))

        return {
          tracks: newTracks
        }
      }
      return state

    case Actions.UNFAVORITE:
      if (trackId) {
        const updatedTracks = state.tracks.filter(oldTrack => oldTrack.id !== trackId)
        window.localStorage.setItem('@app/playlist', JSON.stringify(updatedTracks))

        return {
          tracks: updatedTracks
        }
      }

      return state

    case Actions.UPDATE:
      return {
        tracks: tracks || state.tracks
      }

    default:
      return state
  }
}
