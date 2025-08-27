// src/utils/apiHelper.js
const API_BASE = "http://localhost:5000/api";

const api = async ({ path, method = "GET", body = null, credentials = null }) => {
  const url = `${API_BASE}/${path}`;
  const options = {
    method,
    headers: {},
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  }

  if (credentials) {
    const encoded = btoa(`${credentials.emailAddress}:${credentials.password}`);
    options.headers["Authorization"] = `Basic ${encoded}`;
  }

  try {
    const response = await fetch(url, options);
    if (response.status === 500) console.error(`Server error at ${url}: 500`);
    return response;
  } catch (err) {
    console.error("API request error:", err);
    throw err;
  }
};

// Specific API methods
export const getCourses = () => api({ path: "courses" }).then(res => {
  if (!res.ok) throw new Error(`Failed to fetch courses: ${res.status}`);
  return res.json();
});

export const getCourseById = (id) => api({ path: `courses/${id}` }).then(res => {
  if (!res.ok) {
    if (res.status === 404) throw new Error("404");
    throw new Error(`Failed to fetch course: ${res.status}`);
  }
  return res.json();
});

export const createCourse = (courseData, credentials) => api({ path: "courses", method: "POST", body: courseData, credentials });

export const updateCourse = (id, courseData, credentials) => api({ path: `courses/${id}`, method: "PUT", body: courseData, credentials });

export const deleteCourse = (id, credentials) => api({ path: `courses/${id}`, method: "DELETE", credentials });