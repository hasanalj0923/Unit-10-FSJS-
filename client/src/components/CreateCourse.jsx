// src/components/CreateCourse.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ValidationErrors from "./ValidationErrors";
import { api } from "../utils/apiHelper";

/**
 * CreateCourse Component
 *
 * Renders a form to create a new course.
 * Sends a POST request to the API when submitted.
 * Displays validation errors if any.
 */
const CreateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id
    };

    try {
      const response = await api.post("/courses", courseData, {
        // Include auth headers if required, e.g., Basic Auth
      });

      if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors || []);
        return;
      }

      if (response.status === 500) {
        navigate("/error");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to create course: ${response.status}`);
      }

      const newCourse = await response.json();
      navigate(`/courses/${newCourse.id}`); // Redirect to newly created course
    } catch (err) {
      console.error(err);
      navigate("/error");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main className="wrap">
      <h2>Create Course</h2>
      <ValidationErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Course Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Course Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="estimatedTime">Estimated Time</label>
        <input
          id="estimatedTime"
          name="estimatedTime"
          type="text"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
        />

        <label htmlFor="materialsNeeded">Materials Needed</label>
        <textarea
          id="materialsNeeded"
          name="materialsNeeded"
          value={materialsNeeded}
          onChange={(e) => setMaterialsNeeded(e.target.value)}
        />

        <button type="submit" className="button">Create Course</button>
        <button type="button" className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </main>
  );
};

export default CreateCourse;
