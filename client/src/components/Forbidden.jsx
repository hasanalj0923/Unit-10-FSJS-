// src/components/Forbidden.jsx
/**
 * Forbidden Component
 *
 * Renders a message letting the user know that they can't access the requested page.
 */
const Forbidden = () => {
  return (
    <main className="wrap">
      <h2>Access Forbidden</h2>
      <p>Sorry, you do not have permission to view this page.</p>
    </main>
  );
};

export default Forbidden;
