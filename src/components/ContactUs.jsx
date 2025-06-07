import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const authors = [
    {
        name: "Pranjal Agarwal",
        email: "pranjalagarwal107@gmail.com",
        github: "https://github.com/Pranjal-0807",
        linkedin: "https://linkedin.com/in/pranjal-agarwal-84b335246",
    },
    {
        name: "John Doe",
        email: "john@example.com",
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
    },
];

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center px-6 py-12 space-y-12">
            {/* Authors Contact Info */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-5xl w-full bg-white/5 backdrop-blur-md rounded-2xl p-10 border border-white/10 shadow-lg"
            >
                <h3 className="text-3xl font-bold mb-8 text-center text-cyan-400">
                    Reach out to the Authors
                </h3>
                <div className="flex flex-col md:flex-row md:space-x-12 space-y-10 md:space-y-0 justify-center">
                    {authors.map(({ name, email, github, linkedin }) => (
                        <div
                            key={name}
                            className="flex-1 border border-white/20 rounded-xl p-6 bg-white/10 backdrop-blur-sm flex flex-col items-center space-y-4"
                        >
                            <p className="font-semibold text-xl text-white">{name}</p>
                            <div className="flex flex-col space-y-4 text-gray-300 w-full">
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center space-x-3 hover:text-cyan-400 transition"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Email ${name}`}
                                >
                                    <Mail size={24} />
                                    <span className="truncate">{email}</span>
                                </a>
                                <a
                                    href={github}
                                    className="flex items-center space-x-3 hover:text-cyan-400 transition"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${name} GitHub`}
                                >
                                    <Github size={24} />
                                    <span>GitHub</span>
                                </a>
                                <a
                                    href={linkedin}
                                    className="flex items-center space-x-3 hover:text-cyan-400 transition"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${name} LinkedIn`}
                                >
                                    <Linkedin size={24} />
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Contact Form  */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg"
            >
                <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text text-center">
                    Contact Us
                </h2>

                {submitted ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-400 text-center mb-6"
                    >
                        Thank you for reaching out! We'll get back to you soon.
                    </motion.p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <label className="block">
                            <span className="text-gray-300 mb-1 block">Name</span>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-md bg-slate-700 border border-gray-600 px-4 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                placeholder="Your name"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-300 mb-1 block">Email</span>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-md bg-slate-700 border border-gray-600 px-4 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                placeholder="you@example.com"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-300 mb-1 block">Message</span>
                            <textarea
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className="w-full rounded-md bg-slate-700 border border-gray-600 px-4 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition resize-none"
                                placeholder="Your message"
                            />
                        </label>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-semibold py-3 rounded-xl shadow-lg hover:from-cyan-300 hover:to-purple-400 transition"
                        >
                            Send Message
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Contact;

