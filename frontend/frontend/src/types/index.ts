export interface Course {
  _id: string;           // Course unique identifier
  title: string;         // Title of the course
  description: string;   // Description of the course
  price: number;         // Price of the course
  imageLink: string;     // Link to the course image
  instructor: string;    // Instructor of the course
}

export interface User {
  _id: string;                // User unique identifier
  username: string;             // User's email
  purchasedCourses: Course[]; // List of courses the user has purchased
}

export interface AuthResponse {
  token: string;    // Authentication token
  user: User;       // User object containing user details
}
