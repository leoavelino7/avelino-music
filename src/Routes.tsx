import React, { Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Providers
import { PlaylistProvider } from './data/contexts/PlaylistContext'
import { SpotifySearchResponseProvider } from './data/contexts/SpotifySearchResponseContext'
import { TopTracksProvider } from './data/contexts/TopTracksContext'

// Components
import Loading from './ui/components/Loading'

// Pages
const Home = React.lazy(() => import('./ui/pages/Home'))
const Playlist = React.lazy(() => import('./ui/pages/Playlist'))

const Routes: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <PlaylistProvider>
        <SpotifySearchResponseProvider>
          <TopTracksProvider>
            <Route path="/" exact component={Home} />
          </TopTracksProvider>
        </SpotifySearchResponseProvider>
        <Route path="/playlist" exact component={Playlist} />
      </PlaylistProvider>
    </Suspense>
  </BrowserRouter>
)

export default Routes
