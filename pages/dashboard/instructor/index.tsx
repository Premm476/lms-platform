import { useSession } from 'next-auth/react';
import { FiBook, FiUsers, FiBarChart2, FiDollarSign } from 'react-icons/fi';

export default function InstructorDashboard() {
  const { data: session } = useSession();
  
  // Mock data
  const stats = [
    { name: 'Total Courses', value: 8, icon: FiBook, change: '+2 from last month' },
    { name: 'Total Students', value: 142, icon: FiUsers, change: '+12 from last month' },
    { name: 'Completion Rate', value: '78%', icon: FiBarChart2, change: '+5% from last month' },
    { name: 'Total Revenue', value: '$3,240', icon: FiDollarSign, change: '+$420 from last month' },
  ];

  const recentStudents = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', joined: '2 days ago' },
    { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', joined: '5 days ago' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', joined: '1 week ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {session?.user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your courses today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Students</h2>
          <div className="space-y-4">
            {recentStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
                <span className="text-sm text-gray-500">{student.joined}</span>
              </div>
            ))}
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View all students →
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Course Performance</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder for course performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

InstructorDashboard.auth = true;