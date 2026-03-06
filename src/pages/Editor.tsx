import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Nutrisi',
    imageUrl: '',
    readTime: 5,
    excerpt: '',
    content: ''
  });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetch(`/api/articles/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            title: data.title,
            category: data.category,
            imageUrl: data.imageUrl,
            readTime: data.readTime,
            excerpt: data.excerpt,
            content: data.content
          });
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching article:', err);
          setLoading(false);
        });
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = isEditing ? `/api/articles/${id}` : '/api/articles';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        navigate('/admin');
      })
      .catch(err => {
        console.error('Error saving article:', err);
        setSaving(false);
      });
  };

  if (loading) {
    return <div className="p-12 text-center">Memuat editor...</div>;
  }

  return (
    <main className="flex-1 flex flex-col gap-6 pb-12 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Link to="/admin" className="p-2 text-text-muted-light hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-3xl font-bold text-secondary">
          {isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
        
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-bold text-sm text-secondary">Judul Artikel</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required
            className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            placeholder="Masukkan judul artikel..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-bold text-sm text-secondary">Kategori</label>
            <select 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            >
              <option value="Penyakit">Penyakit</option>
              <option value="Nutrisi">Nutrisi</option>
              <option value="Gaya Hidup">Gaya Hidup</option>
              <option value="Kesehatan Mental">Kesehatan Mental</option>
              <option value="Kesehatan Lansia">Kesehatan Lansia</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="readTime" className="font-bold text-sm text-secondary">Waktu Baca (menit)</label>
            <input 
              type="number" 
              id="readTime" 
              name="readTime" 
              value={formData.readTime} 
              onChange={handleChange} 
              required min="1"
              className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="imageUrl" className="font-bold text-sm text-secondary">URL Gambar Thumbnail</label>
          <input 
            type="url" 
            id="imageUrl" 
            name="imageUrl" 
            value={formData.imageUrl} 
            onChange={handleChange} 
            required
            className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            placeholder="https://images.unsplash.com/..."
          />
          {formData.imageUrl && (
            <div className="mt-2 h-32 w-48 rounded-lg bg-cover bg-center border border-border-light" style={{ backgroundImage: `url("${formData.imageUrl}")` }}></div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="excerpt" className="font-bold text-sm text-secondary">Ringkasan Singkat (Excerpt)</label>
          <textarea 
            id="excerpt" 
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleChange} 
            required rows={3}
            className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
            placeholder="Tulis ringkasan singkat artikel di sini..."
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-bold text-sm text-secondary">Isi Artikel</label>
          <textarea 
            id="content" 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            required rows={15}
            className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            placeholder="Tulis isi artikel lengkap di sini..."
          ></textarea>
        </div>

        <div className="flex justify-end pt-4 border-t border-border-light dark:border-border-dark">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-primary hover:bg-primary/90 text-background-light px-8 py-3 rounded-lg font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? 'Menyimpan...' : 'Simpan Artikel'}
          </button>
        </div>

      </form>
    </main>
  );
}
