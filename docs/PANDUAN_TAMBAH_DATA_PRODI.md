# Panduan Menambahkan Data Prodi Baru

## Struktur Data Per Prodi

Setiap prodi yang memiliki data harus punya 4 file JSON di dalam foldernya:

```
src/data/prodi/{nama-prodi}/
├── lecturers.json        ← Daftar dosen (master data)
├── sinta_data.json       ← Metrik SINTA lengkap per dosen
├── expertise_data.json   ← Keywords/keahlian per dosen (TF-IDF)
└── clusters_data.json    ← Pengelompokan riset (K-Means)
```

## Daftar Prodi (10 prodi)

### Jurusan Teknik Elektro, Informatika, dan Bisnis
| Slug | Nama | Kode | Status |
|------|------|------|--------|
| `sistem-informasi` | Sistem Informasi | SI | Ada data |
| `bisnis-digital` | Bisnis Digital | BD | Ada data |
| `teknik-elektro` | Teknik Elektro | TE | Belum |
| `informatika` | Informatika | IF | Belum |
| `teknik-biomedis` | Teknik Biomedis | TB | Belum |
| `magister-manajemen-teknologi` | Magister Manajemen Teknologi | MMT | Belum |

### Jurusan Sains dan Analitika Data
| Slug | Nama | Kode | Status |
|------|------|------|--------|
| `fisika` | Fisika | FIS | Belum |
| `matematika` | Matematika | MAT | Belum |
| `statistika` | Statistika | STAT | Belum |
| `ilmu-aktuaria` | Ilmu Aktuaria | AKT | Belum |

---

## Langkah Menambahkan Data Prodi

### Langkah 1: Siapkan 4 File JSON

#### 1.1 `lecturers.json`
```json
{
  "name": "Nama Prodi",
  "code": "KODE",
  "jurusan": "Nama Jurusan",
  "lecturers": [
    {
      "name": "Nama Dosen",
      "scholarId": "Google Scholar ID",
      "scholarUrl": "https://scholar.google.com/citations?user=XXXXX",
      "sintaId": "SINTA ID (angka)",
      "sintaUrl": "https://sinta.kemdiktisaintek.go.id/authors/profile/XXXXX"
    }
  ]
}
```

#### 1.2 `sinta_data.json`
File ini di-generate oleh script `scripts/sinta_scraper.py`. Formatnya:
```json
{
  "metadata": {
    "generatedAt": "2026-02-05T15:44:12.150205",
    "source": "SINTA 3",
    "version": "2.3",
    "description": "Data SINTA dengan detail pendanaan untuk akreditasi"
  },
  "lecturers": [
    {
      "name": "Nama Dosen",
      "sintaId": "SINTA ID",
      "prodi": "Nama Prodi",
      "scrapedAt": "timestamp",
      "stats": {
        "articles": 0,
        "citations": 0,
        "hIndex": 0,
        "i10Index": 0,
        "gIndex": 0,
        "scopus": 0,
        "wos": 0,
        "garuda": 0,
        "google": 0,
        "sinta": 0,
        "rama": 0,
        "research": 0,
        "service": 0,
        "ipr": 0,
        "book": 0,
        "scopusArticles": 0,
        "scopusCitations": 0,
        "scopusHIndex": 0,
        "googleArticles": 0,
        "googleCitations": 0,
        "googleHIndex": 0,
        "wosArticles": 0,
        "wosCitations": 0,
        "wosHIndex": 0
      },
      "documents": {
        "scopus": {
          "q1": 0, "q2": 0, "q3": 0, "q4": 0, "noq": 0, "total": 0,
          "scopusList": [
            { "title": "Judul Paper", "q": "Q1", "year": "2024" }
          ]
        },
        "sinta": {
          "s1": 0, "s2": 0, "s3": 0, "s4": 0, "s5": 0, "s6": 0,
          "unknown": 0, "total": 0,
          "sintaList": [
            { "title": "Judul Paper", "rank": "S1", "year": "2024" }
          ]
        },
        "google": {
          "googleList": [
            { "title": "Judul Paper", "year": "2024", "citations": 10 }
          ]
        }
      },
      "research": [
        { "title": "Judul Penelitian", "year": "2024", "source": "SINTA" }
      ],
      "services": [
        { "title": "Judul Pengabdian", "year": "2024", "source": "SINTA" }
      ],
      "funding": {
        "incomingFunds": 0,
        "completedProjects": 0,
        "ongoingProjects": 0
      }
    }
  ]
}
```

#### 1.3 `expertise_data.json`
File ini di-generate oleh script `scripts/build_expertise_data.py`. Formatnya:
```json
{
  "generated_at": "Auto-generated",
  "profiles": [
    {
      "id": "SINTA ID",
      "name": "Nama Dosen",
      "prodi": "Nama Prodi",
      "avatar": "",
      "sinta_score": 0,
      "title_count": 29,
      "keywords": {
        "keyword1": 0.214,
        "keyword2": 0.194,
        "keyword3": 0.169
      }
    }
  ]
}
```

#### 1.4 `clusters_data.json`
File ini di-generate oleh script `scripts/research_clustering.py`. Formatnya:
```json
{
  "metadata": {
    "generatedAt": "2026-02-02T19:59:50.015712",
    "algorithm": "TF-IDF + K-Means",
    "totalItems": 149,
    "totalClusters": 11
  },
  "clusters": {
    "0": {
      "id": 0,
      "name": "Nama Cluster",
      "keywords": ["keyword1", "keyword2", "keyword3"],
      "items": [
        {
          "title": "Judul Penelitian",
          "author": "Nama Dosen",
          "prodi": "Nama Prodi",
          "type": "Penelitian",
          "year": "2025"
        }
      ]
    }
  }
}
```

### Langkah 2: Taruh File di Folder Prodi

Copy 4 file JSON ke folder prodi yang sudah tersedia:
```
src/data/prodi/{slug-prodi}/
```

### Langkah 3: Update `src/data/prodi/index.js`

Ada 3 hal yang perlu diubah:

**A. Tambah import di bagian atas:**
```javascript
import xxLecturers from './{slug-prodi}/lecturers.json'
import xxSintaData from './{slug-prodi}/sinta_data.json'
import xxExpertiseData from './{slug-prodi}/expertise_data.json'
import xxClustersData from './{slug-prodi}/clusters_data.json'
```
*Ganti `xx` dengan prefix singkatan (misal: `te` untuk Teknik Elektro)*

**B. Tambah entry di `prodiRegistry`:**
```javascript
'{slug-prodi}': {
  config: xxLecturers,
  sintaData: xxSintaData,
  expertiseData: xxExpertiseData,
  clustersData: xxClustersData,
},
```
*Hapus/ganti baris placeholder `'{slug-prodi}': { config: null },`*

**C. Set `hasData: true` di `prodiList`:**
```javascript
{ slug: '{slug-prodi}', name: 'Nama Prodi', code: 'XX', jurusan: '...', hasData: true },
```

### Langkah 4: Verifikasi

```bash
npm run build
```
Pastikan build sukses tanpa error.

---

## Contoh: Menambahkan Data Teknik Elektro

### 1. Siapkan file
```
src/data/prodi/teknik-elektro/
├── lecturers.json
├── sinta_data.json
├── expertise_data.json
└── clusters_data.json
```

### 2. Update `index.js`

```javascript
// Tambah import baru
import teLecturers from './teknik-elektro/lecturers.json'
import teSintaData from './teknik-elektro/sinta_data.json'
import teExpertiseData from './teknik-elektro/expertise_data.json'
import teClustersData from './teknik-elektro/clusters_data.json'

// Di prodiRegistry, GANTI baris placeholder:
// SEBELUM:
'teknik-elektro': { config: null },

// SESUDAH:
'teknik-elektro': {
  config: teLecturers,
  sintaData: teSintaData,
  expertiseData: teExpertiseData,
  clustersData: teClustersData,
},

// Di prodiList, UBAH hasData:
// SEBELUM:
{ slug: 'teknik-elektro', name: 'Teknik Elektro', code: 'TE', jurusan: '...', hasData: false },

// SESUDAH:
{ slug: 'teknik-elektro', name: 'Teknik Elektro', code: 'TE', jurusan: '...', hasData: true },
```

### 3. Build & test
```bash
npm run build
npm run dev
```

---

## Prompt untuk Claude Code

Gunakan prompt berikut untuk meminta Claude Code menambahkan data prodi baru:

```
Saya ingin menambahkan data untuk prodi [NAMA PRODI] (kode: [KODE]).
Berikut daftar dosen beserta SINTA ID-nya:

1. Nama Dosen 1 - SINTA ID: XXXXX - Scholar ID: XXXXX
2. Nama Dosen 2 - SINTA ID: XXXXX - Scholar ID: XXXXX
...

Tolong:
1. Buat file lecturers.json di src/data/prodi/[slug]/
2. Jalankan sinta_scraper.py untuk generate sinta_data.json
3. Jalankan build_expertise_data.py untuk generate expertise_data.json
4. Jalankan research_clustering.py untuk generate clusters_data.json
5. Update src/data/prodi/index.js (tambah import, registry, set hasData: true)
6. Build dan verifikasi

Lihat panduan lengkap di docs/PANDUAN_TAMBAH_DATA_PRODI.md
```

---

## Catatan Penting

- **Nama prodi di JSON harus konsisten** - field `prodi` di `sinta_data.json`, `expertise_data.json`, dan `clusters_data.json` harus sama persis dengan field `name` di `lecturers.json`
- **SINTA ID adalah primary key** - digunakan untuk menghubungkan data antar file
- **Script Python** (`scripts/`) menghasilkan `sinta_data.json`, `expertise_data.json`, dan `clusters_data.json` secara otomatis
- **`roadmap_data.json`** ada di `src/data/shared/` karena bersifat lintas prodi
- **Build size** akan bertambah ~500KB per prodi (tergantung jumlah dosen)
