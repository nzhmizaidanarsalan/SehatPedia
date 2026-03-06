import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../types';

export default function Category() {
  const { name } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles?category=${encodeURIComponent(name || '')}`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  }, [name]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <main className="flex-1 flex flex-col gap-8 pb-12">
      <div className="flex items-center gap-4 border-b border-border-light dark:border-border-dark pb-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl">category</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-secondary">Kategori: {name}</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark mt-1">Menampilkan artikel dengan topik {name}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-text-muted-light mb-4">article</span>
          <h2 className="text-xl font-bold text-secondary mb-2">Belum Ada Artikel</h2>
          <p className="text-text-muted-light">Belum ada artikel yang diterbitkan dalam kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <div className="h-48 bg-slate-300 w-full relative bg-cover bg-center" style={{ backgroundImage: `url("${article.imageUrl}")` }}>
                <span className="absolute top-4 left-4 bg-primary text-background-light text-xs font-bold px-2 py-1 rounded uppercase">{article.category}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <Link to={`/article/${article.id}`}>
                  <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors cursor-pointer text-secondary line-clamp-2">{article.title}</h3>
                </Link>
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border-light dark:border-border-dark">
                  <span className="text-xs text-text-muted-light dark:text-text-muted-dark">{formatDate(article.createdAt)} • {article.readTime} mnt</span>
                  <Link to={`/article/${article.id}`} className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                    Baca <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
