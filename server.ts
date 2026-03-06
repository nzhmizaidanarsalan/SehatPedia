import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';

const db = new Database('sehatpedia.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    readTime INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed initial data if empty
const count = db.prepare('SELECT COUNT(*) as count FROM articles').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO articles (title, excerpt, content, category, imageUrl, readTime) VALUES (?, ?, ?, ?, ?, ?)');
  
  insert.run(
    'Pentingnya Hidrasi untuk Kesehatan Tubuh',
    'Temukan mengapa minum air yang cukup sangat penting untuk menjaga tingkat energi, meningkatkan kesehatan kulit, dan mendukung fungsi organ vital.',
    'Air adalah komponen utama tubuh manusia, mencakup sekitar 60% dari berat badan kita. Setiap sistem dalam tubuh Anda bergantung pada air. Misalnya, air membuang racun dari organ vital, membawa nutrisi ke sel-sel Anda, dan menyediakan lingkungan yang lembap untuk jaringan telinga, hidung, dan tenggorokan.\n\nKekurangan air dapat menyebabkan dehidrasi, suatu kondisi yang terjadi ketika Anda tidak memiliki cukup air dalam tubuh Anda untuk menjalankan fungsi normal. Bahkan dehidrasi ringan dapat menguras energi Anda dan membuat Anda merasa lelah.\n\nBerapa banyak air yang Anda butuhkan? Aturan praktis yang baik adalah minum delapan gelas air sehari, tetapi kebutuhan individu dapat bervariasi berdasarkan usia, jenis kelamin, tingkat aktivitas fisik, dan iklim tempat Anda tinggal.',
    'Nutrisi',
    'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=800',
    5
  );

  insert.run(
    '5 Pose Yoga Sederhana untuk Pemula',
    'Mulai perjalanan yoga Anda dengan pose-pose yang mudah diikuti ini yang dapat membantu meningkatkan fleksibilitas, mengurangi stres, dan meningkatkan suasana hati Anda.',
    'Yoga adalah praktik kuno yang menyatukan pikiran, tubuh, dan jiwa. Jika Anda baru mengenal yoga, jangan khawatir! Anda tidak perlu menjadi sangat fleksibel atau kuat untuk memulai. Berikut adalah 5 pose sederhana yang sempurna untuk pemula:\n\n1. Mountain Pose (Tadasana): Berdiri tegak dengan kaki rapat, bahu rileks, dan lengan di samping tubuh. Tarik napas dalam-dalam dan rasakan hubungan Anda dengan bumi.\n\n2. Downward-Facing Dog (Adho Mukha Svanasana): Mulai dari posisi merangkak, angkat pinggul ke atas dan ke belakang, membentuk huruf V terbalik dengan tubuh Anda.\n\n3. Child\'s Pose (Balasana): Duduk di atas tumit Anda, rentangkan lengan ke depan, dan letakkan dahi di lantai. Ini adalah pose istirahat yang bagus.\n\n4. Tree Pose (Vrksasana): Berdiri dengan satu kaki, letakkan telapak kaki lainnya di paha bagian dalam atau betis kaki yang berdiri. Jaga keseimbangan dan fokus pada satu titik.\n\n5. Corpse Pose (Savasana): Berbaring telentang dengan lengan dan kaki rileks. Tutup mata dan biarkan tubuh Anda sepenuhnya rileks. Ini biasanya dilakukan di akhir sesi yoga.',
    'Gaya Hidup',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    7
  );

  insert.run(
    'Memahami Hipertensi: Penyebab dan Pencegahan',
    'Pelajari tentang pembunuh diam-diam, tekanan darah tinggi. Kami merinci faktor risiko, gejala, dan langkah-langkah yang dapat ditindaklanjuti untuk mencegahnya.',
    'Hipertensi, atau tekanan darah tinggi, sering disebut sebagai "pembunuh diam-diam" karena seringkali tidak memiliki gejala yang jelas, tetapi dapat menyebabkan masalah kesehatan yang serius seperti penyakit jantung dan stroke.\n\nTekanan darah diukur dengan dua angka: sistolik (tekanan saat jantung berdetak) dan diastolik (tekanan saat jantung beristirahat di antara detak). Tekanan darah normal biasanya di bawah 120/80 mmHg.\n\nFaktor risiko hipertensi meliputi usia, riwayat keluarga, obesitas, kurang aktivitas fisik, merokok, dan diet tinggi garam. Meskipun beberapa faktor risiko tidak dapat diubah, banyak yang dapat dikelola melalui perubahan gaya hidup.\n\nUntuk mencegah atau mengelola hipertensi, pertimbangkan untuk:\n- Makan makanan yang sehat dan seimbang, kaya buah-buahan, sayuran, dan biji-bijian utuh.\n- Mengurangi asupan garam.\n- Berolahraga secara teratur.\n- Menjaga berat badan yang sehat.\n- Membatasi konsumsi alkohol.\n- Mengelola stres.',
    'Penyakit',
    'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800',
    8
  );

  insert.run(
    'Tips Menjaga Mobilitas di Usia Lanjut',
    'Saran praktis dan latihan yang dirancang khusus untuk lansia guna membantu menjaga kemandirian dan tetap aktif dengan aman.',
    'Menjaga mobilitas sangat penting seiring bertambahnya usia untuk mempertahankan kemandirian dan kualitas hidup. Berikut adalah beberapa tips untuk membantu lansia tetap aktif dan aman:\n\n1. Tetap Aktif Secara Fisik: Lakukan olahraga ringan secara teratur, seperti berjalan kaki, berenang, atau yoga kursi. Ini membantu menjaga kekuatan otot, fleksibilitas, dan keseimbangan.\n\n2. Latihan Keseimbangan: Latihan keseimbangan sederhana, seperti berdiri dengan satu kaki (sambil berpegangan pada kursi untuk dukungan), dapat membantu mencegah jatuh.\n\n3. Perhatikan Lingkungan Rumah: Pastikan rumah aman dengan menghilangkan bahaya tersandung, seperti karpet yang longgar atau kabel yang berserakan. Pasang pegangan tangan di kamar mandi dan tangga.\n\n4. Gunakan Alat Bantu Jika Perlu: Jangan ragu untuk menggunakan tongkat atau walker jika itu membantu Anda merasa lebih stabil dan percaya diri saat berjalan.\n\n5. Konsultasikan dengan Dokter: Bicarakan dengan dokter Anda sebelum memulai program olahraga baru, terutama jika Anda memiliki kondisi kesehatan yang mendasarinya.',
    'Kesehatan Lansia',
    'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&q=80&w=800',
    6
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/articles', (req, res) => {
    const articles = db.prepare('SELECT * FROM articles ORDER BY createdAt DESC').all();
    res.json(articles);
  });

  app.get('/api/articles/:id', (req, res) => {
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  });

  app.post('/api/articles', (req, res) => {
    const { title, excerpt, content, category, imageUrl, readTime } = req.body;
    const insert = db.prepare('INSERT INTO articles (title, excerpt, content, category, imageUrl, readTime) VALUES (?, ?, ?, ?, ?, ?)');
    const info = insert.run(title, excerpt, content, category, imageUrl, readTime);
    res.json({ id: info.lastInsertRowid });
  });

  app.put('/api/articles/:id', (req, res) => {
    const { title, excerpt, content, category, imageUrl, readTime } = req.body;
    const update = db.prepare('UPDATE articles SET title = ?, excerpt = ?, content = ?, category = ?, imageUrl = ?, readTime = ? WHERE id = ?');
    update.run(title, excerpt, content, category, imageUrl, readTime, req.params.id);
    res.json({ success: true });
  });

  app.delete('/api/articles/:id', (req, res) => {
    const del = db.prepare('DELETE FROM articles WHERE id = ?');
    del.run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the dist folder
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
