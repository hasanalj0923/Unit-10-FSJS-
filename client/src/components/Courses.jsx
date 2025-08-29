import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Courses component fetches and displays a list of all available courses.
 * Each course links to its CourseDetail page. Provides a link to create a new course.
 *
 * Features:
 *  - Fetches all courses from the REST API on component mount
 *  - Displays each course with title and link to details
 *  - Provides a "New Course" link to navigate to the CreateCourse page
 *
 * @component
 * @returns {JSX.Element} The Courses view with course listings and navigation links
 */
const Courses = () => {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Fetches courses from the API when the component mounts.
   * Sets courses state if successful, or error state if fetch fails.
   */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Error loading courses');
      }
    };

    fetchCourses();
  }, []);

  if (error) return <p>{error}</p>;
  if (!courses) return <p>Loading courses...</p>;

  return (
    <main>
      <div className="wrap main--grid">
        {courses.length > 0 ? (
          courses.map(course => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="course--module course--link"
            >
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          ))
        ) : (
          <p>No courses available at the moment.</p>
        )}

        <Link
          to="/courses/create"
          className="course--module course--add--module"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6" />
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
