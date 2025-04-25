import { Routes, Route } from 'react-router-dom'
import HomeView from './views/HomeView'

function App() {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>
    </div>
  )
}

export default App
