import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import CharacterTable from './pages/CharacterTable'
import HouseDetail from './pages/HouseDetail'
import PageNotFound from './pages/PageNotFound'

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/GoT-API-app">
      <div className="App">
        <main className="container">
          <Routes>
            <Route path="/" element={<CharacterTable />} />
            <Route path="/characters" element={<CharacterTable />} />
            <Route path="/houses/:houseId" element={<HouseDetail />}></Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
