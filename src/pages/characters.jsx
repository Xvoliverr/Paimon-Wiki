import CharacterCard from "../components/CharacterCard";
import FilterInput from "../components/FilterInput";

const API_URL = 'https://gi.yatta.moe/api/v2/es/avatar'


const CharactersPage = ({
    characters = [],
    filter = '',
    setFilter,
    limit = 10,
    setLimit,
    loading = false,
    error = null
}) => {
    const filteredCharacters = characters
        .filter((character) => {
            const nameMatch = character.name?.toLowerCase().includes(filter.toLowerCase());
            const elementMatch = character.element?.toLowerCase().includes(filter.toLowerCase());
            return nameMatch || elementMatch;
        })
        .slice(0, limit);

    return (
        <div className="max-w-[1200px] mx-auto">
            <h1>Personajes de Genshin Impact</h1>
            {loading && <p className="text-center text-[#d3bc8e]">Cargando personajes...</p>}
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
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>

            {!loading && !error && (
                <main className="grid">
                    {filteredCharacters.map((character) => (
                        <CharacterCard character={character} key={character.id} />
                    ))}
                </main>
            )}
        </div>
    );
};

export default CharactersPage;