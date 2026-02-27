import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition
     ${
       isActive
         ? 'bg-indigo-600 text-white shadow'
         : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
     }`;

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur bg-white/80">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-gray-900 transition hover:text-indigo-600"
          >
            🍳 Recipe Manager
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={navStyle}>
              Home
            </NavLink>

            <NavLink to="/search" className={navStyle}>
              Search
            </NavLink>

            {user ? (
              <>
                <NavLink to="/recipes/new" className={navStyle}>
                  Create
                </NavLink>

                <NavLink to="/dashboard" className={navStyle}>
                  Dashboard
                </NavLink>

                <NavLink to="/profile" className={navStyle}>
                  Profile
                </NavLink>
                
                <NavLink to="/likes" className={navStyle}>
                  Likes
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-red-600 transition hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navStyle}>
                  Login
                </NavLink>

                <NavLink to="/register" className={navStyle}>
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
