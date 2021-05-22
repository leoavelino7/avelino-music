import React, { Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Providers
import { NavigationProvider } from './data/contexts/NavigationContext'
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
      <NavigationProvider>
        <PlaylistProvider>
          <SpotifySearchResponseProvider>
            <TopTracksProvider>
              <Route path="/" exact component={Home} />
            </TopTracksProvider>
          </SpotifySearchResponseProvider>
          <Route path="/playlist" exact component={Playlist} />
        </PlaylistProvider>
      </NavigationProvider>
    </Suspense>
  </BrowserRouter>
)

export default Routes
