import React, { Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Loading from './ui/components/Loading'

const Home = React.lazy(() => import('./ui/pages/Home'))
const Playlist = React.lazy(() => import('./ui/pages/Playlist'))

const Routes: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Route path="/" exact component={Home} />
      <Route path="/playlist" exact component={Playlist} />
    </Suspense>
  </BrowserRouter>
)

export default Routes
