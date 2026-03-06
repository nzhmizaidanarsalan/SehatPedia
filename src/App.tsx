import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Editor from './pages/Editor';
import ArticleDetail from './pages/Article';
import Category from './pages/Category';
import Search from './pages/Search';
import Login from './pages/Login';
import TentangKami from './pages/TentangKami';
import KebijakanPrivasi from './pages/KebijakanPrivasi';
import Penyangkalan from './pages/Penyangkalan';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="article/:id" element={<ArticleDetail />} />
          <Route path="kategori/:name" element={<Category />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="tentang-kami" element={<TentangKami />} />
          <Route path="kebijakan-privasi" element={<KebijakanPrivasi />} />
          <Route path="penyangkalan" element={<Penyangkalan />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/editor" element={<Editor />} />
          <Route path="admin/editor/:id" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
