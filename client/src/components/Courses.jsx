// src/components/Courses.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCourses } from "../utils/apiHelper";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        // Redirect to error page if status 500
        if (err.message.includes("500")) {
          navigate("/error");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

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
