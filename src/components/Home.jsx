import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-200 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl text-center bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10"
            >
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                    Visualize the Huffman Coding Algorithm
                </h1>

                <p className="text-lg sm:text-xl text-gray-300 mb-8">
                    Dive into one of the most fundamental compression algorithms and watch
                    how it builds its binary tree in real time. Perfect for learning,
                    teaching, or just exploring how data compression works under the hood.
                </p>

                <Link to="/visualizer">
                    <button className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 transition text-slate-900 shadow-lg">
                        Get Started
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default Home;
