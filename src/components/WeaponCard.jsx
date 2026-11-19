import { Link } from "react-router";

const WeaponCard = ({ weapon }) => {
    return (
        <Link to={`/weapon/${weapon.id}`}>
            <div className="character-card">
                <div className="character-header">
                    <img
                        src={`https://gi.yatta.moe/assets/UI/${weapon.icon}.png`}
                        alt={weapon.name}
                        className="character-image"
                    />
                    <div>
                        <h2>{weapon.name}</h2>
                        <p className="symbol">{weapon.type?.replace('WEAPON_', '')}</p>
                    </div>
                </div>
                <p>Rareza: {'⭐'.repeat(weapon.rank || 0)}</p>
            </div>
        </Link>
    );
};

export default WeaponCard;