# Presentasi Laboratorium Inovasi Digital

Dashboard analitik komprehensif untuk Laboratorium Inovasi Digital yang menampilkan data Tridarma Dosen, terintegrasi langsung dengan profil SINTA Kemdikbudristek. Sistem ini dibangun untuk memonitor, menganalisis produktivitas akademika, dan mendukung kebutuhan Akreditasi & Audit Mutu Internal (AMI) universitas.

---

## 🌟 Fitur Utama

Aplikasi ini mencakup 7 fitur inti yang saling terhubung untuk menganalisis data SINTA:

### 1. Dashboard SINTA Utama
- Visualisasi metrik dosen: Jumlah Publikasi, Penelitian, Pengabdian, HKI.
- Kategorisasi publikasi Scopus (Q1-Q4) dan SINTA (S1-S6).
- Pemantauan H-Index dan top sitasi dosen secara realtime.
- Grafik produktivitas Tridarma lintas tahun.

### 2. Koleksi Karya (Research Gallery)
- Galeri responsif untuk seluruh karya akademik dosen.
- 6 Kategori Utama: Penelitian, Pengabdian, Scopus, SINTA, Buku, HKI.
- Fitur pencarian instan dan filter multi-dimensi (Berdasarkan Tahun, Prodi, dan Tipe).

### 3. Kolaborasi Riset (Research Clusters)
- **AI-Powered Clustering**: Menggunakan Machine Learning (TF-IDF + K-Means) untuk mendeteksi topik penelitian serupa secara otomatis.
- **Deteksi Cross-Prodi**: Otomatis menemukan kolaborasi interdisipliner misalnya antara *"Sistem Informasi"* & *"Bisnis Digital"*.
- Sistem *Badge* Potensi Kolaborasi: 🔥 High (Banyak dosen, beda prodi), ✨ Medium, 📌 Low.
- Pengelompokan ini berguna untuk pembentukan tim hibah riset ke depannya.

### 4. Roadmap Riset (Sankey Timeline)
- **Visualisasi Sankey Diagram**: Memetakan evolusi topik penelitian dari tahun ke tahun (2018 - sekarang).
- **Analisis Tren**: Menggunakan TF-IDF tahunan untuk mengekstrak keyword dominan, memfilter topik statis, dan menghubungkan topik *time-series*.
- Berguna untuk mendeteksi penelitian yang *sustainable* maupun *emerging topics*.

### 5. Expertise Finder (Sistem Matchmaking Pakar)
- Fitur pencarian presisi untuk Rekan/Mahasiswa yang mencari pembimbing riset yang akurat.
- **Information Retrieval**: Input proposal/ide riset (secara natural) -> algoritma **TF-IDF scoring** mencocokkan "Profile DNA" dosen secara instan di sisi Frontend Web tanpa membebani server/database.

### 6. Dana & Hibah (Funding Dashboard)
- Dashboard pemantauan dan pengelolaan aliran dana riset/pengabdian yang ter-scrape otomatis dari SINTA.
- Visualisasi tren pendanaan dari waktu ke waktu dan persentase sumber pendanaan (Internal vs Eksternal/BIMA).
- Merangkum "Kinerja Dosen" dengan logika spesifik terhadap status aktivitas (sebagai Ketua / Anggota eksternal prodi).

### 7. DTPS Akreditasi (NEW!)
- **Indikator Akreditasi (Standar LKPS BAN-PT)**: Menampilkan rekapitulasi Dosen Tetap Program Studi (DTPS) mutlak untuk kebutuhan administrasi Akreditasi dan AMI.
- Otomatis menghitung: **Rasio Penelitian/DTPS**, **Rasio Pengabdian/DTPS**, dan **Total Dana/DTPS**.
- Mendukung fitur interaktif penambahan "Dosen Lintas Prodi" via checkbox untuk mensimulasikan perubahan rasio secara *real-time*.

---

## � Sistem Multi-Prodi & Arsitektur Data Otomatis

Sistem telah mendukung multi-skala institusi. Arsitektur data diubah menjadi berbasis *Program Studi*, tidak sekadar menumpuk di 1 file sehingga sangat *maintainable*.

### Alur Kerja (SINTA Data Workflow)
Data di-generate secara asinkronus menggunakan Pipeline Python:
1. **Input File**: Cukup definisikan SINTA ID Dosen ke dalam `src/data/prodi/{kode-prodi}/lecturers.json`.
2. **SINTA Scraper**: Bot men-scrape website rekapitulasi publik SINTA (Tanpa Butuh Autentikasi Login) guna menarik data performa riset.
3. **Data Analytics**: Sistem memproses struktur teks (TF-IDF Vect, K-Means Clustering) guna membentuk jaringan konektivitas riset antardepartemen.
4. **Data Injection**: Menghasilkan file JSON optimasi (`sinta_data.json`, `expertise_data.json`, `clusters_data.json`, `roadmap_data.json`) per prodi yang siap dikonsumsi langsung oleh sistem Frontend.

---

## � Quick Start & Cara Menjalankan

### 1. Requirements
- **Node.js 16+** (Frontend Application)
- **Python 3.8+** (Backend Processing Scraper)

### 2. Instalasi Eksekusi
```bash
# 1. Clone repository & navigasi masuk
git clone <repository-url>
cd presentasi-laboratorium-inovasi-digital

# 2. Package Frontend Setup
npm install

# 3. Environment Python Setup
pip install -r scripts/requirements.txt
```

### 3. Cara Menambahkan Data / Prodi Baru
Ingin mengintegrasikan prodi baru misal `"teknik-elektro"`:
1. Buat folder config di `src/data/prodi/teknik-elektro/lecturers.json`. Formating parameter minimal butuh `"name"` dan `"sintaId"`.
2. Jalankan perintah scrape pipeline:
   ```bash
   python scripts/sinta_scraper.py teknik-elektro
   python scripts/build_expertise_data.py teknik-elektro
   python scripts/research_clustering.py teknik-elektro
   
   # Terakhir, build roadmap global lintas institusional
   python scripts/research_roadmap.py
   ```
3. Registrasikan mapping prodi tersebut di file `src/data/prodi/index.js` (Ubah status flag menjadi `hasData: true`).
4. Dashboard & Graph Analytics siap digunakan.

### 4. Menjalankan Dashboard Mode Development
```bash
npm run dev
```
Buka Browser: `http://localhost:5173`. Semua interaktivitas dirender secara terpadu di *Client-Side Architecture*.

---

## ⚙️ Tech Stack & Dependencies

| Layer Komponen | Teknologi Implementasi |
|----------------|------------------------|
| **Frontend Framework** | Vue.js 3, UI Tools dengan Vite & Node.js |
| **Data Visualization Diagram** | Chart.js, Apache ECharts |
| **Interface Styling** | Tailwind CSS 3 (Utility First Component) |
| **Data Scraper Service** | Python 3, Webhook via BeautifulSoup4 |
| **Machine Learning Algo** | `scikit-learn` Core Library (NLP Vectorization) |

---

## 📄 Lisensi
MIT License
