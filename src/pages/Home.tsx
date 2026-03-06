import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <main className="flex-1 flex flex-col gap-12 pb-12">
      <section className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] flex items-end p-8 md:p-12 bg-slate-800 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000")' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <div className="relative z-20 max-w-2xl text-white">
          <span className="inline-block bg-primary text-background-light text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Unggulan</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">Tips Hidup Sehat Setiap Hari</h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl">Sumber harian Anda untuk konten kesehatan edukatif dan tips praktis untuk kehidupan yang lebih baik.</p>
          <button className="bg-primary hover:bg-primary/90 text-background-light px-8 py-3.5 rounded-xl text-base font-bold transition-colors flex items-center gap-2 w-max">
            Jelajahi Artikel
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-secondary">Kategori</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <a className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary transition-colors group text-center" href="#">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-light transition-colors">
              <span className="material-symbols-outlined">coronavirus</span>
            </div>
            <h3 className="font-bold text-sm">Penyakit</h3>
          </a>
          <a className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary transition-colors group text-center" href="#">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-light transition-colors">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <h3 className="font-bold text-sm">Nutrisi</h3>
          </a>
          <a className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary transition-colors group text-center" href="#">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-light transition-colors">
              <span className="material-symbols-outlined">directions_run</span>
            </div>
            <h3 className="font-bold text-sm">Gaya Hidup</h3>
          </a>
          <a className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary transition-colors group text-center" href="#">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-light transition-colors">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <h3 className="font-bold text-sm">Kesehatan Mental</h3>
          </a>
          <a className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary transition-colors group text-center" href="#">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-light transition-colors">
              <span className="material-symbols-outlined">elderly</span>
            </div>
            <h3 className="font-bold text-sm">Kesehatan Lansia</h3>
          </a>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 text-secondary">Artikel Terbaru</h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <span className="text-xs text-text-muted-light dark:text-text-muted-dark">{formatDate(article.createdAt)} • {article.readTime} menit baca</span>
                      <Link to={`/article/${article.id}`} className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                        Baca Selengkapnya <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="w-full lg:w-80 flex flex-col gap-8">
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              Artikel Populer
            </h3>
            <div className="flex flex-col gap-4">
              <a className="flex gap-4 group" href="#">
                <div className="w-16 h-16 rounded bg-slate-300 flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200")' }}></div>
                <div>
                  <h4 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-2 text-secondary">10 Makanan Super yang Anda Butuhkan dalam Diet Anda Sekarang</h4>
                  <span className="text-xs text-text-muted-light dark:text-text-muted-dark">15 Okt 2023</span>
                </div>
              </a>
              <a className="flex gap-4 group" href="#">
                <div className="w-16 h-16 rounded bg-slate-300 flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=200")' }}></div>
                <div>
                  <h4 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-2 text-secondary">Cara Memperbaiki Jadwal Tidur Anda dalam 3 Hari</h4>
                  <span className="text-xs text-text-muted-light dark:text-text-muted-dark">12 Okt 2023</span>
                </div>
              </a>
              <a className="flex gap-4 group" href="#">
                <div className="w-16 h-16 rounded bg-slate-300 flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200")' }}></div>
                <div>
                  <h4 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-2 text-secondary">Mengatasi Kecemasan Tanpa Obat</h4>
                  <span className="text-xs text-text-muted-light dark:text-text-muted-dark">05 Okt 2023</span>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-4xl text-primary mb-2">mail</span>
            <h3 className="text-lg font-bold mb-2 text-secondary">Dapatkan Tips Kesehatan Mingguan</h3>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">Bergabunglah dengan buletin kami dan terima saran kesehatan yang dikurasi langsung ke kotak masuk Anda.</p>
            <form className="flex flex-col gap-3">
              <input className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm" placeholder="Alamat email Anda" type="email" />
              <button className="w-full bg-primary hover:bg-primary/90 text-background-light font-bold py-2.5 rounded-lg transition-colors" type="button">Berlangganan Sekarang</button>
            </form>
          </div>
        </aside>
      </div>
    </main>
  );
}
