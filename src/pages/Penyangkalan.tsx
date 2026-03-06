import React from 'react';

export default function Penyangkalan() {
  return (
    <main className="flex-1 flex flex-col gap-8 pb-12 max-w-3xl mx-auto w-full">
      <div className="border-b border-border-light dark:border-border-dark pb-6">
        <h1 className="text-3xl font-bold text-secondary mb-2">Penyangkalan (Disclaimer)</h1>
      </div>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Informasi yang disediakan di website SehatPedia bertujuan untuk edukasi dan informasi umum mengenai kesehatan.</p>
        
        <p>Seluruh konten yang terdapat di website ini tidak dimaksudkan sebagai pengganti konsultasi medis profesional, diagnosis, atau perawatan dari dokter atau tenaga kesehatan yang berkualifikasi.</p>
        
        <p>Meskipun kami berusaha menyajikan informasi yang akurat dan terkini, SehatPedia tidak menjamin bahwa seluruh informasi di website ini selalu lengkap, akurat, atau terbaru. Penggunaan informasi yang tersedia di website ini sepenuhnya menjadi tanggung jawab pengguna.</p>
        
        <p>Jika Anda mengalami keluhan kesehatan, gejala penyakit, atau kondisi medis tertentu, sangat disarankan untuk berkonsultasi dengan dokter atau tenaga kesehatan profesional.</p>
        
        <p>SehatPedia tidak bertanggung jawab atas segala kerugian atau dampak yang mungkin timbul dari penggunaan informasi yang terdapat di website ini.</p>
      </div>
    </main>
  );
}
