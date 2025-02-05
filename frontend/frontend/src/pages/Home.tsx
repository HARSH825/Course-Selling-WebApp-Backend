
import { Sparkles, BookOpen, Clock, Users } from 'lucide-react';

export const Home = () => {
  const stats = [
    { icon: <BookOpen className="h-6 w-6" />, label: 'Courses', value: '100+' },
    { icon: <Users className="h-6 w-6" />, label: 'Students', value: '10,000+' },
    { icon: <Clock className="h-6 w-6" />, label: 'Hours', value: '1,000+' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
              Transform Your Future with Expert-Led Courses
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
              Join thousands of students learning from industry experts. Start your journey today with our comprehensive online courses.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/signup " className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                Explore Courses
              </a>
              <a href="/signup" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                <div className="text-indigo-600 mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our platform provides high-quality courses led by industry experts, designed to help you master the skills you need for your career.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <Sparkles className="h-8 w-8 text-indigo-600 mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">Expert-Led</h3>
              <p className="text-gray-600">Learn from the best in the industry</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-indigo-600 mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">Flexible Learning</h3>
              <p className="text-gray-600">Learn at your own pace, anytime, anywhere</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-indigo-600 mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">Community</h3>
              <p className="text-gray-600">Join a vibrant community of learners</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-gray-600 mb-8">Join our community of learners and advance your career today.</p>
          <a href="/signup" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Start Learning Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
