"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Course Data
const courses = [
  { id: "reactjs", title: "React Js", image: "/images/01.jpg", price: 2999 },
  { id: "full-stack", title: "Full Stack", image: "/images/02.jpg", price: 4999 },
  { id: "cloud-computing", title: "Cloud Computing", image: "/images/03.jpg", price: 1999 },
  { id: "data-structures", title: "Data Structures", image: "/images/04.jpg", price: 3999 },
  { id: "ai-ml", title: "AI & Machine Learning", image: "/images/05.jpg", price: 4999 },
  { id: "data-science", title: "Data Science & Analytics", image: "/images/06.jpg", price: 1999 },
  { id: "cybersecurity", title: "Cybersecurity", image: "/images/07.jpg", price: 3999 },
  { id: "blockchain", title: "Blockchain & Web3", image: "/images/08.jpg", price: 1999 },
  { id: "robotics", title: "Robotics & Automation", image: "/images/09.jpg", price: 3999 },
];

export default function Courses() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchTerm, setSearchTerm] = useState(query);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter courses based on search query
  useEffect(() => {
    if (query) {
      const results = courses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(results);
    } else {
      setFilteredCourses(courses);
    }
  }, [query]);

  // Handle search functionality
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    router.push(`/courses?query=${encodeURIComponent(searchTerm)}`);
  };

  // Handle enrollment (redirect to login page)
  const handleEnrollment = () => {
    router.push("/login"); // Redirect to login page
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Courses - E-Learning Platform</title>
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

      {/* Search Box */}
      <div className="flex justify-center mt-20">
        <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-md bg-white shadow-sm">
          <input
            type="text"
            placeholder="Search Courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 p-3 outline-none text-gray-700"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 py-3 hover:bg-blue-500 transition-all"
          >
            Search
          </button>
        </div>
      </div>

      {/* Courses List */}
      <section className="p-10">
        <h2 className="text-5xl font-extrabold text-center text-blue-600 mb-8">
          🎓 Explore Our Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="relative overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300"
              >
                {/* Course Image */}
                <Link href={`/${course.id}`} passHref>
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover hover:brightness-110 transition-all duration-300 cursor-pointer"
                  />
                </Link>

                {/* Course Info & Enroll Button */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-blue-600">{course.title}</h3>
                  <p className="text-gray-600 mt-2">Price: ₹{course.price}</p>
                  <button
                    onClick={handleEnrollment} // Redirect to login page
                    className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-2xl">No courses found.</p>
          )}
        </div>
      </section>
    </div>
  );
}