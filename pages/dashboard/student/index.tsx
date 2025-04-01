import { useSession } from 'next-auth/react';
import { FiUser } from 'react-icons/fi';
import Image from 'next/image';

export default function StudentDashboard() {
  const { data: session } = useSession();
  
  // Mock data
  const enrolledCourses = [
    {
      id: 1,
      title: 'Introduction to React',
      progress: 75,
      instructor: 'Jane Smith',
      thumbnail: '/course-thumbnails/react.jpg',
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      progress: 30,
      instructor: 'John Doe',
      thumbnail: '/course-thumbnails/javascript.jpg',
    },
  ];

  const recommendedCourses = [
    {
      id: 3,
      title: 'Node.js Fundamentals',
      instructor: 'Alex Johnson',
      thumbnail: '/course-thumbnails/nodejs.jpg',
    },
    {
      id: 4,
      title: 'Database Design',
      instructor: 'Sarah Williams',
      thumbnail: '/course-thumbnails/database.jpg',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {session?.user?.name}!</h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Image 
                src={course.thumbnail} 
                alt={course.title}
                width={400}
                height={160}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <FiUser className="mr-1" />
                  <span className="text-sm">{course.instructor}</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Image 
                src={course.thumbnail} 
                alt={course.title}
                width={400}
                height={160}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <FiUser className="mr-1" />
                  <span className="text-sm">{course.instructor}</span>
                </div>
                <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors">
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

StudentDashboard.auth = true;