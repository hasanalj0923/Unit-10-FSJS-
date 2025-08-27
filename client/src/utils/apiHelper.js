// src/utils/apiHelper.js
/**
 * api helper
 *
 * Performs a fetch request to the API.
 * Supports optional Basic Auth and JSON body.
 */
export const api = async ({ path, method = "GET", body = null, credentials = null }) => {
  const url = `http://localhost:5000/api/${path}`;

  const options = {
    method,
    headers: {},
  };

  // Add JSON body if provided
  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  }

  // Add Basic Auth header if credentials provided
  if (credentials) {
    const encoded = btoa(`${credentials.emailAddress}:${credentials.password}`);
    options.headers["Authorization"] = `Basic ${encoded}`;
  }

  try {
    const response = await fetch(url, options);

    // Optional: Log 500 for debugging
    if (response.status === 500) {
      console.error(`Server error at ${url}: 500`);
    }

    return response;
  } catch (err) {
    console.error("API request error:", err);
    throw err;
  }
};
