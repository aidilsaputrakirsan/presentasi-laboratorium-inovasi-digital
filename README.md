# Monitoring IKU/Akreditasi Dosen via Google Scholar

Aplikasi Vue 3 + Tailwind CSS untuk monitoring publikasi dosen per program studi melalui Google Scholar menggunakan SerpApi.

## 🎯 Fitur Utama

### 1. **Multi-Dosen Dashboard**
- Pilih Program Studi (Sistem Informasi / Bisnis Digital)
- Auto-fetch semua dosen dalam 1 prodi sekaligus
- **20 Dosen Total**: 12 Sistem Informasi + 8 Bisnis Digital

### 2. **Statistik Prodi**
- Total Dosen
- Total Publikasi
- Rata-rata Publikasi per Dosen
- Total Sitasi

### 3. **Visualisasi Data (Charts)**
- 📊 Publikasi per Tahun (Bar Chart)
- 🥧 Distribusi Penelitian vs Pengmas (Pie Chart)  
- 📈 Top 5 Dosen Produktif (Horizontal Bar Chart)

### 4. **Lecturer Cards (Expandable)**
- Card per dosen dengan ringkasan statistik
- Click to expand untuk lihat detail publikasi
- Quick stats: Publikasi 3 tahun, Penelitian, Pengmas

### 5. **Filter & Export**
- Filter tahun (2023-2026, 2024-2026, dll)
- Filter kategori (Penelitian/Pengmas)
- **Export CSV gabungan** semua dosen di prodi
- Format sesuai borang akreditasi

### 6. **Kategorisasi Otomatis**
- **Penelitian**: Artikel default
- **Pengmas**: Judul mengandung "Pengabdian", "Masyarakat", "Pemberdayaan", "Pelatihan"

### 7. **Link Validasi**
- Klik judul publikasi → Buka link asli
- Verifikasi mudah untuk auditor

## 📦 Instalasi

```bash
# Install dependencies
npm install
```

## 🚀 Menjalankan Aplikasi

### ⚠️ PENTING: Jalankan 2 Server Bersamaan

**Opsi 1: Otomatis (Recommended)**
```bash
npm run dev:all
```

**Opsi 2: Manual (2 Terminal Terpisah)**

Terminal 1 - Proxy Server:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

Akses aplikasi di: **http://localhost:5173**

## 💡 Cara Menggunakan

1. **Buka aplikasi** di http://localhost:5173
2. **Pilih Program Studi** (Sistem Informasi atau Bisnis Digital)
3. **Tunggu loading** - Sistem akan fetch data semua dosen sekaligus
4. **Lihat statistik & charts** di bagian atas
5. **Click lecturer card** untuk expand dan lihat detail publikasi
6. **Export CSV** untuk mendapatkan data semua dosen dalam format akreditasi

## 📊 Data yang Tersedia

### Sistem Informasi (12 Dosen)
- Yuyun Tri Wiranti
- Aidil Saputra Kirsan
- Arif Wicaksono Septyanto
- Henokh Lugo Hariyanto
- Lovinta Happy Atrinawati
- Vika Fitratunnany Insanittaqwa
- Hendy Indrawan Sunardi
- Dwi Nur Amalia
- Dwi Arief Prambudi
- I Putu Deny Arthawan Sugih Prabowo
- M. Ihsan Alfani Putera
- Sri Rahayu Natasia

### Bisnis Digital (8 Dosen)
- Agung Prabowo
- Bayu Nur Abdallah
- Deli Yansyah
- Eka Krisna Santoso
- Khairunnisa Rahmah
- Muhammad Ikhsan Alif S
- Prasis Damai Nursyam Hamijaya
- Luh Made Wisnu Satyaninggrat

## 🔧 Troubleshooting

### Error "Network Error"
✅ Pastikan proxy server running di port 3000  
✅ Gunakan `npm run dev:all` untuk menjalankan keduanya

### Charts tidak muncul
✅ Clear browser cache  
✅ Refresh halaman (Ctrl+F5)

### Data tidak muncul setelah pilih prodi
✅ Cek console browser untuk error  
✅ Pastikan SerpApi quota masih tersedia  
✅ Restart kedua server

## 🛠️ Teknologi

- **Vue 3** - Progressive Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Utility-first CSS
- **Chart.js** - Data Visualization
- **Express.js** - Proxy Server (bypass CORS)
- **SerpApi** - Google Scholar API
- **PapaParse** - CSV Export

## 📁 Struktur Project

```
├── src/
│   ├── components/
│   │   ├── ProdiSelector.vue        (Dropdown prodi)
│   │   ├── ProdiStatistics.vue      (Statistik prodi)
│   │   ├── ChartsSection.vue        (3 charts)
│   │   ├── LecturerCard.vue         (Card dosen)
│   │   ├── PublicationTable.vue     (Tabel publikasi)
│   │   ├── FilterControls.vue       (Filter & search)
│   │   └── StatCard.vue             (Stat component)
│   ├── data/
│   │   └── lecturers.json           (Master data dosen)
│   ├── services/
│   │   └── serpApi.js               (SerpApi integration)
│   ├── utils/
│   │   ├── categorization.js        (Auto-kategorisasi)
│   │   ├── csvExport.js             (Export CSV)
│   │   └── aggregation.js           (Agregasi data prodi)
│   ├── App.vue                       (Main app)
│   ├── main.js
│   └── style.css
├── server.js                         (Proxy server)
└── package.json
```

## ✨ Keunggulan

✅ **Efisien**: 1 klik → Data semua dosen  
✅ **Visual**: Charts interaktif untuk presentasi  
✅ **Akreditasi-Ready**: Export CSV langsung  
✅ **Modern UI**: Tailwind CSS profesional  
✅ **Real-time**: Data langsung dari Google Scholar  

## 📝 Developer Notes

- Data dosen tersimpan di `src/data/lecturers.json`
- Untuk menambah dosen, edit file lecturers.json
- SerpApi key di file `.env`
- Proxy server mengatasi CORS issue

---

**Dibuat untuk keperluan monitoring IKU dan akreditasi Program Studi** 
