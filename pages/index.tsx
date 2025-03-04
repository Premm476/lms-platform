"use client"; // Required for Next.js App Router if using React hooks

import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from "next/link";
import { useState } from "react"; // Import React state




export default function Home() {
  // State to track open FAQ
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle FAQ answers
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ Data
  const faqData = [
    {
      question: "What is the difference between coding and programming?",
      answer: "Coding is the process of writing code using a programming language (e.g., Python, JavaScript, C++). It involves translating logical instructions into a syntax that a machine can understand.",
    },
    {
      question: "What are HTML and CSS?",
      answer: "HTML is the structure of a webpage. It defines the content and layout using elements like headings, paragraphs, images, and links. CSS styles the webpage and controls the layout, colors, and responsiveness.",
    },
    {
      question: "What's the difference between a designer and a developer?",
      answer: "Both designers and developers play crucial roles in building websites and apps, but they focus on different aspects of the process. Designers create the visual elements and UX, while developers code the functionality.",
    },
    {
      question: "What computer program do people use to write code?",
      answer: "Developers use code editors and IDEs (Integrated Development Environments) to write and manage their code. Popular options include VS Code, IntelliJ, and PyCharm.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>E-Learning Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a className="text-2xl font-extrabold text-white" href="#">E-Learning</a>
          <ul className="flex space-x-6">
            {[
              { name: "Home", link: "/" },
              { name: "Courses", link: "/courses" }, // Link to Courses page
              { name: "About", link: "/about" }, // Link to About page
              { name: "Contact", link: "/contact" }, // Link to Contact page
              { name: "Login", link: "login" },
              { name: "Sign Up", link: "signup" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  className="text-white text-lg hover:text-yellow-300 transition-all duration-300"
                  href={item.link}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center p-8">
        <motion.div 
          className="md:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src="/images/g.jpg.png" alt="Coding Image" className="w-full rounded-lg shadow-xl" />
        </motion.div>

        <motion.div 
          className="md:w-1/2 p-4 text-center md:text-left"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold text-purple-700">Boost Your Coding Skills 🚀</h1>
          <p className="text-gray-700 text-lg mt-3">Join our interactive courses and get hands-on experience with real-world projects.</p>
          <div className="flex mt-4">
            <input type="text" placeholder="Search Courses..." className="border p-3 w-full rounded-l-lg" />
            <button className="bg-blue-500 text-white px-5 rounded-r-lg font-bold hover:bg-blue-600 transition-all duration-300">
              Search 🔍
            </button>
          </div>
        </motion.div>
      </section>

       {/* Program Highlights */}
<section className="py-12 bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
  <div className="container mx-auto px-6">
    <h2 className="text-center text-4xl font-bold mb-10">✨ Program Highlights ✨</h2>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: "Convenient Learning Format",
          description: "Online learning format with mentorship from industry experts.",
          icon: "📖",
          image: "/images/c1.jpg",
          bgColor: "bg-pink-500",
        },
        {
          title: "Dedicated Career Services",
          description: "Resume & interview preps with industry experts & exclusive job board.",
          icon: "🎓",
          image: "/images/c2.jpg",
          bgColor: "bg-purple-500",
        },
        {
          title: "Learn from the Best",
          description: "Award-winning faculties in Full Stack domain from top IT background.",
          icon: "👤",
          image: "/images/c3.jpg",
          bgColor: "bg-blue-500",
        },
        {
          title: "Structured Program Support",
          description: "Dedicated program manager to ensure progress and learning outcomes.",
          icon: "📈",
          image: "/images/c4.jpg",
          bgColor: "bg-green-500",
        },
        {
          title: "Hands-on Learning",
          description: "Become job-ready by applying what you learn and build real-life projects.",
          icon: "💼",
          image: "/images/c5.jpg",
          bgColor: "bg-orange-500",
        },
        {
          title: "Global Networking Opportunities",
          description: "Connect with peers, alumni, and industry leaders worldwide for collaboration and career growth.",
          icon: "🌍",
          image: "/images/c2.jpg",
          bgColor: "bg-yellow-500",
        }
      ].map((item, index) => (
        <motion.div 
          key={index} 
          className="relative rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
        >
          {/* Background Image */}
          <img src={item.image} alt={item.title} className="w-full h-64 object-cover brightness-50" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center p-6 text-white">
            {/* Icon on the Left */}
            <div className={`w-14 h-14 ${item.bgColor} flex items-center justify-center rounded-full text-2xl shadow-lg mr-4`}>
              {item.icon}
            </div>
            {/* Text Content */}
            <div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-lg">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Courses Section */}
      <section className="p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800">🔥 Popular Courses 🔥</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[
            { image: '/images/demo1.png', title: 'React Js', price: '₹2999', students: '5 Students | 4 Lectures' },
            { image: '/images/demo2.png', title: 'Full Stack', price: '₹4999', students: '2 Students | 3 Lectures' },
            { image: '/images/demo3.png', title: 'Cloud Computing', price: '₹1999', students: '1 Student | 3 Lectures' },
            { image: '/images/demo4.png', title: 'Data Structures', price: '₹3999', students: '15 Students | 7 Lectures' }
          ].map((course, index) => (
            <motion.div 
              key={index} 
              className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img src={course.image} alt={course.title} className="w-full rounded-lg" />
              <h3 className="text-2xl font-bold mt-2 text-gray-800">{course.title}</h3>
              <p className="text-blue-600 font-semibold">{course.price}</p>
              <p className="text-gray-600">{course.students}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* FAQ Section */}
<section className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-xl mt-12">
  <h2 className="text-4xl font-extrabold text-center text-white mb-8">🤔 Frequently Asked Questions</h2>

  <div className="space-y-4">
    {faqData.map((item, index) => (
      <motion.div 
        key={index} 
        className="rounded-lg shadow-lg bg-white bg-opacity-80 p-5 backdrop-blur-md transition-all duration-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <button
          className="w-full flex justify-between items-center text-xl font-semibold text-gray-800 hover:text-purple-600 transition-all"
          onClick={() => toggleAnswer(index)}
        >
          <span>{item.question}</span>
          <span className="text-2xl">{openIndex === index ? "🔽" : "▶️"}</span>
        </button>

        <motion.div 
          className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40 mt-3" : "max-h-0"}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
        >
          <p className="text-gray-700 text-lg p-2">{item.answer}</p>
        </motion.div>
      </motion.div>
    ))}
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-black text-white p-8 mt-12">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "About", items: ["Our Story", "Privacy Policy", "FAQ"] },
            { title: "Quick Links", items: ["Courses", "My Account", "Dashboard"] },
            { title: "Social Links", items: ["YouTube", "Instagram", "GitHub"] },
            { title: "Contact", items: ["Call: +91 00000 00000", "Bengaluru, Karnataka", "Email: hello@techspira.com"] }
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold">{section.title}</h3>
              {section.items.map((item, i) => <p key={i} className="text-gray-300">{item}</p>)}
            </div>
          ))}
        </div>
        <p className="text-center mt-6 text-gray-400">&copy; 2025 E-Learning | All Rights Reserved</p>
      </footer>
    </div>
  );
}
