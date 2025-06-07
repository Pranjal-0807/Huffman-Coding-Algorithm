import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Visualizer", path: "/visualizer" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const getLinkClasses = ({ isActive }) =>
        `relative text-gray-200 transition duration-300 group ${isActive ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"
        }`;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-slate-900 to-slate-800 bg-opacity-90 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                        HuffViz
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map(({ name, path }) => (
                            <NavLink key={name} to={path} className={getLinkClasses}>
                                {name}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile Icon */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-cyan-400 transition"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-slate-800 px-6 pb-6 pt-2 text-gray-100 shadow-inner space-y-4"
                    >
                        {navLinks.map(({ name, path }) => (
                            <NavLink
                                key={name}
                                to={path}
                                onClick={() => setIsOpen(false)} // Close menu after click
                                className={({ isActive }) =>
                                    `block text-lg font-medium transition ${isActive ? "text-cyan-400" : "hover:text-cyan-400"
                                    }`
                                }
                            >
                                {name}
                            </NavLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
