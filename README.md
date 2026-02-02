# Presentasi Laboratorium Inovasi Digital

Dashboard presentasi untuk Laboratorium Inovasi Digital yang menampilkan data Tridarma Dosen terintegrasi dengan SINTA 3.

## 🌟 Fitur Utama

### 1. Dashboard SINTA
- Visualisasi data publikasi, penelitian, pengabdian, dan IPR dosen
- Kategori publikasi Scopus (Q1-Q4) dan SINTA (S1-S6)
- Top sitasi dan H-Index dosen
- Produktivitas Tridarma dengan grafik

### 2. Koleksi Karya
- Galeri semua karya akademik dosen
- 6 kategori: Penelitian, Pengabdian, Scopus, SINTA, Buku, HKI
- Filter per prodi, pencarian, dan filter tahun
- Card-based responsive layout

### 3. Kolaborasi Riset
- **AI-Powered Clustering** menggunakan TF-IDF + K-Means
- Identifikasi topik penelitian serupa
- Deteksi kolaborasi **cross-prodi** (SI + Bisnis Digital)
- Badge potensi kolaborasi (High 🔥 / Medium ✨ / Low 📌)

### 4. Roadmap Riset (NEW!)
- **Visualisasi Sankey Diagram** evolusi topik riset
- Analisis tren kata kunci (keywords) dari 2018-2025
- Deteksi kontinuitas dan perubahan fokus penelitian antar tahun

📖 **Dokumentasi lengkap**: 
- [RESEARCH_CLUSTERING.md](./RESEARCH_CLUSTERING.md)
- [RESEARCH_ROADMAP.md](./RESEARCH_ROADMAP.md)

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <repository-url>
cd presentasi-laboratorium-inovasi-digital
npm install
```

### 2. Install Python Dependencies
```bash
pip install -r scripts/requirements.txt
```

### 3. Jalankan Dev Server
```bash
npm run dev
```
Buka `http://localhost:5173`

---

## 📊 Alur Penggunaan

```mermaid
flowchart LR
    A[Tambah Dosen] --> B[Run Scraper]
    B --> C[Run Analytics]
    C --> D[Lihat Dashboard]
    
    subgraph Scripts
    B[python scripts/sinta_scraper.py]
    C[python scripts/research_clustering.py\npython scripts/research_roadmap.py]
    end
```

### Step 1: Tambah Dosen Baru
Edit `src/data/lecturers.json`, tambahkan SINTA ID.

### Step 2: Scraping Data SINTA
```bash
python scripts/sinta_scraper.py
```

### Step 3: Jalankan Analytics (Clustering & Roadmap)
```bash
# Untuk Clustering Topik
python scripts/research_clustering.py

# Untuk Roadmap Tahunan
python scripts/research_roadmap.py
```

---

## 📁 Struktur Folder

```
presentasi-laboratorium-inovasi-digital/
├── scripts/
│   ├── sinta_scraper.py          # Scraper SINTA
│   ├── research_clustering.py     # TF-IDF Clustering
│   ├── research_roadmap.py        # Sankey Roadmap Analysis
│   └── requirements.txt
├── src/
│   ├── components/
│   │   ├── SintaStatistics.vue   # Dashboard utama
│   │   ├── ResearchGallery.vue   # Galeri karya
│   │   ├── ResearchClusters.vue  # Kolaborasi riset
│   │   ├── ResearchRoadmap.vue   # Roadmap riset
│   │   └── ...
│   ├── data/
│   │   ├── lecturers.json        # Daftar dosen
│   │   ├── sinta_data.json       # Data SINTA (hasil scraping)
│   │   ├── clusters_data.json    # Data cluster
│   │   └── roadmap_data.json     # Data roadmap
│   └── App.vue
├── RESEARCH_CLUSTERING.md
├── RESEARCH_ROADMAP.md
├── SINTA_DATA_FLOW.md
└── README.md
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vue 3 + Vite |
| Visualization | Chart.js, **Apache ECharts** |
| Styling | Tailwind CSS |
| Scraper | Python + BeautifulSoup4 |
| Analytics | scikit-learn (TF-IDF + K-Means) |

---

## 📄 Lisensi

MIT License
