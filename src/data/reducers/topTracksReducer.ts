export enum Actions {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  RESET = 'RESET'
}

export interface Track {
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
}

interface Action {
  type: Actions
  payload: {
    error?: string
    artistId?: string
    artistName?: string
    tracks?: Track[]
  }
}

export const initialState: State = {
  loading: false,
  success: false,
  error: '',
  tracks: []
}

export function topTracksReducer(state: State, action: Action): State {
  const { error, artistId, artistName, tracks } = action.payload

  switch (action.type) {
    case Actions.LOADING:
      if (artistId && artistName) {
        return {
          ...state,
          loading: true
        }
      }
      return state

    case Actions.SUCCESS:
      if (tracks) {
        return {
          ...state,
          loading: false,
          success: true,
          error: '',
          tracks
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

    case Actions.RESET:
      return initialState

    default:
      return state
  }
}
