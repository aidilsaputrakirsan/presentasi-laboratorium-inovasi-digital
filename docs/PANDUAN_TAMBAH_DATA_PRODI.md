# Panduan Menambahkan Data Prodi Baru

## Alur Kerja (Overview)

```
                    MANUAL                              OTOMATIS (Python Script)
              ┌──────────────────┐    ┌──────────────────────────────────────────────────┐
              │                  │    │                                                  │
              │  1. Buat file    │    │  2. Scrape    3. Expertise    4. Clustering       │
              │  lecturers.json  │───>│  sinta_data   expertise_data  clusters_data       │
              │  (isi manual)    │    │  .json        .json           .json               │
              │                  │    │                                                  │
              └──────────────────┘    └──────────────────────────────────────────────────┘
                                                          │
                                                          v
                                              5. Update index.js
                                              6. npm run build
```

**Yang perlu kamu buat manual hanya `lecturers.json`** (daftar dosen + SINTA ID).
3 file lainnya di-generate otomatis oleh Python script.

---

## Langkah-Langkah Detail

### Langkah 1: Buat `lecturers.json` (MANUAL)

Buat file `src/data/prodi/{slug}/lecturers.json` dengan format:

```json
{
  "name": "Teknik Elektro",
  "code": "TE",
  "jurusan": "Teknik Elektro, Informatika, dan Bisnis",
  "lecturers": [
    {
      "name": "Nama Dosen",
      "sintaId": "1234567",
      "sintaUrl": "https://sinta.kemdiktisaintek.go.id/authors/profile/1234567"
    },
    {
      "name": "Nama Dosen 2",
      "sintaId": "7654321",
      "sintaUrl": "https://sinta.kemdiktisaintek.go.id/authors/profile/7654321"
    }
  ]
}
```

**Yang wajib diisi per dosen:**
- `name` - Nama dosen
- `sintaId` - ID SINTA (angka, bisa dilihat di URL profil SINTA)

**Opsional:**
- `sintaUrl` - Link ke profil SINTA (untuk referensi saja)
- `scholarId` - Google Scholar ID (tidak dipakai scraper, untuk referensi saja)
- `scholarUrl` - Link ke Google Scholar (untuk referensi saja)

**Cara cari SINTA ID:**
1. Buka https://sinta.kemdiktisaintek.go.id
2. Cari nama dosen
3. Klik profil dosen
4. Lihat URL: `https://sinta.kemdiktisaintek.go.id/authors/profile/XXXXXXX`
5. Angka `XXXXXXX` di URL itu adalah SINTA ID

### Langkah 2: Jalankan Scraper (OTOMATIS)

```bash
# Install dependencies (sekali saja)
pip install -r scripts/requirements.txt

# Scrape data dari SINTA untuk 1 prodi
python scripts/sinta_scraper.py teknik-elektro
```

Script ini akan:
- Membaca `src/data/prodi/teknik-elektro/lecturers.json`
- Scrape semua data dari website SINTA untuk setiap dosen
- Menyimpan hasilnya ke `src/data/prodi/teknik-elektro/sinta_data.json`

**Catatan:**
- Butuh koneksi internet
- Waktu tergantung jumlah dosen (~3-5 menit per dosen)
- Jika ingin scrape SEMUA prodi sekaligus: `python scripts/sinta_scraper.py` (tanpa argument)
- Jika ingin re-scrape prodi yang sudah ada, jalankan command yang sama - file lama akan di-overwrite

### Langkah 3: Generate Analysis Data (OTOMATIS)

```bash
# Generate expertise keywords (per prodi)
python scripts/build_expertise_data.py teknik-elektro

# Generate research clusters (per prodi)
python scripts/research_clustering.py teknik-elektro

# Generate research roadmap (gabungan semua prodi)
python scripts/research_roadmap.py
```

Atau untuk generate semua prodi sekaligus:
```bash
python scripts/build_expertise_data.py
python scripts/research_clustering.py
python scripts/research_roadmap.py
```

### Langkah 4: Update `src/data/prodi/index.js`

Ada 3 hal yang perlu diubah:

**A. Tambah import di bagian atas:**
```javascript
import teLecturers from './teknik-elektro/lecturers.json'
import teSintaData from './teknik-elektro/sinta_data.json'
import teExpertiseData from './teknik-elektro/expertise_data.json'
import teClustersData from './teknik-elektro/clusters_data.json'
```
*Gunakan prefix singkatan: `te` untuk Teknik Elektro, `if` untuk Informatika, dst.*

**B. Ganti placeholder di `prodiRegistry`:**
```javascript
// SEBELUM:
'teknik-elektro': { config: null },

// SESUDAH:
'teknik-elektro': {
  config: teLecturers,
  sintaData: teSintaData,
  expertiseData: teExpertiseData,
  clustersData: teClustersData,
},
```

**C. Set `hasData: true` di `prodiList`:**
```javascript
// SEBELUM:
{ slug: 'teknik-elektro', name: 'Teknik Elektro', code: 'TE', jurusan: '...', hasData: false },

// SESUDAH:
{ slug: 'teknik-elektro', name: 'Teknik Elektro', code: 'TE', jurusan: '...', hasData: true },
```

### Langkah 5: Build & Verifikasi

```bash
npm run build
npm run dev
```

---

## FAQ

### Apakah scraping akan re-scrape semua prodi?

**Tidak.** Setiap command bisa ditarget ke 1 prodi:
```bash
python scripts/sinta_scraper.py teknik-elektro     # Hanya TE
python scripts/build_expertise_data.py teknik-elektro
python scripts/research_clustering.py teknik-elektro
```

Jika tanpa argument, baru semua prodi yang punya data diproses.

### Bagaimana kalau mau menambah dosen ke prodi yang sudah ada?

1. Edit `lecturers.json` prodi tersebut - tambah dosen baru
2. Jalankan ulang 3 script untuk prodi itu:
   ```bash
   python scripts/sinta_scraper.py sistem-informasi
   python scripts/build_expertise_data.py sistem-informasi
   python scripts/research_clustering.py sistem-informasi
   python scripts/research_roadmap.py
   ```
3. `npm run build`

**Data lama akan di-overwrite** dengan data fresh dari SINTA.

### Bagaimana kalau mau update data saja tanpa tambah dosen?

Jalankan ulang scraper untuk prodi tersebut:
```bash
python scripts/sinta_scraper.py bisnis-digital
python scripts/build_expertise_data.py bisnis-digital
python scripts/research_clustering.py bisnis-digital
python scripts/research_roadmap.py
```

### Apa bedanya 4 script Python?

| Script | Input | Output | Fungsi |
|--------|-------|--------|--------|
| `sinta_scraper.py` | lecturers.json | sinta_data.json | Scrape data dari website SINTA |
| `build_expertise_data.py` | sinta_data.json | expertise_data.json | Extract keyword keahlian (TF-IDF) |
| `research_clustering.py` | sinta_data.json | clusters_data.json | Kelompokkan riset (K-Means) |
| `research_roadmap.py` | semua sinta_data.json | shared/roadmap_data.json | Analisis tren riset lintas prodi |

Urutan wajib: `sinta_scraper` dulu, baru 3 script analysis.

---

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

## Prompt untuk Claude Code

Gunakan prompt berikut untuk meminta Claude Code menambahkan data prodi baru:

```
Saya ingin menambahkan data untuk prodi [NAMA PRODI] (kode: [KODE]).
Berikut daftar dosen beserta SINTA ID-nya:

1. Nama Dosen 1 - SINTA ID: XXXXX
2. Nama Dosen 2 - SINTA ID: XXXXX
...

Tolong:
1. Buat file lecturers.json di src/data/prodi/[slug]/
2. Jalankan sinta_scraper.py untuk prodi ini
3. Jalankan build_expertise_data.py untuk prodi ini
4. Jalankan research_clustering.py untuk prodi ini
5. Jalankan research_roadmap.py
6. Update src/data/prodi/index.js (tambah import, registry, set hasData: true)
7. Build dan verifikasi

Lihat panduan di docs/PANDUAN_TAMBAH_DATA_PRODI.md
```
