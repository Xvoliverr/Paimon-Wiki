import { Link } from "react-router";

const Header = () => {
    return (
        <div className="top-nav">
            <Link to="/">Personajes</Link>
            <Link to="/weapons">Armas</Link>
            <Link to="/about">About</Link>
        </div>
    );
};

export default Header;