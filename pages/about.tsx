"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function About() {
  // const [openIndex, setOpenIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const toggleAnswer = (index) => {
  //   setOpenIndex(openIndex === index ? null : index);
  // };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen">
      <Head>
        <title>About - E-Learning Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-200 bg-opacity-75 backdrop-blur-md z-40 transition-all duration-300 h-12 flex items-center justify-center">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo with Animation and Redirect */}
          <Link href="/" className="flex items-center">
            <motion.img
              src="/images/elearning.jpg.png"
              alt="E-Learning Logo"
              className="w-24 h-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </Link>

          {/* Hamburger Menu */}
          <button onClick={toggleMenu} className="md:hidden text-gray-900 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Navigation Links */}
          <ul className={`md:flex space-x-4 items-center ${isMenuOpen ? "block" : "hidden"}`}>
            {[
              { name: "Home", link: "/", type: "text" },
              { name: "Courses", link: "/courses", type: "text" },
              { name: "About", link: "/about", type: "text" },
              { name: "Contact", link: "/contact", type: "text" },
              { name: "Login", link: "/login", type: "button" },
              { name: "Sign Up", link: "/signup", type: "button" },
            ].map((item, index) => (
              <li key={index}>
                {item.type === "button" ? (
                  <Link href={item.link}>
                    <motion.button
                      className="bg-blue-600 text-white px-4 py-1 rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:scale-105 active:bg-gray-500 active:scale-95"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.button>
                  </Link>
                ) : (
                  <Link href={item.link}>
                    <motion.div
                      className="relative text-gray-900 font-bold hover:text-blue-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="relative inline-block">
                        {item.name}
                        <motion.span
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300"
                          whileHover={{ width: "100%" }}
                        />
                      </span>
                    </motion.div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center mt-20">
        <motion.h1 
          className="text-5xl font-extrabold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          What is <span className="text-purple-600">E-Learning?</span>
        </motion.h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Unlock your programming potential with the best online courses and a supportive community.
        </p>
      </section>

      {/* About Details */}
      <section className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {[
          "E-Learning is your gateway to mastering programming.",
          "Our courses are affordable and designed for all skill levels.",
          "Join a supportive community and advance your career.",
          "Learn from industry experts with hands-on projects.",
          "Your dream tech career starts here, let's build it together!",
          "Get lifetime access to our courses and learn at your own pace." // ✅ NEW EXTRA POINT
        ].map((text, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <p className="text-gray-800">{text}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 mt-10 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <h2 className="text-3xl font-bold">Start Your Learning Journey Today</h2>
        <p className="mt-2 text-lg">Join thousands of students and level up your skills.</p>
        <Link href="/courses" className="mt-4 inline-block bg-yellow-400 text-purple-800 font-bold px-6 py-3 rounded-full shadow-md hover:bg-yellow-500 transition-all">
          Explore Courses
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-12">
        <p>&copy; 2025 E-Learning. All Rights Reserved.</p>
      </footer>
    </div>
  );
}