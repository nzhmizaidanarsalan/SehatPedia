import React from 'react';

export default function TentangKami() {
  return (
    <main className="flex-1 flex flex-col gap-8 pb-12 max-w-3xl mx-auto w-full">
      <div className="border-b border-border-light dark:border-border-dark pb-6">
        <h1 className="text-3xl font-bold text-secondary mb-2">Tentang Kami</h1>
      </div>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Selamat datang di SehatPedia.</p>
        
        <p>SehatPedia adalah website yang menyediakan informasi dan edukasi seputar kesehatan yang disajikan dengan bahasa yang mudah dipahami oleh masyarakat. Website ini bertujuan untuk membantu pembaca mendapatkan wawasan mengenai berbagai topik kesehatan seperti penyakit umum, gaya hidup sehat, nutrisi, serta tips menjaga kesehatan sehari-hari.</p>
        
        <p>Kami berusaha menyajikan informasi yang berdasarkan referensi ilmiah, literatur kesehatan, serta sumber terpercaya seperti jurnal kesehatan, organisasi kesehatan dunia, dan publikasi medis. Informasi yang tersedia di SehatPedia diharapkan dapat membantu masyarakat meningkatkan kesadaran dan pengetahuan tentang kesehatan.</p>
        
        <p>Konten yang tersedia di website ini bersifat edukatif dan informatif. SehatPedia tidak menggantikan peran tenaga kesehatan profesional seperti dokter, perawat, atau tenaga medis lainnya. Jika Anda memiliki keluhan kesehatan atau membutuhkan diagnosis medis, disarankan untuk berkonsultasi langsung dengan tenaga kesehatan yang kompeten.</p>
        
        <p>Kami percaya bahwa akses terhadap informasi kesehatan yang jelas dan mudah dipahami dapat membantu masyarakat mengambil keputusan yang lebih baik dalam menjaga kesehatan mereka.</p>
        
        <p>Terima kasih telah mengunjungi SehatPedia.</p>
      </div>
    </main>
  );
}
