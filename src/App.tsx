import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import CharacterTable from './CharacterTable'
import HouseDetail from './HouseDetail'
import PageNotFound from './PageNotFound'

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/GoT-API-app">
      <div className="text-center dark:bg-slate-900 h-screen">
        <main className="w-full">
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
