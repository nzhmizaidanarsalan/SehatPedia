import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../types';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching article:', err);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
        <h1 className="text-3xl font-bold text-secondary">Artikel Tidak Ditemukan</h1>
        <Link to="/" className="text-primary hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col gap-8 pb-12 max-w-3xl mx-auto w-full">
      <Link to="/" className="text-text-muted-light hover:text-primary transition-colors flex items-center gap-1 w-max">
        <span className="material-symbols-outlined text-sm">arrow_back</span> Kembali
      </Link>

      <article className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider w-max">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-secondary">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-text-muted-light dark:text-text-muted-dark border-b border-border-light dark:border-border-dark pb-6">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              {formatDate(article.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {article.readTime} menit baca
            </span>
          </div>
        </div>

        <div 
          className="w-full h-64 md:h-96 rounded-2xl bg-cover bg-center shadow-sm"
          style={{ backgroundImage: `url("${article.imageUrl}")` }}
        ></div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mt-4">
          <p className="text-xl text-text-muted-light dark:text-text-muted-dark font-medium leading-relaxed mb-8">
            {article.excerpt}
          </p>
          
          {article.content.split('\\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 leading-relaxed text-text-main-light dark:text-text-main-dark">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
