// src/components/CourseDetail.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { UserContext } from "../context/UserContext";

/**
 * CourseDetail Component
 *
 * Fetches and displays a single course from the API.
 * Renders Update/Delete buttons if the authenticated user owns the course.
 * Handles deleting a course and redirects after deletion.
 */
const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`);
        if (response.status === 404) {
          navigate("/notfound");
          return;
        }
        if (!response.ok) {
          throw new Error(`Error fetching course: ${response.status}`);
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        navigate("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add auth header if needed, e.g. Basic auth
        },
      });

      if (response.status === 500) {
        navigate("/error");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to delete course: ${response.status}`);
      }

      navigate("/"); // Redirect to courses list after deletion
    } catch (err) {
      console.error(err);
      navigate("/error");
    }
  };

  if (loading) return <p>Loading course...</p>;
  if (!course) return null; // Redirect already handled

  const isOwner = authUser && authUser.id === course.userId;

  return (
    <main className="wrap main--detail">
      <div className="course--header">
        <h2 className="course--title">{course.title}</h2>
        <p>By {course.user.firstName} {course.user.lastName}</p>
      </div>
      <ReactMarkdown className="course--description">
        {course.description}
      </ReactMarkdown>
      <h3>Materials Needed</h3>
      <ReactMarkdown className="course--materials">
        {course.materialsNeeded}
      </ReactMarkdown>

      {isOwner && (
        <div className="course--actions">
          <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
          <button className="button" onClick={handleDelete}>Delete Course</button>
        </div>
      )}
    </main>
  );
};

export default CourseDetail;
