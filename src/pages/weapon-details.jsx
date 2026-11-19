import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";

const API_URL = 'https://gi.yatta.moe/api/v2/es/weapon';

const WeaponDetailsPage = () => {
    const { id } = useParams();
    const [weapon, setWeapon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeapon = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`);
                if (!res.ok) throw new Error('Error al cargar los detalles del arma');
                const result = await res.json();
                setWeapon(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWeapon();
    }, [id]);

    // Limpia etiquetas de color internas del juego como <color=#FFD780FF>
    const cleanText = (text) => {
        if (!text) return 'Sin información.';
        return text.replace(/<[^>]*>?/gm, '');
    };

    return (
        <div className="character-details-container">
            <Link to="/weapons">Volver a Armas</Link>
            <h1 className="character-details-title">
                {weapon ? `${weapon.name} (${'⭐'.repeat(weapon.rank || 0)})` : 'Detalles del Arma'}
            </h1>
            {loading && <p>Cargando...</p>}
            {error && <div className="error">{error}</div>}
            
            {!loading && !error && weapon && (
                <>
                    <img
                        src={`https://gi.yatta.moe/assets/UI/${weapon.icon}.png`}
                        alt={weapon.name}
                        className="character-details-image"
                    />
                    <p className="character-details-description">
                        {cleanText(weapon.description)}
                    </p>
                    <div className="character-details-info">
                        <h3>Pasiva: {weapon.affix ? Object.values(weapon.affix)[0]?.name : 'Sin pasiva'}</h3>
                        <h4 style={{ gridColumn: '1 / -1' }}>
                            {weapon.affix ? cleanText(Object.values(weapon.affix)[0]?.upgrade?.[0]) : 'Esta arma no posee habilidad pasiva.'}
                        </h4>
                        <h4>Tipo: {weapon.type?.replace('WEAPON_', '')}</h4>
                        <h4>Rareza: {weapon.rank} Estrellas</h4>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeaponDetailsPage;