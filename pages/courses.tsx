"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

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

  const handlePayment = (course) => {
    router.push(`/courses/${course.id}?price=${course.price}`);
  };

  const getCourseLink = (courseId) => {
    return [
      "reactjs",
      "full-stack",
      "cloud-computing",
      "data-structures",
      "ai-ml",
      "data-science",
      "cybersecurity",
      "blockchain",
      "robotics",
    ].includes(courseId)
      ? `/${courseId}`
      : `/courses/${courseId}`;
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-600 min-h-screen">
      <Head>
        <title>Courses - E-Learning Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* ✅ Navbar */}
      <nav className="bg-gradient-to-r from-yellow-500 to-red-500 shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-extrabold text-white">
            🚀 E-Learning
          </Link>
          <ul className="flex space-x-6">
            {[
              { name: "Home", link: "/" },
              { name: "Courses", link: "/courses" },
              { name: "About", link: "/about" },
              { name: "Contact", link: "/contact" },
              { name: "Login", link: "/login" },
              { name: "Sign Up", link: "/signup" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="text-white text-lg hover:text-yellow-300 transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ✅ Courses List */}
      <section className="p-10">
        <h2 className="text-5xl font-extrabold text-center text-white mb-8">
          🎓 Explore Our Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {courses.map((course) => (
            <div key={course.id} className="relative overflow-hidden rounded-xl shadow-lg bg-white">
              {/* ✅ Conditional Image Link */}
              <Link href={getCourseLink(course.id)}>
                <Image
                  src={course.image}
                  alt={course.title}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover hover:brightness-110 transition-all duration-300 cursor-pointer"
                />
              </Link>

              {/* ✅ Course Info & Payment Button */}
              <div className="absolute bottom-4 left-4 right-4 p-2 bg-black bg-opacity-60 backdrop-blur-md rounded-lg text-center">
                <h3 className="text-lg font-bold text-yellow-300">{course.title}</h3>
                <button
                  onClick={() => handlePayment(course)}
                  className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Pay ₹{course.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}