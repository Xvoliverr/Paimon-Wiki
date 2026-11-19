import { useState, useEffect } from "react";
import WeaponCard from "../components/WeaponCard";
import FilterInput from "../components/FilterInput";

const API_URL = 'https://gi.yatta.moe/api/v2/es/weapon';

const WeaponsPage = () => {
    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error('Error al cargar las armas');
                return res.json();
            })
            .then((data) => {
                setWeapons(Object.values(data.data.items));
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const filteredWeapons = weapons
        .filter((weapon) => {
            const nameMatch = weapon.name?.toLowerCase().includes(filter.toLowerCase());
            const typeMatch = weapon.type?.toLowerCase().includes(filter.toLowerCase());
            return nameMatch || typeMatch;
        })
        .slice(0, limit);

    return (
        <div>
            <h1>Armas de Teyvat</h1>
            {loading && <p>Cargando armas...</p>}
            {error && <div className="error">{error}</div>}
            
            <div className="top-controls">
                <FilterInput filter={filter} onFilterChange={setFilter} />
                <div className="controls">
                    <label htmlFor="limit">Mostrar: </label>
                    <select
                        value={limit}
                        id="limit"
                        onChange={(e) => setLimit(Number(e.target.value))}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="300">Todas</option>
                    </select>
                </div>
            </div>

            {!loading && !error && (
                <main className="grid">
                    {filteredWeapons.map((weapon) => (
                        <WeaponCard weapon={weapon} key={weapon.id} />
                    ))}
                </main>
            )}
        </div>
    );
};

export default WeaponsPage;