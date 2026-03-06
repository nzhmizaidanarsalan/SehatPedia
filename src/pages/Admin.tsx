import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Article } from '../types';

export default function Admin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'articles' | 'comments'>('articles');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchArticles = () => {
    setLoading(true);
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  };

  const fetchComments = () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    fetch('/api/admin/comments', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/login');
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching comments:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (activeTab === 'articles') {
      fetchArticles();
    } else {
      fetchComments();
    }
  }, [activeTab]);

  const handleDelete = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      const token = localStorage.getItem('adminToken');
      fetch(`/api/articles/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (res.status === 401) {
            localStorage.removeItem('adminToken');
            navigate('/login');
            throw new Error('Unauthorized');
          }
          return fetchArticles();
        })
        .catch(err => console.error('Error deleting article:', err));
    }
  };

  const handleDeleteComment = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
      const token = localStorage.getItem('adminToken');
      fetch(`/api/comments/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (res.status === 401) {
            localStorage.removeItem('adminToken');
            navigate('/login');
            throw new Error('Unauthorized');
          }
          return fetchComments();
        })
        .catch(err => console.error('Error deleting comment:', err));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <main className="flex-1 flex flex-col gap-6 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          {activeTab === 'articles' && (
            <Link to="/admin/editor" className="bg-primary hover:bg-primary/90 text-background-light px-5 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span>
              Tulis Artikel Baru
            </Link>
          )}
          <button onClick={handleLogout} className="bg-red-50 text-red-600 hover:bg-red-100 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">logout</span>
            Keluar
          </button>
        </div>
      </div>

      <div className="flex border-b border-border-light dark:border-border-dark mb-4">
        <button 
          onClick={() => setActiveTab('articles')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'articles' ? 'border-primary text-primary' : 'border-transparent text-text-muted-light hover:text-secondary'}`}
        >
          Kelola Artikel
        </button>
        <button 
          onClick={() => setActiveTab('comments')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'comments' ? 'border-primary text-primary' : 'border-transparent text-text-muted-light hover:text-secondary'}`}
        >
          Kelola Komentar
        </button>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {activeTab === 'articles' ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark">
                  <th className="p-4 font-bold text-sm text-secondary">Judul Artikel</th>
                  <th className="p-4 font-bold text-sm text-secondary">Kategori</th>
                  <th className="p-4 font-bold text-sm text-secondary">Tanggal</th>
                  <th className="p-4 font-bold text-sm text-secondary text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-text-muted-light">Memuat data...</td>
                  </tr>
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-text-muted-light">Belum ada artikel.</td>
                  </tr>
                ) : (
                  articles.map(article => (
                    <tr key={article.id} className="border-b border-border-light dark:border-border-dark hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-text-main-light dark:text-text-main-dark line-clamp-1">{article.title}</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded uppercase">
                          {article.category}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-text-muted-light dark:text-text-muted-dark">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/article/${article.id}`} className="p-2 text-text-muted-light hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="Lihat">
                            <span className="material-symbols-outlined text-sm">visibility</span>
                          </Link>
                          <Link to={`/admin/editor/${article.id}`} className="p-2 text-text-muted-light hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50" title="Edit">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </Link>
                          <button onClick={() => handleDelete(article.id)} className="p-2 text-text-muted-light hover:text-red-600 transition-colors rounded-lg hover:bg-red-50" title="Hapus">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark">
                  <th className="p-4 font-bold text-sm text-secondary">Pengguna</th>
                  <th className="p-4 font-bold text-sm text-secondary">Komentar</th>
                  <th className="p-4 font-bold text-sm text-secondary">Artikel</th>
                  <th className="p-4 font-bold text-sm text-secondary">Tanggal</th>
                  <th className="p-4 font-bold text-sm text-secondary text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-text-muted-light">Memuat data...</td>
                  </tr>
                ) : comments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-text-muted-light">Belum ada komentar.</td>
                  </tr>
                ) : (
                  comments.map(comment => (
                    <tr key={comment.id} className="border-b border-border-light dark:border-border-dark hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-text-main-light dark:text-text-main-dark">{comment.name}</div>
                        <div className="text-xs text-text-muted-light dark:text-text-muted-dark">{comment.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-text-main-light dark:text-text-main-dark line-clamp-2">{comment.content}</div>
                      </td>
                      <td className="p-4">
                        <Link to={`/article/${comment.articleId}`} className="text-sm text-primary hover:underline line-clamp-1">
                          {comment.articleTitle}
                        </Link>
                      </td>
                      <td className="p-4 text-sm text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">
                        {formatDate(comment.createdAt)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleDeleteComment(comment.id)} className="p-2 text-text-muted-light hover:text-red-600 transition-colors rounded-lg hover:bg-red-50" title="Hapus">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
