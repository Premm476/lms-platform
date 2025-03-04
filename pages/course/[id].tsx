"use client";

import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";

const courses = [
  { id: "reactjs", title: "React Js", description: "Learn React from scratch and build interactive UIs using components.", price: 2999, image: "/images/01.jpg" },
  { id: "full-stack", title: "Full Stack", description: "Master frontend & backend development.", price: 4999, image: "/images/02.jpg" },
  { id: "cloud-computing", title: "Cloud Computing", description: "Understand cloud platforms like AWS, Azure, and Google Cloud.", price: 1999, image: "/images/03.jpg" },
  { id: "data-structures", title: "Data Structures", description: "Learn essential data structures for efficient coding and problem-solving.", price: 3999, image: "/images/04.jpg" },
  { id: "ai-ml", title: "AI & Machine Learning", description: "Dive into artificial intelligence and machine learning with hands-on projects.", price: 4999, image: "/images/05.jpg" },
  { id: "data-science", title: "Data Science & Analytics", description: "Analyze data and extract insights using Python, R, and SQL.", price: 1999, image: "/images/06.jpg" },
  { id: "cybersecurity", title: "Cybersecurity", description: "Learn cybersecurity fundamentals, ethical hacking, and network security.", price: 3999, image: "/images/07.jpg" },
  { id: "blockchain", title: "Blockchain & Web3", description: "Explore blockchain technology, smart contracts, and Web3 development.", price: 1999, image: "/images/08.jpg" },
  { id: "robotics", title: "Robotics & Automation", description: "Get hands-on experience in robotics, automation, and IoT.", price: 3999, image: "/images/09.jpg" },
];

export default function CourseDetails() {
  const params = useParams();
  const router = useRouter();

  if (!params || !params.id || typeof params.id !== "string") {
    return <div className="min-h-screen flex justify-center items-center text-white">Loading...</div>;
  }

  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <Head>
          <title>Course Not Found</title>
        </Head>
        <h1 className="text-3xl font-bold text-red-500">404 - Course Not Found</h1>
        <button
          onClick={() => router.push("/courses")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <Head>
        <title>{course.title} - E-Learning</title>
      </Head>

      <h1 className="text-4xl font-bold">🚀 {course.title}</h1>

      <Image
        src={course.image}
        alt={course.title}
        width={500}
        height={300}
        className="w-96 h-64 object-cover mt-4 rounded-lg"
      />

      <p className="mt-4 text-lg text-gray-300">{course.description}</p>
      <p className="text-yellow-300 font-semibold mt-2">Price: ₹{course.price}</p>

      <button
        onClick={() => alert(`Enrolled in ${course.title}!`)}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
      >
        Enroll Now
      </button>

      <button
        onClick={() => router.push("/courses")}
        className="mt-4 text-gray-300 hover:text-yellow-300 transition-all"
      >
        ← Back to Courses
      </button>
    </div>
  );
}
