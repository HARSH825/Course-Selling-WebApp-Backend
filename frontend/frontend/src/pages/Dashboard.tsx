import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CourseCard } from '../components/CourseCard';
import { Course } from '../types';
import { BookOpen, GraduationCap, Layout } from 'lucide-react';
import axios from 'axios';

export const Dashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<'available' | 'purchased'>('available');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !user?.username) {
      navigate('/login');
      return;
    }

    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (activeTab === 'available') {
          // Fetch available courses
          const availableResponse = await axios.get('http://localhost:3000/admin/courses', {
            headers: { 
              Authorization: token 
            }
          });

          if (Array.isArray(availableResponse.data.courseData)) {
            setAvailableCourses(availableResponse.data.courseData);
          }
        } else {
          // Fetch purchased courses
          const purchasedResponse = await axios.get('http://localhost:3000/user/purchasedCourses', {
            headers: {
              Authorization: token,
              username: user.username // Backend expects username in headers
            }
          });

          if (Array.isArray(purchasedResponse.data.purchased)) {
            setPurchasedCourses(purchasedResponse.data.purchased);
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token, user?.username, activeTab, navigate]);

  const isCoursePurchased = (courseId: string) => {
    return purchasedCourses.some(course => course._id === courseId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Layout className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.username}</h1>
              <p className="text-gray-600">Manage your courses and continue learning</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('available')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'available'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Available Courses
          </button>
          <button
            onClick={() => setActiveTab('purchased')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'purchased'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <GraduationCap className="h-5 w-5 mr-2" />
            My Courses
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'available' &&
            availableCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isPurchased={isCoursePurchased(course._id)} // Check if the course is purchased
              />
            ))}

          {activeTab === 'purchased' &&
            purchasedCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isPurchased={true} // Purchased courses are always marked as purchased
              />
            ))}
        </div>

        {/* Empty States */}
        {activeTab === 'available' && availableCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
            <p className="text-gray-600">Check back later for new courses</p>
          </div>
        )}

        {activeTab === 'purchased' && purchasedCourses.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No purchased courses</h3>
            <p className="text-gray-600">You haven't purchased any courses yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
