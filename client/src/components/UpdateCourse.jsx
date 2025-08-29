// src/components/UpdateCourse.jsx
import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * UpdateCourse component allows an authenticated user to update an existing course.
 * It fetches the current course data, populates the form, and submits updates to the API.
 *
 * Features:
 *  - Fetches course details on mount using course ID from route params
 *  - Populates form fields with existing course data
 *  - Handles validation errors and displays them
 *  - Sends a PUT request to update the course
 *  - Provides Cancel button to navigate back to course detail
 *
 * @component
 * @returns {JSX.Element} Form for updating a course with validation and navigation
 */
const UpdateCourse = () => {
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [errors, setErrors] = useState([]);

  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  /**
   * Fetches course data from API on component mount or when course ID changes.
   * Sets course state or error state if fetch fails.
   */
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load course');
        return res.json();
      })
      .then(data => setCourse(data))
      .catch(() => setErrors(['Error loading course']));
  }, [id]);

  /**
   * Handles form submission to update the course.
   * Sends a PUT request with updated course data.
   *
   * @param {React.FormEvent} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const updatedCourse = {
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };

    const credentials = {
      emailAddress: authUser.emailAddress,
      password: authUser.password,
    };

    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${credentials.emailAddress}:${credentials.password}`)
      },
      body: JSON.stringify(updatedCourse)
    })
      .then(res => {
        if (res.status === 204) {
          navigate(`/courses/${id}`);
        } else if (res.status === 400) {
          return res.json().then(data => setErrors(data.errors));
        } else {
          throw new Error('Update failed');
        }
      })
      .catch(() => setErrors(['Failed to update course']));
  };

  if (!course) return <p>Loading course details...</p>;

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>

        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((err, index) => <li key={index}>{err}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue={course.title}
                ref={courseTitle}
              />

              <p>By {course.User?.firstName} {course.User?.lastName}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                defaultValue={course.description}
                ref={courseDescription}
              ></textarea>
            </div>

            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue={course.estimatedTime}
                ref={estimatedTime}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                defaultValue={course.materialsNeeded}
                ref={materialsNeeded}
              ></textarea>
            </div>
          </div>

          <button className="button" type="submit">Update Course</button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => navigate(`/courses/${id}`)}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;
