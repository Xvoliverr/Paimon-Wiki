import CharacterCard from "../components/CharacterCard"
import FilterInput from "../components/FilterInput"

const HomePage = ({
    characters,
    filter,
    setFilter,
    limit,
    setLimit,
    loading,
    error
}) => {
    const filteredCharacters = characters
        .filter((character) => {
            const nameMatch = character.name?.toLowerCase().includes(filter.toLowerCase());
            const elementMatch = character.element?.toLowerCase().includes(filter.toLowerCase());
            return nameMatch || elementMatch;
        })
        .slice(0, limit);

    return (
        <div>
            <h1>Personajes de Genshin Impact</h1>
            {loading && <p>Cargando...</p>}
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
                        <option value="1000000">Todos</option>
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
}

export default HomePage;