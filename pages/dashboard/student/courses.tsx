import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FiUser, FiClock, FiBookmark, FiBarChart2, FiSearch, FiFilter, FiAward } from 'react-icons/fi';
import { FaFire, FaCrown } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const progressBarVariants = {
  initial: { width: 0 },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: { duration: 1, ease: "easeOut" }
  })
};

export default function StudentCourses() {
  const { data: session } = useSession();
  const router = useRouter();
  
  // Mock data
  const enrolledCourses = [
    {
      id: 1,
      title: 'Mastering React Ecosystem',
      progress: 75,
      instructor: 'Jane Smith',
      thumbnail: '/course-thumbnails/react.jpg',
      lastAccessed: '2 days ago',
      duration: '8 hours',
      category: 'Frontend Development',
      saved: true,
      xp: 450,
      timeSpent: '6.3h'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Patterns',
      progress: 30,
      instructor: 'John Doe',
      thumbnail: '/course-thumbnails/javascript.jpg',
      lastAccessed: '1 week ago',
      duration: '12 hours',
      category: 'Programming',
      saved: false,
      xp: 180,
      timeSpent: '3.1h'
    }
  ];

  const timeLeaders = [
    { id: 1, name: 'You', avatar: session?.user?.image || '/default-avatar.jpg', time: '6.3h', rank: 1 },
    { id: 2, name: 'Alex Chen', avatar: '/avatars/alex.jpg', time: '8.7h', rank: 2 }
  ];

  const navigateToCourse = (courseId: number) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-2">Track your learning progress and achievements</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <FiFilter className="mr-2" /> Filter
            </motion.button>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div variants={containerVariants} className="space-y-6">
              {enrolledCourses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-64 h-48 md:h-auto">
                      <Image 
                        src={course.thumbnail} 
                        alt={course.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 hover:scale-105"
                      />
                      {course.saved && (
                        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                          <FiBookmark className="text-indigo-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                          <div className="flex items-center text-gray-600 mt-2">
                            <FiUser className="mr-1" />
                            <span className="text-sm mr-4">{course.instructor}</span>
                            <FiClock className="mr-1" />
                            <span className="text-sm">{course.duration}</span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {course.category}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {course.xp} XP
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <FaFire className="mr-1" /> {course.timeSpent}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{course.lastAccessed}</span>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <motion.div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full" 
                            variants={progressBarVariants}
                            initial="initial"
                            animate="animate"
                            custom={course.progress}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6 flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigateToCourse(course.id)}
                          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Continue Learning
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center w-12 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <FiBarChart2 />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Time Spent Leaders */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FaFire className="text-orange-500 mr-2" /> Time Spent Leaders
              </h2>
              <div className="space-y-4">
                {timeLeaders.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <div className="flex-shrink-0 mr-3 relative">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      {user.rank === 1 && (
                        <FaCrown className="absolute -top-1 -right-1 text-yellow-500 text-xs" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${user.name === 'You' ? 'text-indigo-600' : 'text-gray-900'} truncate`}>
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <FiClock className="mr-1" /> {user.time}
                      </p>
                    </div>
                    <span className={`text-xs font-medium ${
                      user.rank === 1 ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      #{user.rank}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievement Progress */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
            >
              <h2 className="text-lg font-bold mb-3">Your Achievement</h2>
              <div className="flex items-center mb-4">
                <div className="bg-white bg-opacity-20 rounded-full p-3 mr-3">
                  <FiAward className="text-xl" />
                </div>
                <div>
                  <p className="font-medium">Dedicated Learner</p>
                  <p className="text-sm opacity-80">Complete 10 hours of study</p>
                </div>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '63%' }}></div>
              </div>
              <p className="text-right text-sm mt-1">6.3/10 hours</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

StudentCourses.auth = true;