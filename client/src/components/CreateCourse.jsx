// src/components/CreateCourse.jsx
import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);

  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  // Start with the two default validation errors
  const [errors, setErrors] = useState([
    "Please provide a value for 'Title'",
    "Please provide a value for 'Description'"
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authUser) {
      navigate("/signin");
      return;
    }

    const newCourse = {
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
      userId: authUser.id,
    };

    try {
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(`${authUser.emailAddress}:${authUser.password}`)
        },
        body: JSON.stringify(newCourse),
      });

      if (response.status === 201) {
        navigate("/"); // redirect to course list
      } else if (response.status === 400 || response.status === 401) {
        const data = await response.json();
        // If API returns validation errors, show them; otherwise keep defaults
        setErrors(data.errors || [
          "Please provide a value for 'title'",
          "Please provide a value for 'description'"
        ]);
      } else {
        throw new Error("Unexpected error");
      }
    } catch (err) {
      setErrors([
        "Please provide a value for 'title'",
        "Please provide a value for 'description'"
      ]);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <main>
      {authUser && (
        <div className="wrap">
          <h2>Create Course</h2>

          {/* Always show validation errors block */}
          {errors.length > 0 && (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />

                <p>
                  By: {authUser.firstName} {authUser.lastName}
                </p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription" ref={courseDescription}></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
              </div>
            </div>

            <button className="button" type="submit">Create Course</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}
    </main>
  );
};

export default CreateCourse;
