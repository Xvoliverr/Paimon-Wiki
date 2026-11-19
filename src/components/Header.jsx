import { Link } from "react-router";

const Header = () => {
    return (
        <header className="w-full max-w-[1200px] mx-auto flex items-center justify-between py-4 px-2 mb-4 border-b border-[#d3bc8e]/30">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-[#f3e5c0] tracking-wide">
                <span>✦ Paimon-Wiki</span>
            </Link>

            <nav className="flex items-center gap-6 text-sm font-semibold text-[#d3bc8e]">
            
                <Link to="/about" className="hover:text-[#f3e5c0] transition-colors">
                    Acerca de
                </Link>
                <Link to="/" className="hover:text-[#f3e5c0] transition-colors">
                    Home
                </Link>
            </nav>
        </header>
    );
};

export default Header;