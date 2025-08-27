// src/components/UpdateCourse.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ValidationErrors from "./ValidationErrors";
import { api } from "../utils/apiHelper";

/**
 * UpdateCourse Component
 *
 * Renders a form to update an existing course.
 * Fetches course details and populates the form.
 * Sends a PUT request to the API on submit.
 * Handles validation errors and redirects.
 */
const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        if (response.status === 404) {
          navigate("/notfound");
          return;
        }
        if (!response.ok) {
          throw new Error(`Error fetching course: ${response.status}`);
        }

        const data = await response.json();

        if (authUser.id !== data.userId) {
          navigate("/forbidden");
          return;
        }

        setTitle(data.title);
        setDescription(data.description);
        setEstimatedTime(data.estimatedTime);
        setMaterialsNeeded(data.materialsNeeded);
      } catch (err) {
        console.error(err);
        navigate("/error");
      }
    };

    fetchCourse();
  }, [id, navigate, authUser.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCourse = { title, description, estimatedTime, materialsNeeded };

    try {
      const response = await api.put(`/courses/${id}`, updatedCourse, {
        // Include auth headers if required
      });

      if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors || []);
        return;
      }

      if (response.status === 403) {
        navigate("/forbidden");
        return;
      }

      if (response.status === 404) {
        navigate("/notfound");
        return;
      }

      if (response.status === 500) {
        navigate("/error");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to update course: ${response.status}`);
      }

      navigate(`/courses/${id}`);
    } catch (err) {
      console.error(err);
      navigate("/error");
    }
  };

  const handleCancel = () => {
    navigate(`/courses/${id}`);
  };

  return (
    <main className="wrap">
      <h2>Update Course</h2>
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

        <button type="submit" className="button">Update Course</button>
        <button type="button" className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </main>
  );
};

export default UpdateCourse;
