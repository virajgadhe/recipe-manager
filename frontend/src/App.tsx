import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import CreateRecipe from './pages/recipes/CreateRecipe';
import EditRecipe from './pages/recipes/EditRecipe';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/categories/:id" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/recipes/new"
            element={
              <ProtectedRoute>
                <CreateRecipe />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recipes/:id/edit"
            element={
              <ProtectedRoute>
                <EditRecipe />
              </ProtectedRoute>
            }
          />

          {/* 🔐 Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/*  404 */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-800">
                  404 - Page Not Found
                </h1>
                <p className="max-w-md mb-6 text-gray-500">
                  The page you are looking for does not exist.
                </p>
                <Link
                  to="/"
                  className="px-6 py-3 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700"
                >
                  Back to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
