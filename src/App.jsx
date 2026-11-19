import { useState, useEffect } from "react"
import { Routes, Route } from 'react-router'
const API_URL = 'https://gi.yatta.moe/api/v2/es/avatar'

import HomePage from "./pages/home"
import AboutPage from "./pages/about"
import NotFoundPage from "./pages/not-found"
import CharacterDetailsPage from "./pages/detalles"
import WeaponsPage from "./pages/weapons"
import WeaponDetailsPage from "./pages/weapon-details"
import CharactersPage from "./pages/characters"
import Header from "./components/Header"

const App = () => {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [limit, setLimit] = useState(10)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error('Error al cargar los personajes')
                return res.json()
            })
            .then((data) => {
                setCharacters(Object.values(data.data.items))
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={
                    <HomePage
                        characters={characters}
                        filter={filter}
                        setFilter={setFilter}
                        limit={limit}
                        setLimit={setLimit}
                        loading={loading}
                        error={error}
                    />
                } />
                <Route path='/weapons' element={<WeaponsPage />} />
                <Route path='/weapon/:id' element={<WeaponDetailsPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/characters' element={ <CharactersPage
                        characters={characters}
                        filter={filter}
                        setFilter={setFilter}
                        limit={limit}
                        setLimit={setLimit}
                        loading={loading}
                        error={error} />
                } />
                <Route path="/character/:id" element={<CharacterDetailsPage />} />
                <Route path='*' element={<NotFoundPage />} />
                <Route path='/' element={<HomePage characters={characters} />} />
            </Routes>
        </>
    )
}

export default App