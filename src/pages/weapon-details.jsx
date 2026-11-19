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

    const cleanText = (text) => {
        if (!text) return 'Sin información disponible.';
        return text.replace(/<[^>]*>?/gm, '');
    };

    // Color de fondo de la tarjeta según rareza (5★ dorado, 4★ morado, 3★ azul)
    const getRarityBg = (rank) => {
        if (rank === 5) return "from-[#b88644] via-[#8e632d] to-[#5e401c] border-amber-400/30";
        if (rank === 4) return "from-[#7e76a6] via-[#655b8e] to-[#453d68] border-purple-400/20";
        return "from-[#527a9c] via-[#3e5e7a] to-[#293f52] border-sky-400/20";
    };

    if (loading) return <p className="text-center text-hoyogold mt-10">Cargando ficha del arma...</p>;
    if (error) return <div className="error">{error}</div>;
    if (!weapon) return <p className="text-center mt-10">Arma no encontrada.</p>;

    const passive = weapon.affix ? Object.values(weapon.affix)[0] : null;
    const weaponType = weapon.type?.replace('WEAPON_', '') || 'Arma';

    return (
        <div className="min-h-screen relative overflow-x-hidden text-[#cfd8e3] selection:bg-cyan-500/20 selection:text-cyan-300">
            {/* Contenedor Principal */}
            <div className="relative z-10 max-w-[1240px] mx-auto px-4 md:px-8 pt-4 pb-24 flex justify-between">
                
                {/* Área de Contenido Primario */}
                <main className="w-full lg:max-w-[1020px] pr-0 lg:pr-10">
                    
                    {/* Breadcrumbs (Navegación de migas de pan) */}
                    <nav className="flex items-center space-x-1.5 text-xs text-hoyoblue-muted mb-6">
                        <Link className="hover:text-gray-300 transition-colors" to="/">Inicio</Link>
                        <span>/</span>
                        <Link className="hover:text-gray-300 transition-colors" to="/weapons">Armas</Link>
                        <span>/</span>
                        <span className="text-slate-400">{weapon.name}</span>
                    </nav>

                    {/* Tarjeta de Encabezado del Arma */}
                    <header className="flex flex-col sm:flex-row items-start gap-7 mb-10">
                        {/* Icono del Arma */}
                        <div className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-b ${getRarityBg(weapon.rank)} p-1.5 shadow-xl flex-shrink-0 border flex items-center justify-center overflow-hidden`}>
                            <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay" viewBox="0 0 100 100">
                                <polygon fill="white" points="50,0 100,50 50,100 0,50"></polygon>
                            </svg>
                            <img
                                src={`https://gi.yatta.moe/assets/UI/${weapon.icon}.png`}
                                alt={weapon.name}
                                className="relative z-10 w-[88%] h-[88%] object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                            />
                        </div>

                        {/* Título y Metadatos */}
                        <div className="flex-1 pt-1">
                            <h1 className="text-3xl sm:text-[34px] font-bold tracking-wide text-white mb-2 leading-tight text-left">
                                {weapon.name}
                            </h1>

                            {/* Estrellas de Rareza */}
                            <div className="flex items-center text-hoyogold gap-1 text-base mb-4">
                                {Array.from({ length: weapon.rank || 0 }).map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>

                            {/* Etiquetas */}
                            <div className="flex flex-wrap gap-2 mb-4 text-xs font-medium">
                                <span className="px-3 py-1 rounded bg-[#272f3e] text-slate-300 border border-[#374258]">
                                    {weaponType}
                                </span>
                                <span className="px-3 py-1 rounded bg-[#272f3e] text-slate-300 border border-[#374258]">
                                    {weapon.rank} Estrellas
                                </span>
                            </div>

                            {/* Descripción corta */}
                            <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-2xl mb-5">
                                {cleanText(weapon.description)}
                            </p>

                            {/* Botón Volver con ornamento */}
                            <Link
                                to="/weapons"
                                className="group relative inline-flex items-center justify-center px-6 py-1.5 rounded-full border border-hoyogold/60 hover:border-hoyogold bg-[#222836]/80 hover:bg-[#2c3345] transition-all text-xs font-medium text-slate-200"
                            >
                                <span className="text-hoyogold/70 group-hover:text-hoyogold mr-1.5 transition-colors">〈</span>
                                <span>Volver a Armas</span>
                                <span className="text-hoyogold/70 group-hover:text-hoyogold ml-1.5 transition-colors">〉</span>
                            </Link>
                        </div>
                    </header>

                    {/* Sección de Atributos */}
                    <section className="bg-[#212735] rounded-xl p-6 sm:p-7 border border-[#2f384a] shadow-lg mb-8" id="attributes">
                        <h2 className="text-lg font-bold text-white tracking-wide">Atributos</h2>
                        <div className="ornate-line">
                            <span className="ornate-diamond"></span>
                        </div>

                        {/* Cuadrícula de Especificaciones */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm leading-relaxed mb-6">
                            <div className="flex items-start">
                                <span className="w-32 text-slate-400 text-xs sm:text-[13px]">Nombre</span>
                                <span className="text-slate-200 text-xs sm:text-[13px] font-medium">{weapon.name}</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-32 text-slate-400 text-xs sm:text-[13px]">Tipo</span>
                                <span className="text-slate-200 text-xs sm:text-[13px] font-medium">{weaponType}</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-32 text-slate-400 text-xs sm:text-[13px]">Rareza</span>
                                <span className="text-slate-200 text-xs sm:text-[13px] font-medium">{weapon.rank}★</span>
                            </div>
                            <div className="flex items-start">
                                <span className="w-32 text-slate-400 text-xs sm:text-[13px]">ID Archivo</span>
                                <span className="text-slate-200 text-xs sm:text-[13px] font-medium">#{weapon.id}</span>
                            </div>
                        </div>

                        {/* Habilidad Pasiva */}
                        <div className="flex flex-col sm:flex-row items-start pt-4 border-t border-[#293244]">
                            <span className="w-32 flex-shrink-0 text-hoyogold text-xs sm:text-[13px] font-medium mb-1 sm:mb-0">
                                {passive ? passive.name : 'Sin pasiva'}
                            </span>
                            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                                {passive ? cleanText(passive.upgrade?.[0]) : 'Esta arma no posee habilidad pasiva especial.'}
                            </p>
                        </div>
                    </section>

                    {/* Sección de Ascensión */}
                    <section className="bg-[#212735] rounded-xl p-6 sm:p-7 border border-[#2f384a] shadow-lg" id="ascend">
                        <h2 className="text-lg font-bold text-white tracking-wide">Ascensión</h2>
                        <div className="ornate-line">
                            <span className="ornate-diamond"></span>
                        </div>
                        <div className="text-xs text-slate-400 py-3 flex items-center justify-between">
                            <span>Materiales de Ascensión (Nivel 20 - 90)</span>
                            <span className="text-hoyogold text-[11px]">Rango Máximo: {weapon.rank === 5 || weapon.rank === 4 ? 'Nv. 90' : 'Nv. 70'}</span>
                        </div>
                    </section>
                </main>

                {/* Barra Lateral Flotante Derecha (Estilo HoYoWiki) */}
                <aside className="hidden lg:flex flex-col items-center fixed right-8 top-40 z-30 select-none">
                    <nav className="flex flex-col space-y-4 text-xs font-medium text-slate-400 mb-8 pl-4 border-l border-slate-700/50">
                        <a className="group flex items-center space-x-2 text-white font-semibold" href="#attributes">
                            <span className="w-1.5 h-1.5 rotate-45 bg-hoyogold group-hover:bg-amber-300"></span>
                            <span className="tracking-wide">Atributos</span>
                        </a>
                        <a className="group flex items-center space-x-2 hover:text-white transition-colors" href="#ascend">
                            <span className="w-1.5 h-1.5 rotate-45 bg-slate-500 group-hover:bg-slate-300"></span>
                            <span className="tracking-wide">Ascensión</span>
                        </a>
                    </nav>

                    {/* Mascota Durmiente HoYoWiki */}
                    <div className="mb-4 transform hover:scale-105 transition-transform cursor-pointer">
                        <svg className="w-16 h-14" fill="none" viewBox="0 0 100 85">
                            <rect fill="#2d3748" height="32" rx="4" stroke="#4a5568" strokeWidth="1.5" width="70" x="15" y="45"></rect>
                            <circle cx="23" cy="61" fill="#718096" r="2.5"></circle>
                            <line stroke="#48bb78" strokeLinecap="round" strokeWidth="2.5" x1="82" x2="88" y1="58" y2="76"></line>
                            <ellipse cx="50" cy="46" fill="#93c5fd" rx="26" ry="20"></ellipse>
                            <polygon fill="#60a5fa" points="32,32 37,20 46,30"></polygon>
                            <polygon fill="#60a5fa" points="68,32 63,20 54,30"></polygon>
                            <polygon fill="#fbcfe8" points="35,30 38,24 43,29"></polygon>
                            <polygon fill="#fbcfe8" points="65,30 62,24 57,29"></polygon>
                            <path d="M38 46 Q 43 49 46 46" fill="none" stroke="#1e293b" strokeLinecap="round" strokeWidth="2"></path>
                            <path d="M54 46 Q 57 49 62 46" fill="none" stroke="#1e293b" strokeLinecap="round" strokeWidth="2"></path>
                            <line stroke="#60a5fa" strokeLinecap="round" strokeWidth="1.5" x1="28" x2="22" y1="46" y2="44"></line>
                            <line stroke="#60a5fa" strokeLinecap="round" strokeWidth="1.5" x1="72" x2="78" y1="46" y2="44"></line>
                        </svg>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default WeaponDetailsPage;