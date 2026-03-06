import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../types';

interface Comment {
  id: number;
  name: string;
  content: string;
  createdAt: string;
}

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Comment form state
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

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

    // Fetch comments
    fetchComments();
  }, [id]);

  const fetchComments = () => {
    fetch(`/api/articles/${id}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
      })
      .catch(err => console.error('Error fetching comments:', err));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingComment(true);
    setCommentError('');
    setCommentSuccess(false);

    fetch(`/api/articles/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: commentName,
        email: commentEmail,
        content: commentContent
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengirim komentar');
        return res.json();
      })
      .then(() => {
        setCommentName('');
        setCommentEmail('');
        setCommentContent('');
        setCommentSuccess(true);
        fetchComments();
      })
      .catch(err => {
        setCommentError(err.message);
      })
      .finally(() => {
        setSubmittingComment(false);
      });
  };

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

        {/* Comments Section */}
        <div className="border-t border-border-light dark:border-border-dark pt-10 mt-10">
          <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">forum</span>
            Komentar ({comments.length})
          </h3>

          {/* Comment Form */}
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 mb-8">
            <h4 className="font-bold text-lg mb-4 text-secondary">Tinggalkan Komentar</h4>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">Bagikan pengalaman atau pendapat Anda. Email Anda tidak akan dipublikasikan.</p>
            
            {commentSuccess && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm border border-green-200">
                Komentar berhasil dikirim!
              </div>
            )}
            
            {commentError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200">
                {commentError}
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm font-bold text-secondary">Nama</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                    placeholder="Nama Anda"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-bold text-secondary">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                    placeholder="Email Anda (tidak dipublikasikan)"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="content" className="text-sm font-bold text-secondary">Komentar</label>
                <textarea 
                  id="content" 
                  required
                  rows={4}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm resize-none"
                  placeholder="Tulis komentar Anda di sini..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={submittingComment}
                className="bg-primary hover:bg-primary/90 text-background-light px-6 py-2.5 rounded-lg font-bold transition-colors self-start disabled:opacity-70"
              >
                {submittingComment ? 'Mengirim...' : 'Kirim Komentar'}
              </button>
            </form>
          </div>

          {/* Comments List */}
          <div className="flex flex-col gap-6">
            {comments.length === 0 ? (
              <p className="text-text-muted-light dark:text-text-muted-dark text-center py-4 italic">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-secondary font-bold flex-shrink-0">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h5 className="font-bold text-secondary">{comment.name}</h5>
                      <span className="text-xs text-text-muted-light dark:text-text-muted-dark">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-text-main-light dark:text-text-main-dark text-sm whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
