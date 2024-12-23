import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  // Access Redux state
  const { currentUser } = useSelector((state) => state.user);

  // Debugging
  console.log("PrivateRoute - currentUser:", currentUser);

  // Render logic
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
