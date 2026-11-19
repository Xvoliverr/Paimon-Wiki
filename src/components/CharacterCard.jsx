import { Link } from "react-router";

const CharacterCard = ({ character }) => {
    return (
        <Link to={`/character/${character.id}`}>
            <div className="coin-card">
                <div className="coin-header">
                    <img
                        src={`https://gi.yatta.moe/assets/UI/${character.icon}.png`}
                        alt={character.name}
                        className="coin-image"
                    />
                    <div>
                        <h2>{character.name}</h2>
                        <p className="symbol">{character.element}</p>
                    </div>
                </div>
                <p>Rareza: {'⭐'.repeat(character.rank || 0)}</p>
                <p className="symbol">Arma: {character.weaponType?.replace('WEAPON_', '')}</p>
            </div>
        </Link>
    );
};

export default CharacterCard;