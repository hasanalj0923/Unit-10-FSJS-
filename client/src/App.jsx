import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute';

/**
 * The main App component that renders the Header and sets up all routes for the application.
 *
 * Routes:
 *  - "/" → Courses component
 *  - "/courses/:id" → CourseDetail component
 *  - "/courses/create" → CreateCourse component (protected by PrivateRoute)
 *  - "/courses/:id/update" → UpdateCourse component (protected by PrivateRoute)
 *  - "/signin" → UserSignIn component
 *  - "/signup" → UserSignUp component
 *
 * Components:
 *  - Header: Renders the top navigation menu with authentication buttons
 *
 * @component
 * @returns {JSX.Element} The App component with routing setup
 */
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
        </Route>
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
      </Routes>
    </>
  );
};

export default App;
