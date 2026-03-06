import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Editor from './pages/Editor';
import ArticleDetail from './pages/Article';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="article/:id" element={<ArticleDetail />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/editor" element={<Editor />} />
          <Route path="admin/editor/:id" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
