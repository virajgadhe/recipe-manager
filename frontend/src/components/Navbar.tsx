import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-gray-900 hover:text-indigo-600 transition"
          >
            🍳 Recipe Manager
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/search"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              Search
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
