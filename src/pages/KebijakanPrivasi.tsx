import React from 'react';

export default function KebijakanPrivasi() {
  return (
    <main className="flex-1 flex flex-col gap-8 pb-12 max-w-3xl mx-auto w-full">
      <div className="border-b border-border-light dark:border-border-dark pb-6">
        <h1 className="text-3xl font-bold text-secondary mb-2">Kebijakan Privasi</h1>
      </div>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Kebijakan Privasi ini menjelaskan bagaimana SehatPedia mengumpulkan, menggunakan, dan melindungi informasi yang diperoleh dari pengunjung website.</p>
        
        <h3>Informasi yang Dikumpulkan</h3>
        <p>SehatPedia dapat mengumpulkan informasi non-pribadi seperti alamat IP, jenis perangkat, jenis browser, halaman yang dikunjungi, serta waktu kunjungan. Informasi ini digunakan untuk menganalisis penggunaan website dan meningkatkan kualitas layanan.</p>
        
        <h3>Penggunaan Cookies</h3>
        <p>Website ini dapat menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies membantu website memahami preferensi pengunjung sehingga konten dapat ditampilkan dengan lebih relevan.</p>
        
        <h3>Penggunaan Informasi</h3>
        <p>Informasi yang dikumpulkan digunakan untuk:</p>
        <ul>
          <li>meningkatkan kualitas konten dan layanan website</li>
          <li>memahami perilaku pengunjung dalam menggunakan website</li>
          <li>mengoptimalkan pengalaman pengguna</li>
        </ul>
        
        <h3>Iklan Pihak Ketiga</h3>
        <p>Website ini dapat menggunakan layanan periklanan pihak ketiga seperti Google AdSense. Pihak ketiga tersebut dapat menggunakan cookies atau teknologi serupa untuk menampilkan iklan yang relevan kepada pengguna berdasarkan aktivitas mereka di internet.</p>
        
        <h3>Perlindungan Informasi</h3>
        <p>Kami berkomitmen untuk menjaga keamanan informasi pengunjung dan tidak menjual atau membagikan informasi pribadi kepada pihak lain tanpa persetujuan pengguna.</p>
        
        <p>Dengan menggunakan website SehatPedia, Anda dianggap telah menyetujui kebijakan privasi ini.</p>
      </div>
    </main>
  );
}
