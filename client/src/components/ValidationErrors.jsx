// src/components/ValidationErrors.jsx
/**
 * ValidationErrors Component
 *
 * Renders a list of validation errors.
 * Expects an array of error messages as the 'errors' prop.
 */
const ValidationErrors = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="validation--errors">
      <h3>Validation Errors</h3>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ValidationErrors;
