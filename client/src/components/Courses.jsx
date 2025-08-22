// src/components/Courses.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Courses Component
 *
 * Fetches the list of courses from the REST API and renders them.
 * Each course links to its Course Detail page.
 * Includes a "Create Course" link for adding a new course.
 */
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error(`Error fetching courses: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="wrap main--grid">
      {courses.map(course => (
        <Link
          className="course--module course--link"
          key={course.id}
          to={`/courses/${course.id}`}
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}

      <Link className="course--module course--add--module" to="/courses/create">
        <h2 className="course--add--title">+</h2>
        <h3 className="course--add--title">New Course</h3>
      </Link>
    </main>
  );
};

export default Courses;
