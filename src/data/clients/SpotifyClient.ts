/* eslint-disable camelcase */
import axios from 'axios'
import { convertSecondsToMilliseconds } from '../utils/HandleDate'

import { SearchAllResponse, TopTracksPayload, TopTracksResponse } from './types/Spotify'

interface AuthResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}

interface AuthStorage {
  access_token: string
  refresh_token: string
  expires_ms: number
}

const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET
const redirectUri = process.env.REACT_APP_REDIRECT_URL
const scopes = process.env.REACT_APP_SCOPES
const authStorage = process.env.REACT_APP_AUTH_STORAGE

const generateTokenExpirationDate = (milliseconds: number): number => Date.now() + convertSecondsToMilliseconds(milliseconds)

export const getAuthStorage = (): AuthStorage | null => {
  try {
    return JSON.parse(String(window.localStorage.getItem(authStorage)))
  } catch (error) {
    return null
  }
}

export const setAuthStorage = (access: AuthStorage): void => {
  window.localStorage.setItem(authStorage, JSON.stringify(access))
}

const apiAuth = axios.create({
  baseURL: 'https://accounts.spotify.com/',
  headers: {
    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    'Content-type': 'application/x-www-form-urlencoded'
  }
})

const apiV1 = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    Authorization: `Bearer ${getAuthStorage()?.access_token}`
  }
})

export const signWithSpotify = (): void => {
  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`
  window.location.href = url
}

export const refreshToken = async (auth: AuthStorage): Promise<void> => {
  const response = await apiAuth.post<AuthResponse>(
    'api/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: auth.refresh_token
    })
  )

  const { access_token, expires_in } = response.data

  apiV1.defaults.headers.Authorization = `Bearer ${access_token}`

  setAuthStorage({
    refresh_token: auth.refresh_token,
    access_token,
    expires_ms: generateTokenExpirationDate(expires_in)
  })
}

export const isAuthExpired = (): boolean => {
  const auth = getAuthStorage()

  if (auth) {
    const isExpired = Date.now() > auth.expires_ms

    if (isExpired && auth.refresh_token) {
      refreshToken(auth)
    }

    return false
  }

  return true
}

const getToken = async (code: string): Promise<void> => {
  const response = await apiAuth.post<AuthResponse>(
    'api/token',
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri
    })
  )

  const { access_token, refresh_token } = response.data

  apiV1.defaults.headers.Authorization = `Bearer ${access_token}`

  setAuthStorage({
    access_token,
    refresh_token,
    expires_ms: generateTokenExpirationDate(response.data.expires_in)
  })

  window.location.href = '/'
}

export const getAuthCode = (): void => {
  const hasCode = window.location.search.includes('code=')

  if (hasCode) {
    const search = window.location.search
      .substring(1)
      .split('&')
      .reduce((initial: any, item: string) => {
        if (item) {
          const parts = item.split('=')
          initial[parts[0]] = decodeURIComponent(parts[1])
        }
        return initial
      }, {})

    if (search.code) {
      getToken(search.code)
    }
  }
}

export const searchAll = async (
  query: string,
  offset: number,
  limit: number,
  type: string[] = ['album', 'artist', 'playlist', 'track']
): Promise<SearchAllResponse> => {
  const response = await apiV1.get<SearchAllResponse>(`search?query=${query}&type=${type.join(',')}&offset=${offset}&limit=${limit}`)

  return response.data
}

export const getTopTracks = async ({ id, market }: TopTracksPayload): Promise<TopTracksResponse> => {
  const response = await apiV1.get<TopTracksResponse>(`artists/${id}/top-tracks?market=${market}`)

  return response.data
}
