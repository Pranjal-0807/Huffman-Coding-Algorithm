import React from "react";
import { motion } from "framer-motion";
import PranjalImg from "../assets/pranjal.jpg"; 
import IshuImg from "../assets/ishu.png";

const authors = [
    {
        name: "Pranjal Agarwal",
        image: PranjalImg,
        role: "Frontend & Visualization",
        bio: "Pranjal is a final-year Computer Science student with a passion for algorithms, UI/UX, and building intuitive visual tools for complex concepts.",
    },
    {
        name: "Ishu Bansal",
        image: IshuImg,
        role: "Backend & Algorithm Logic",
        bio: "Ishu is a systems thinker who enjoys implementing core algorithms and ensuring smooth, efficient performance in web-based tools.",
    },
];

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-12">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-center text-cyan-400 mb-8"
                >
                    About HuffViz
                </motion.h1>

                {/* Project Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl text-center text-gray-300 mb-12"
                >
                    HuffViz is a dynamic web application that visualizes the Huffman Coding Algorithm — a fundamental concept in data compression. Through interactive animations and real-time tree generation, our goal is to make learning efficient encoding methods intuitive and visually engaging.
                </motion.p>

                {/* Author Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {authors.map((author, index) => (
                        <motion.div
                            key={author.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.2 }}
                            className="bg-slate-700 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center hover:scale-105 transition"
                        >
                            <img
                                src={author.image}
                                alt={author.name}
                                className="w-32 h-32 rounded-full border-4 border-cyan-400 mb-4 object-cover"
                            />
                            <h3 className="text-2xl font-semibold text-cyan-300">{author.name}</h3>
                            <p className="text-sm text-gray-400 mb-2">{author.role}</p>
                            <p className="text-gray-300">{author.bio}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
