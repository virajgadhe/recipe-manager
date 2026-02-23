import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg"
          >
            <div
              className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center
                         group-hover:bg-indigo-700 transition-colors duration-150"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span
              className="text-base font-bold text-gray-900 tracking-tight
                         group-hover:text-indigo-600 transition-colors duration-150"
            >
              Recipe Manager
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                 ${
                   isActive
                     ? 'text-indigo-600 bg-indigo-50'
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                 }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/search"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
                 transition-colors duration-150 focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-indigo-400
                 ${
                   isActive
                     ? 'text-indigo-600 bg-indigo-50'
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                 }`
              }
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
                />
              </svg>
              Search
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
