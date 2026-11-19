import { useState, useEffect } from "react";
import { Link } from "react-router";

const HomePage = ({ characters = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Selecciona los primeros 6 personajes de 5 estrellas (o los primeros disponibles) para el slider
    const featuredCharacters = characters
        .filter((char) => char.rank === 5)
        .slice(0, 6);

    const slides = featuredCharacters.length > 0 ? featuredCharacters : characters.slice(0, 6);

    // Cambio automático de imagen cada 5 segundos
    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const currentChar = slides[currentSlide];

    // Convierte el ícono de perfil (UI_AvatarIcon_Ayaka) al Splash Art completo (UI_Gacha_AvatarImg_Ayaka)
    const getSplashUrl = (icon) => {
        if (!icon) return "";
        const gachaName = icon.replace("UI_AvatarIcon_", "UI_Gacha_AvatarImg_");
        return `https://gi.yatta.moe/assets/UI/${gachaName}.png`;
    };

  // Categorias
  const wikiCategories = [
    { title: "Archivo de Personajes", count: `${characters.length || 100}+ Entradas`, path: "/characters", icon: "👤", active: true },
    { title: "Armas", count: "250+ Entradas", path: "/weapons", icon: "⚔️", active: true },
    { title: "Artefactos", count: "Próximamente", path: "#", icon: "🏺", active: false },
    { title: "Misiones de Mundo", count: "Próximamente", path: "#", icon: "❗", active: false },
    { title: "Invocación de los Sabios", count: "Próximamente", path: "#", icon: "🃏", active: false },
    { title: "Acerca de Paimon-Wiki", count: "Info del Proyecto", path: "/about", icon: "📖", active: true },
    ];

    return (
        <div className="max-w-[1200px] mx-auto pt-4">
            {/* Banner Principal estilo HoYoWiki */}
            <section className="mb-10">
                <div className="mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#f3e5c0] text-left mb-2 tracking-wide">
                        ¡Bienvenido a Paimon-Wiki!
                    </h1>
                    <p className="text-sm text-[#FFFFF] font-medium tracking-wider">
                        ✦ Ad astra abyssosque!
                    </p>
                </div>

                {/* Carrusel / Slider de Splash Art de Personajes */}
                <div className="relative overflow-hidden bg-gradient-to-r from-[#252e47] via-[#1d2438] to-[#141826] border border-[#d3bc8e]/40 rounded-2xl mb-8 shadow-2xl min-h-[290px] sm:min-h-[330px] flex items-center">
                    
                    {/* Imagen Splash Art de fondo a la derecha */}
                    {currentChar && (
                        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[65%] pointer-events-none select-none overflow-hidden">
                            <img
                                key={currentChar.id}
                                src={getSplashUrl(currentChar.icon)}
                                alt={currentChar.name}
                                onError={(e) => {
                                    // Respaldo por si algún personaje no tiene Gacha Splash
                                    e.currentTarget.src = `https://gi.yatta.moe/assets/UI/${currentChar.icon}.png`;
                                }}
                                className="w-full h-full object-cover object-center sm:object-right scale-110 transition-all duration-700 opacity-35 sm:opacity-90"
                            />
                            {/* Degradado para fundir el arte con el texto */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1d2438] via-[#1d2438]/80 to-transparent" />
                        </div>
                    )}

                    {/* Contenido Izquierdo del Slider */}
                    <div className="relative z-10 p-6 sm:p-10 max-w-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#d3bc8e]/20 text-[#f3e5c0] text-xs font-semibold border border-[#d3bc8e]/30">
                                {currentChar ? `Personaje Destacado • ${currentChar.element}` : "Base de Datos de Teyvat"}
                            </span>
                            {currentChar && (
                                <span className="text-[#e5a93c] text-xs tracking-widest">
                                    {"★".repeat(currentChar.rank || 5)}
                                </span>
                            )}
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-wide">
                            {currentChar ? currentChar.name : "Explora el Archivo de Viajeros"}
                        </h2>

                        <p className="text-sm text-[#cbd5e1] mb-6 leading-relaxed">
                            Consulta estadísticas, elementos, constelaciones, pasivas de armas y lore directamente desde los archivos de Celestia.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {currentChar && (
                                <Link
                                    to={`/character/${currentChar.id}`}
                                    className="px-5 py-2.5 rounded-full bg-[#d3bc8e] text-[#131826] font-bold text-sm hover:bg-[#f3e5c0] transition-colors shadow-md"
                                >
                                    Ver Ficha de {currentChar.name}
                                </Link>
                            )}
                            <Link
                                to="/characters"
                                className="px-5 py-2.5 rounded-full border border-[#d3bc8e] bg-[#171d2e]/70 text-[#f3e5c0] font-semibold text-sm hover:bg-[#d3bc8e]/15 transition-colors"
                            >
                                Todos los Personajes
                            </Link>
                        </div>
                    </div>

                    {/* Botones Flecha Izquierda / Derecha */}
                    {slides.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                aria-label="Anterior"
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#131826]/70 border border-[#d3bc8e]/40 text-[#f3e5c0] hover:bg-[#d3bc8e] hover:text-[#131826] transition-all flex items-center justify-center"
                            >
                                ‹
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Siguiente"
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#131826]/70 border border-[#d3bc8e]/40 text-[#f3e5c0] hover:bg-[#d3bc8e] hover:text-[#131826] transition-all flex items-center justify-center"
                            >
                                ›
                            </button>

                            {/* Indicadores de página (puntitos abajo) */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                                {slides.map((slide, idx) => (
                                    <button
                                        key={slide.id}
                                        onClick={() => setCurrentSlide(idx)}
                                        aria-label={`Ir a ${slide.name}`}
                                        className={`h-2 rounded-full transition-all ${
                                            currentSlide === idx
                                                ? "w-6 bg-[#f3e5c0]"
                                                : "w-2 bg-[#d3bc8e]/40 hover:bg-[#d3bc8e]/70"
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Panel de Navegación por Categorías */}
                <div className="bg-[#1d2438]/90 border border-[#d3bc8e]/30 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-sm font-bold text-[#d3bc8e] uppercase tracking-wider mb-4 px-2">
                        Categorías de la Wiki
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {wikiCategories.map((cat, index) => (
                            <Link
                                key={index}
                                to={cat.path}
                                onClick={(e) => !cat.active && e.preventDefault()}
                                className={`group flex flex-col items-center text-center p-4 rounded-xl transition-all ${
                                    cat.active
                                        ? "hover:bg-[#252e47] cursor-pointer"
                                        : "opacity-50 cursor-not-allowed"
                                }`}
                            >
                                <div className="w-14 h-14 rounded-full bg-[#171d2e] border-2 border-[#d3bc8e]/60 group-hover:border-[#f3e5c0] group-hover:scale-105 transition-all flex items-center justify-center text-2xl mb-3 shadow-md">
                                    {cat.icon}
                                </div>
                                <span className="text-xs font-semibold text-[#ece5d8] group-hover:text-[#f3e5c0] leading-tight">
                                    {cat.title}
                                </span>
                                <span className="text-[11px] text-[#9ea8c2] mt-1">
                                    {cat.count}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;