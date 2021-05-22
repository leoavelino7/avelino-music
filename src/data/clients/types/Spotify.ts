/* eslint-disable camelcase */
export interface ExplicitContentSettingsObject {
  filter_enabled: boolean
  filter_locked: false
}

export interface ExternalUrlObject {
  spotify: string
}

export interface ExternalId {
  ean: string
  isrc: string
  upc: string
}

export interface FollowersObject {
  href: string | null
  total: number
}

export interface ImageObject {
  height: number | null
  width: number | null
  url: string
}

export interface OwnerObject {
  display_name: string
  external_urls: ExternalUrlObject
  href: string
  id: string
  type: string
  uri: string
}

export interface ArtistObject {
  external_urls: ExternalUrlObject
  genres: string[]
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface ArtistObjectFull extends ArtistObject {
  images: ImageObject[]
  followers: FollowersObject
  popularity: number
}

export interface SimplifiedPlaylistObject {
  collaborative: false
  description: string
  external_urls: ExternalUrlObject
  href: string
  id: string
  images: ImageObject[]
  name: string
  owner: OwnerObject
  primary_color: string
  public: string
  snapshot_id: string
  tracks: {
    href: string
    total: number
  }
  type: string
  uri: string
}

export interface SimplifiedAlbumObject {
  album_type: string
  artists: ArtistObject[]
  available_markets: string[]
  external_urls: ExternalUrlObject
  href: string
  id: string
  images: ImageObject[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface TrackObject {
  album: SimplifiedAlbumObject
  artists: ArtistObject[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalId
  external_urls: ExternalUrlObject
  href: string
  id: string
  is_local: boolean
  is_playable: boolean
  name: string
  popularity: number
  preview_url: string | null
  track_number: number
  type: string
  uri: string
}

export interface SearchAllResponse {
  albums: {
    href: string
    items: SimplifiedAlbumObject[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
  artists: {
    href: string
    items: ArtistObjectFull[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
  playlists: {
    href: string
    items: ArtistObjectFull[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
  tracks: {
    href: string
    items: TrackObject[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
}

export interface TopTracksPayload {
  id: string
  market: string
}

export interface TopTracksResponse {
  tracks: TrackObject[]
}

export interface AuthResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}

export interface AuthStorage {
  access_token: string
  refresh_token: string
  expires_ms: number
}
