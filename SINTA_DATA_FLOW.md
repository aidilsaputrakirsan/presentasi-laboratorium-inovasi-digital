# Analisis Data Flow SINTA Scraper

## 📋 Ringkasan

Berdasarkan analisis codebase, **YA, script SINTA scraper akan menarik data untuk SEMUA dosen yang didaftarkan**, tidak hanya satu prodi saja. Script ini mengambil data publik dari SINTA **TANPA PERLU LOGIN**, karena profil SINTA sifatnya terbuka dan dapat diakses secara publik.

---

## 🔑 Jawaban Pertanyaan Anda

### Apakah Semua Akun yang Didaftarkan Akan Ditarik Datanya?

**YA**, dengan syarat:
1. Dosen tersebut memiliki `sintaId` yang valid di file `lecturers.json`
2. Profil SINTA dosen tersebut dapat diakses secara publik

### Apakah Perlu Login ke SINTA?

**TIDAK perlu login**. Script menggunakan **web scraping** untuk mengakses halaman profil publik SINTA:
- URL: `https://sinta.kemdiktisaintek.go.id/authors/profile/{SINTA_ID}`
- Akses dilakukan sebagai visitor biasa (tanpa autentikasi)

---

## 🔄 Flow Diagram: Proses Pengambilan Data SINTA

```mermaid
flowchart TD
    A[🚀 Start: Run sinta_scraper.py] --> B[📖 Load lecturers.json]
    
    B --> C{Loop untuk setiap prodi}
    C --> D[Sistem Informasi]
    C --> E[Bisnis Digital]
    
    D --> F{Ada sintaId?}
    E --> F
    
    F -->|TIDAK| G[⏭️ Skip - tidak ada SINTA ID]
    F -->|YA| H[📋 Tambah ke daftar scraping]
    
    H --> I["🌐 HTTP Request ke SINTA<br/>(tanpa login)"]
    
    I --> J[📄 Scrape Main Page<br/>- Profile, Stats, H-Index]
    J --> K[📑 Scrape Documents<br/>- Scopus Q1-Q4<br/>- SINTA S1-S6]
    K --> L[🔬 Scrape Research<br/>- Penelitian]
    L --> M[🤝 Scrape Services<br/>- Pengabdian]
    M --> N[📚 Scrape Books<br/>- Buku]
    N --> O[💡 Scrape IPR<br/>- HKI/Paten]
    
    O --> P["⏱️ Delay 2 detik<br/>(rate limiting)"]
    P --> Q{Masih ada dosen?}
    
    Q -->|YA| I
    Q -->|TIDAK| R[💾 Save ke sinta_data.json]
    R --> S[✅ Done!]
    
    style A fill:#4CAF50,color:white
    style S fill:#4CAF50,color:white
    style G fill:#FFC107,color:black
    style I fill:#2196F3,color:white
    style R fill:#9C27B0,color:white
```

---

## 📁 Struktur File dan Hubungannya

```
📁 sitria/
├── 📁 scripts/
│   └── 📄 sinta_scraper.py          ← Script untuk scraping
│
├── 📁 src/
│   ├── 📁 data/
│   │   ├── 📄 lecturers.json        ← INPUT: Daftar dosen + SINTA ID
│   │   └── 📄 sinta_data.json       ← OUTPUT: Hasil scraping
│   │
│   ├── 📁 components/
│   │   └── 📄 ProdiSelector.vue     ← UI untuk memilih prodi
│   │
│   ├── 📁 services/
│   │   └── 📄 serpApi.js            ← Service untuk Google Scholar API
│   │
│   └── 📄 App.vue                   ← Main Vue component
│
└── 📄 server.js                     ← Backend server
```

---

## 📊 Alur Data Lengkap (Sequence Diagram)

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant Script as 🐍 sinta_scraper.py
    participant LecturersJSON as 📄 lecturers.json
    participant SINTA as 🌐 sinta.kemdiktisaintek.go.id
    participant OutputJSON as 📄 sinta_data.json
    participant App as 🖥️ Vue App

    User->>Script: python sinta_scraper.py
    Script->>LecturersJSON: load_lecturers()
    LecturersJSON-->>Script: Daftar dosen dengan sintaId
    
    loop Untuk setiap dosen dengan sintaId
        Script->>SINTA: GET /authors/profile/{sintaId}
        Note over Script,SINTA: No login required!<br/>Public profile access
        SINTA-->>Script: HTML Page
        Script->>Script: Parse dengan BeautifulSoup
        
        Script->>SINTA: GET /?view=scopus
        SINTA-->>Script: Scopus publications
        
        Script->>SINTA: GET /?view=garuda
        SINTA-->>Script: SINTA/Garuda publications
        
        Script->>SINTA: GET /?view=researches
        SINTA-->>Script: Research data
        
        Script->>SINTA: GET /?view=services
        SINTA-->>Script: Service/Pengabdian data
        
        Script->>SINTA: GET /?view=books
        SINTA-->>Script: Books data
        
        Script->>SINTA: GET /?view=iprs
        SINTA-->>Script: IPR/HKI data
        
        Script->>Script: sleep(2) - rate limiting
    end
    
    Script->>OutputJSON: json.dump(all_data)
    OutputJSON-->>App: Displayed in Vue app
    App-->>User: Dashboard dengan data SINTA
```

---

## 🔍 Dosen yang Akan Di-Scrape

### ✅ Prodi Sistem Informasi (15 dosen dengan SINTA ID)

| No | Nama | SINTA ID | Status |
|----|------|----------|--------|
| 1 | Yuyun Tri Wiranti | 5978281 | ✅ Akan di-scrape |
| 2 | Aidil Saputra Kirsan | 6760340 | ✅ Akan di-scrape |
| 3 | Arif Wicaksono Septyanto | 6741019 | ✅ Akan di-scrape |
| 4 | Henokh Lugo Hariyanto | 6807418 | ✅ Akan di-scrape |
| 5 | Lovinta Happy Atrinawati | 5977894 | ✅ Akan di-scrape |
| 6 | Vika Fitratunnany Insanittaqwa | 6784235 | ✅ Akan di-scrape |
| 7 | Hendy Indrawan Sunardi | 6784468 | ✅ Akan di-scrape |
| 8 | Dwi Nur Amalia | 6761367 | ✅ Akan di-scrape |
| 9 | Dwi Arief Prambudi | 6784358 | ✅ Akan di-scrape |
| 10 | I Putu Deny Arthawan S.P. | 6701825 | ✅ Akan di-scrape |
| 11 | M. Ihsan Alfani Putera | 6681873 | ✅ Akan di-scrape |
| 12 | Sri Rahayu Natasia | 5983406 | ✅ Akan di-scrape |
| 13 | Nursanti Novi Arisa | 6757976 | ✅ Akan di-scrape |
| 14 | Rosa Eliviani | 6876629 | ✅ Akan di-scrape |
| 15 | M. Gilvy Langgawan Putra | 6201079 | ✅ Akan di-scrape |

### ⚠️ Prodi Bisnis Digital (0 dosen dengan SINTA ID)

| No | Nama | Status |
|----|------|--------|
| 1 | Agung Prabowo | ❌ Skip - tidak ada SINTA ID |
| 2 | Bayu Nur Abdallah | ❌ Skip |
| 3 | Deli Yansyah | ❌ Skip |
| 4 | Eka Krisna Santoso | ❌ Skip |
| 5 | Khairunnisa Rahmah | ❌ Skip |
| 6 | Muhammad Ikhsan Alif S | ❌ Skip |
| 7 | Prasis Damai Nursyam H. | ❌ Skip |
| 8 | Luh Made Wisnu S. | ❌ Skip |

---

## 📝 Cara Menambah Dosen Baru

Edit file `src/data/lecturers.json`:

```json
{
    "name": "Nama Dosen Baru",
    "scholarId": "GOOGLE_SCHOLAR_ID",
    "scholarUrl": "https://scholar.google.com/citations?user=...",
    "sintaId": "SINTA_ID_DISINI",  // ← Wajib ada untuk SINTA scraping
    "sintaUrl": "https://sinta.kemdiktisaintek.go.id/authors/profile/SINTA_ID"
}
```

---

## 🔧 Cara Menjalankan Scraper

```bash
cd scripts
python sinta_scraper.py
```

**Output:** `src/data/sinta_data.json`

---

## ⚡ Data yang Diambil per Dosen

```json
{
  "name": "Nama Dosen",
  "sintaId": "1234567",
  "prodi": "Sistem Informasi",
  "stats": {
    "articles": 40,
    "citations": 473,
    "hIndex": 8,
    "scopusArticles": 6,
    "googleArticles": 40
  },
  "documents": {
    "scopus": { "q1": 0, "q2": 1, "q3": 0, "q4": 3, "total": 6 },
    "sinta": { "s1": 0, "s2": 0, "s3": 0, "s4": 5, "total": 8 }
  },
  "research": [...],
  "services": [...],
  "books": [...],
  "ipr": { "hakCipta": 0, "paten": 0 }
}
```

---

## ⚠️ Catatan Penting

- **Rate Limiting**: 2 detik delay antar request
- **Timeout**: 30 detik per request
- **Akses Publik**: Tidak memerlukan login SINTA
