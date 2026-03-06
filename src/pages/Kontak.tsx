import React, { useState } from 'react';

export default function Kontak() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <main className="flex-1 flex flex-col gap-8 pb-12 max-w-4xl mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-secondary mb-4">Hubungi Kami</h1>
        <p className="text-text-muted-light dark:text-text-muted-dark text-lg max-w-2xl mx-auto">
          Punya pertanyaan, saran, atau ingin bekerja sama? Jangan ragu untuk mengirimkan pesan kepada kami melalui formulir di bawah ini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6">
            <h3 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">mail</span>
              Email
            </h3>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
              Kirimkan email langsung ke:
              <br />
              <a href="mailto:nazhmizaidan05@gmail.com" className="text-primary font-medium hover:underline mt-1 inline-block">
                nazhmizaidan05@gmail.com
              </a>
            </p>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6">
            <h3 className="font-bold text-lg text-secondary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">chat</span>
              WhatsApp
            </h3>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm mb-3">
              Butuh respon cepat? Hubungi admin via WhatsApp:
            </p>
            <a 
              href="https://wa.me/6285624228093?text=Halo%20Admin%20Nazhmi,%20saya%20ingin%20bertanya%20seputar%20SehatPedia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-lg font-medium transition-colors w-full"
            >
              <span className="material-symbols-outlined text-sm">chat_bubble</span>
              Chat WhatsApp
            </a>
          </div>
        </div>

        <div className="md:col-span-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-secondary mb-6">Kirim Pesan</h2>
          
          {isSuccess && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-200 flex items-start gap-3">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
              <div>
                <h4 className="font-bold">Pesan Terkirim!</h4>
                <p className="text-sm mt-1">Terima kasih telah menghubungi kami. Kami akan membalas pesan Anda secepatnya.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-bold text-secondary">Nama Lengkap</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-bold text-secondary">Alamat Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                  placeholder="email@contoh.com"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-sm font-bold text-secondary">Subjek</label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                placeholder="Topik pesan Anda"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-bold text-secondary">Pesan</label>
              <textarea 
                id="message" 
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm resize-none"
                placeholder="Tulis pesan Anda di sini..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-background-light px-6 py-3 rounded-lg font-bold transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">send</span>
                  Kirim Pesan
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
