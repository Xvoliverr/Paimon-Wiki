import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";

const API_URL = 'https://gi.yatta.moe/api/v2/es/avatar'

const CharacterDetailsPage = () => {
    const { id } = useParams()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`)
                if (!res.ok) throw new Error('Error al cargar los detalles del personaje')
                const result = await res.json()
                setCharacter(result.data)
            } catch (err) {
                console.log(err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCharacter()
    }, [id])

    return (
        <div className="coin-details-container">
            <Link to="/">Volver al inicio</Link>
            <h1 className="coin-details-title">
                {character ? `${character.name} (${'⭐'.repeat(character.rank || 0)})` : 'Detalles del Personaje'}
            </h1>
            {loading && <p>Cargando...</p>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && character && (
                <>
                    <img
                        src={`https://gi.yatta.moe/assets/UI/${character.icon}.png`}
                        alt={character.name}
                        className="coin-details-image"
                    />
                    <p className="coin-details-description">
                        {character.fetter?.detail || 'Sin descripción disponible.'}
                    </p>
                    <div className="coin-details-info">
                        <h3>Título: {character.fetter?.title || 'N/A'}</h3>
                        <h4>Elemento: {character.element}</h4>
                        <h4>Constelación: {character.fetter?.constellation || 'N/A'}</h4>
                        <h4>Afiliación: {character.fetter?.native || 'N/A'}</h4>
                        <h4>Cumpleaños: {character.birthday ? `${character.birthday[1]}/${character.birthday[0]}` : 'N/A'}</h4>
                        <h4>Actor de voz (EN): {character.fetter?.cv?.EN || 'N/A'}</h4>
                    </div>
                </>
            )}
            {!loading && !error && !character && <p>No se encontraron datos.</p>}
        </div>
    );
}

export default CharacterDetailsPage;