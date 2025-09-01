// src/components/CourseDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * CourseDetail component fetches and displays detailed information for a specific course.
 * It allows authorized users to update or delete the course.
 *
 * Features:
 *  - Fetch course details from REST API using course ID from route params
 *  - Display course title, author, description, estimated time, and materials needed
 *  - Allow signed-in users who own the course to update or delete it
 *  - Show a "Return to List" link for all users
 *
 * @component
 * @returns {JSX.Element} The CourseDetail view for a single course
 */
const CourseDetail = () => {
  const { id } = useParams();
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Fetches course data from the API when the component mounts or ID changes.
   */
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load course');
        return res.json();
      })
      .then(data => setCourse(data))
      .catch(err => {
        console.error('Error fetching course:', err);
        setError('Error loading course');
      });
  }, [id]);

  /**
   * Deletes the current course if the user is signed in and authorized.
   * Redirects to the course list on successful deletion.
   */
  const deleteCourse = async () => {
    if (!authUser) return alert('You must be signed in to delete a course.');

    if (course && String(authUser.id) !== String(course.userId)) {
      return alert('You are not authorized to delete this course.');
    }

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
        }
      });

      if (res.status === 204) {
        navigate('/');
      } else {
        const data = await res.json();
        setError(data.errors || ['Failed to delete course']);
      }
    } catch (err) {
      console.error('Delete failed:', err);
      setError(['Failed to delete course']);
    }
  };

  if (error) return <p>{error}</p>;
  if (!course) return <p>Loading course details...</p>;

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {/* Only show Update/Delete if user is signed in and owns course */}
          {authUser && course && String(authUser.id) === String(course.User?.id) && (
  <>
    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
    <button className="button" onClick={deleteCourse}>Delete Course</button>
  </>
)}

          {/* Always show Return to List */}
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            <p>By {course.User?.firstName} {course.User?.lastName}</p>
            <ReactMarkdown>{course.description}</ReactMarkdown>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime || 'Not specified'}</p>

            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">
              <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetail;