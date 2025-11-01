import React, { useEffect, useState } from 'react'
import { navLinks } from "/src/constants/index.js";

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <a className="text-2xl font-bold text-white hover:text-gray-300 transition-colors" href="#hero">
                    Shanti M
                </a>

                <nav className="hidden md:block">
                    <ul className="flex gap-8">
                        {navLinks.map(({ link, name }) => (
                            <li key={name} className="group">
                                <a href={link} className="text-white hover:text-gray-300 transition-colors relative block py-2">
                                    <span>{name}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" style={{ boxShadow: '0 0 10px #22d3ee, 0 0 20px #22d3ee, 0 0 30px #22d3ee' }} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    ☰
                </button>

                <a href="#contact" className="hidden md:block bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 hover:-translate-y-0.5 transition-all duration-200">
                    Contact Me
                </a>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-md p-4">
                    <ul className="flex flex-col gap-4">
                        {navLinks.map(({ link, name }) => (
                            <li key={name}>
                                <a href={link} className="text-white hover:text-gray-300 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                    {name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="#contact" className="block mt-4 bg-white text-black px-6 py-2.5 rounded-lg font-medium text-center hover:bg-gray-200 transition-all">
                        Contact Me
                    </a>
                </div>
            )}
        </header>
    )
}

export default NavBar