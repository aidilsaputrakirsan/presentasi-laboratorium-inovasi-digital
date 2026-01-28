# Presentasi Laboratorium Inovasi Digital

Dashboard presentasi untuk Laboratorium Inovasi Digital yang menampilkan data Tridarma Dosen terintegrasi dengan SINTA 3.

## Fitur

- **Dashboard SINTA**: Visualisasi data publikasi, penelitian, pengabdian, dan IPR dosen
- **Kategori Publikasi**: Breakdown Scopus (Q1-Q4) dan SINTA (S1-S6)
- **Top Sitasi**: Peringkat dosen berdasarkan jumlah sitasi
- **Produktivitas Tridarma**: Grafik perbandingan output dosen
- **Tabel Detail**: Data lengkap per dosen dengan sorting

## Persyaratan

### Frontend (Vue.js)
- Node.js >= 16.x
- npm atau yarn

### Scraper (Python)
- Python >= 3.8
- pip

## Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd presentasi-laboratorium-inovasi-digital
```

### 2. Install Dependencies Frontend
```bash
npm install
```

### 3. Install Dependencies Python (untuk scraper)
```bash
pip install requests beautifulsoup4
```

## Menjalankan Aplikasi

### Development Mode
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173` (atau port lain jika 5173 sudah digunakan)

### Production Build
```bash
npm run build
npm run preview
```

## Update Data SINTA

Data SINTA disimpan di `src/data/sinta_data.json`. Untuk mengupdate data terbaru dari SINTA:

```bash
python scripts/sinta_scraper.py
```

**Catatan Penting:**
- Scraper membutuhkan koneksi internet
- Proses scraping memakan waktu sekitar 2-3 detik per dosen
- **Data yang diambil adalah data KUMULATIF KESELURUHAN KARIR** (bukan per tahun)
- SINTA tidak menyediakan filter tahun, semua data adalah lifetime/all-time

## Penjelasan Data

### Apa yang dimaksud data kumulatif?

Semua angka yang ditampilkan adalah **total akumulasi sepanjang karir dosen**, bukan data tahunan atau 5 tahun terakhir:

| Metrik | Penjelasan | Sumber |
|--------|------------|--------|
| Scopus Q1-Q4 | Total publikasi Scopus sepanjang karir | Scopus |
| SINTA S1-S6 | Total publikasi nasional terakreditasi | SINTA Garuda |
| Sitasi | Total sitasi yang diterima keseluruhan | **Google Scholar** (lebih komprehensif) |
| H-Index | Indeks berdasarkan publikasi | Tertinggi dari Scopus/GScholar/WoS |
| IPR/HKI | Total Hak Kekayaan Intelektual terdaftar | SINTA |
| Penelitian | Total hibah penelitian yang pernah diterima | SINTA |
| Pengabdian | Total kegiatan pengabdian masyarakat | SINTA |
| Publikasi (Chart) | Total publikasi terindeks | Scopus + SINTA Garuda |

### Sumber Data

Data diambil dari portal [SINTA Kemdiktisaintek](https://sinta.kemdiktisaintek.go.id):

- **Sitasi & H-Index**: Menggunakan data **Google Scholar** karena lebih komprehensif untuk peneliti Indonesia (mencakup publikasi bahasa Indonesia)
- **Publikasi Scopus**: Data dari indeks Scopus internasional dengan kategori Q1-Q4
- **Publikasi SINTA**: Data dari Garuda (portal jurnal Indonesia) dengan akreditasi S1-S6
- **Penelitian & Pengabdian**: Data hibah dari SINTA

## Struktur Data

### Data Dosen (`src/data/lecturers.json`)
Berisi daftar dosen per program studi beserta SINTA ID mereka.

### Data SINTA (`src/data/sinta_data.json`)
Hasil scraping dari SINTA, berisi:
- **stats**: Metrik dasar (articles, citations, h-index, dll)
- **documents**: Publikasi dengan kategori
  - `scopus`: Q1, Q2, Q3, Q4, noq (tanpa quartile), total
  - `sinta`: S1, S2, S3, S4, S5, S6, unknown (tanpa akreditasi), total
- **research**: Daftar penelitian
- **services**: Daftar pengabdian masyarakat
- **books**: Daftar buku
- **ipr**: Hak Kekayaan Intelektual (Hak Cipta, Paten)

## Menambah/Mengubah Data Dosen

1. Edit file `src/data/lecturers.json`
2. Tambahkan SINTA ID dosen yang ingin ditampilkan
3. Jalankan scraper untuk mengambil data:
   ```bash
   python scripts/sinta_scraper.py
   ```

## Keterangan Kolom Tabel

| Kolom | Keterangan |
|-------|------------|
| Q1-Q4 | Quartile Scopus (Q1 = tertinggi) |
| S1-S6 | Akreditasi SINTA Nasional (S1 = tertinggi) |
| - | Publikasi tanpa kategori/akreditasi |
| Jml | Jumlah total publikasi |
| Sitasi | Total sitasi kumulatif |
| H-Index | H-Index berdasarkan Scopus |
| IPR | Hak Kekayaan Intelektual |
| Buku | Jumlah buku yang diterbitkan |

## Tech Stack

- **Frontend**: Vue 3 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + vue-chartjs
- **Scraper**: Python + BeautifulSoup4

## Troubleshooting

### Scraper tidak mengambil data
- Pastikan koneksi internet stabil
- SINTA ID harus valid dan terdaftar di SINTA
- Coba jalankan ulang jika timeout

### Data tidak muncul di dashboard
- Pastikan file `src/data/sinta_data.json` sudah ada dan valid
- Restart development server setelah update data

### Chart kosong
- Periksa apakah data publikasi tersedia di `sinta_data.json`
- Dosen mungkin belum memiliki publikasi terindeks

## Struktur Folder

```
presentasi-laboratorium-inovasi-digital/
├── public/              # Static assets
├── scripts/
│   └── sinta_scraper.py # Python scraper untuk SINTA
├── src/
│   ├── components/      # Vue components
│   │   └── SintaStatistics.vue
│   ├── data/
│   │   ├── lecturers.json    # Daftar dosen & SINTA ID
│   │   └── sinta_data.json   # Hasil scraping SINTA
│   ├── App.vue
│   └── main.js
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Lisensi

MIT License
