import { SearchAllResponse } from '../clients/types/Spotify'

export enum Actions {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface SpotifySearchResponse {
  id: string
  img: string
  genresList: string[]
  artist: string
}

interface Track {
  id: string
  image: string
  musicName: string
  audioPreview: string
  artistId: string
  artistName: string
  favorited: boolean
}

export interface State {
  loading: boolean
  success: boolean
  error: string
  tracks: Track[]
  query: string
  lastResponse: SearchAllResponse | null
  hasMore: boolean
  offset: number
  limit: number
}

export interface Action {
  type: Actions
  payload: {
    error?: string
    tracks?: Track[]
    query?: string
    lastResponse?: SearchAllResponse
  }
}

export const initialState: State = {
  loading: false,
  success: false,
  error: '',
  tracks: [],
  query: '',
  lastResponse: null,
  hasMore: false,
  offset: 0,
  limit: 20
}

export function spotifySearchResponseReducer(state: State, action: Action): State {
  const { error, tracks, query, lastResponse } = action.payload

  switch (action.type) {
    case Actions.LOADING:
      if (query) {
        return {
          ...state,
          tracks: state.query !== query ? [] : state.tracks,
          offset: state.query !== query ? 0 : state.offset,
          loading: true,
          query
        }
      }
      return state

    case Actions.SUCCESS:
      if (tracks && lastResponse) {
        const hasMore = !!(lastResponse.albums.next || lastResponse.artists.next || lastResponse.tracks.next)

        let newTracks = []
        let { offset } = state

        if (state.tracks.length > 0) {
          newTracks = [...state.tracks, ...tracks]

          offset += state.limit
        } else {
          newTracks = tracks
        }

        return {
          ...state,
          loading: false,
          success: true,
          error: '',
          tracks: newTracks,
          lastResponse,
          hasMore,
          offset
        }
      }

      return state

    case Actions.ERROR:
      if (error) {
        return {
          ...state,
          loading: false,
          success: false,
          error,
          tracks: []
        }
      }
      return state

    default:
      return state
  }
}
