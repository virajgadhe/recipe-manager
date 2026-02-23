import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/categories/:id" element={<CategoryPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
