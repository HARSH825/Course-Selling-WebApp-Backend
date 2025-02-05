import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onPurchase?: (courseId: string) => void;
  isPurchased?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onPurchase, isPurchased }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={course.imageLink} // Correctly use imageLink property
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
        <p className="mt-2 text-gray-600">{course.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">${course.price}</span>
        </div>

        {/* Always show the Purchase button */}
        <button
          onClick={() => onPurchase && onPurchase(course._id)} // Ensure the correct _id is passed
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Purchase Course
        </button>

        {isPurchased && (
          <div className="mt-4 text-center py-2 px-4 bg-green-100 text-green-800 rounded-md">
            Purchased
          </div>
        )}
      </div>
    </div>
  );
};
