import React, { useState, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      e.preventDefault();
      navigate('/admin');
      setClickCount(0);
    }

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 1000);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-display min-h-screen flex flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <header className="flex flex-wrap gap-y-4 items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark py-4 mb-6">
          <div className="flex items-center gap-8">
            <Link to="/" onClick={handleLogoClick} className="flex items-center gap-1 font-logo text-3xl font-bold tracking-tight select-none">
              <span className="text-secondary">Sehat</span>
              <span className="text-primary flex items-center">
                Pe
                <div className="relative inline-flex items-center justify-center w-6 h-8 border-4 border-primary rounded-full mx-0.5">
                  <div className="absolute w-2 h-0.5 bg-primary top-3 right-1 rounded"></div>
                  <div className="absolute w-0.5 h-2 bg-primary top-1 left-2.5 rounded"></div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary rounded-b-full"></div>
                </div>
                ia
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-text-main-light dark:text-text-main-dark text-sm font-medium hover:text-primary transition-colors">Beranda</Link>
              <Link to="/kategori/Penyakit" className="text-text-main-light dark:text-text-main-dark text-sm font-medium hover:text-primary transition-colors">Penyakit</Link>
              <Link to="/kategori/Nutrisi" className="text-text-main-light dark:text-text-main-dark text-sm font-medium hover:text-primary transition-colors">Nutrisi</Link>
              <Link to="/kategori/Gaya Hidup" className="text-text-main-light dark:text-text-main-dark text-sm font-medium hover:text-primary transition-colors">Gaya Hidup</Link>
              <Link to="/kategori/Kesehatan Lansia" className="text-text-main-light dark:text-text-main-dark text-sm font-medium hover:text-primary transition-colors">Kesehatan Lansia</Link>
              <Link to="/kontak" className="text-text-main-light dark:text-text-main-dark text-sm font-medium hover:text-primary transition-colors">Kontak</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
            <form onSubmit={handleSearch} className="flex flex-1 sm:flex-initial items-center bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full px-4 py-2">
              <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark mr-2 text-sm">search</span>
              <input 
                className="bg-transparent border-none outline-none text-sm text-text-main-light dark:text-text-main-dark placeholder-text-muted-light dark:placeholder-text-muted-dark w-full sm:w-32 lg:w-48 focus:ring-0 p-0" 
                placeholder="Cari artikel..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </header>
        
        <Outlet />

        <footer className="border-t border-border-light dark:border-border-dark py-8 mt-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-1 font-logo text-xl font-bold tracking-tight">
              <span className="text-secondary">Sehat</span>
              <span className="text-primary flex items-center">
                Pe
                <div className="relative inline-flex items-center justify-center w-4 h-5 border-[3px] border-primary rounded-full mx-[1px]">
                  <div className="absolute w-1.5 h-0.5 bg-primary top-2 right-0.5 rounded"></div>
                  <div className="absolute w-0.5 h-1.5 bg-primary top-1 left-1.5 rounded"></div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary rounded-b-full"></div>
                </div>
                ia
              </span>
            </Link>
            <div className="flex flex-wrap justify-center gap-6">
              <Link className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" to="/tentang-kami">Tentang Kami</Link>
              <Link className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" to="/kebijakan-privasi">Kebijakan Privasi</Link>
              <Link className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" to="/penyangkalan">Penyangkalan</Link>
              <Link className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" to="/kontak">Kontak</Link>
              <Link className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors" to="/admin">Admin</Link>
            </div>
            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">© 2026 SehatPedia. Hak cipta dilindungi undang-undang.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
