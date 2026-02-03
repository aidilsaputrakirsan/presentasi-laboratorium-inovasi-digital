# Fitur Dana & Hibah

## Deskripsi
Fitur **Dana & Hibah** menampilkan data pendanaan penelitian dan pengabdian masyarakat yang diambil dari SINTA. Data ini berguna untuk keperluan pelaporan akreditasi (LKPS/LED) sesuai standar BAN-PT.

## Data yang Ditampilkan

### 1. Summary Cards
| Metrik | Deskripsi |
|--------|-----------|
| Penelitian | Jumlah total kegiatan penelitian |
| Pengabdian | Jumlah total kegiatan pengabdian |
| Dana Penelitian | Total dana penelitian (Rupiah) |
| Dana Pengabdian | Total dana pengabdian (Rupiah) |
| Dosen | Jumlah dosen yang terdata |
| Rata-rata/Dosen | Total dana dibagi jumlah dosen |

### 2. Grafik Pendanaan per Tahun
- Menampilkan tren pendanaan penelitian dan pengabdian per tahun
- Berguna untuk melihat pertumbuhan/penurunan aktivitas

### 3. Grafik Sumber Pendanaan
- **Internal** - Dana dari institusi (ITK)
- **Eksternal (BIMA)** - Dana dari Kemdiktisaintek
- **Lainnya** - Sumber dana lain

### 4. Tabel Kinerja per Tahun (AKREDITASI)

Tabel ini menyediakan **breakdown DTPS vs Eksternal** untuk memudahkan pelaporan LKPS:

#### Kolom Tabel
| Kolom | Keterangan |
|-------|------------|
| Tahun | Tahun pelaksanaan kegiatan |
| **Ketua (Leader)** | |
| - Total | Jumlah ketua unik (semua) |
| - DTPS | Jumlah ketua yang masuk DTPS |
| - Eksternal | Jumlah ketua dari luar prodi/kampus |
| **Terlibat (Ketua+Anggota)** | |
| - Total | Jumlah dosen terlibat (semua) |
| - DTPS | Jumlah terlibat yang masuk DTPS |
| - Eksternal | Jumlah terlibat dari luar prodi/kampus |
| Judul Penelitian | Jumlah judul penelitian |
| Judul Pengabdian | Jumlah judul pengabdian |
| **Rasio LKPS** | (Judul Penelitian + Pengabdian) ÷ Ketua DTPS |

## Konsep DTPS (Dosen Tetap Program Studi)

### Apa itu DTPS?
**DTPS** adalah singkatan dari **Dosen Tetap Program Studi**, yaitu dosen yang:
- **Homebase**-nya di program studi yang sedang diakreditasi
- Terdaftar sebagai dosen tetap di prodi tersebut
- Data DTPS diambil dari `src/data/lecturers.json` sebagai master data

### Mengapa DTPS Penting?
Untuk keperluan **akreditasi BAN-PT**, yang dihitung dalam LKPS adalah:
- Hanya penelitian/pengabdian dengan **ketua dari DTPS**
- Anggota eksternal boleh ada, tetapi **tidak mempengaruhi** perhitungan rasio
- Jika ketua bukan DTPS, penelitian tersebut **tidak masuk hitungan** LKPS prodi

### Klasifikasi Dosen

| Kategori | Deskripsi | Masuk LKPS? |
|----------|-----------|-------------|
| **DTPS** | Dosen yang homebase-nya di prodi yang diakreditasi | Ya |
| **Eksternal** | Dosen dari prodi lain di institusi yang sama | Tidak |
| **Eksternal** | Dosen dari kampus lain (kolaborator) | Tidak |

### Contoh Kasus

**Kasus 1: Ketua DTPS**
```
Judul: "Sistem Informasi Akademik"
Ketua: Yuyun Tri Wiranti (DTPS Sistem Informasi)
Anggota: Dosen A (Teknik Informatika), Dosen B (UGM)
→ Masuk hitungan LKPS Sistem Informasi ✓
```

**Kasus 2: Ketua Non-DTPS**
```
Judul: "Machine Learning untuk Prediksi"
Ketua: Dosen C (Teknik Informatika)
Anggota: Yuyun Tri Wiranti (DTPS Sistem Informasi)
→ TIDAK masuk hitungan LKPS Sistem Informasi ✗
  (karena ketuanya bukan DTPS prodi SI)
```

## Cara Perhitungan

### Perhitungan DTPS vs Eksternal

```javascript
// Normalisasi nama (hapus gelar)
normalizeName(name) {
  return name.replace(gelar).trim().toLowerCase()
}

// Cek apakah nama termasuk DTPS
isDTPS(normalizedName, dtpsSet) {
  // Exact match atau partial match
  return dtpsSet.has(normalizedName) || ...partial match logic
}

// Per tahun, klasifikasi ketua dan anggota
for each item in research/services:
  if (isDTPS(item.leader)):
    leadersDTPS.add(item.leader)
  else:
    leadersExternal.add(item.leader)
```

### Perhitungan Rasio LKPS

```
Rasio LKPS = (Jumlah Penelitian + Jumlah Pengabdian) / Jumlah Ketua DTPS
```

**Penting:** Rasio LKPS hanya menghitung ketua yang merupakan DTPS!

### Rata-rata 3 Tahun
```
avg3Year = (nilai_TS2 + nilai_TS1 + nilai_TS) / 3
```
Dimana TS = Tahun Sekarang, TS-1 = Tahun lalu, TS-2 = 2 tahun lalu

## Master Data DTPS

Data DTPS disimpan di `src/data/lecturers.json`:

```json
{
  "studyPrograms": {
    "Sistem Informasi": {
      "name": "Sistem Informasi",
      "code": "SI",
      "lecturers": [
        {
          "name": "Yuyun Tri Wiranti",
          "sintaId": "5978281",
          ...
        },
        ...
      ]
    },
    "Bisnis Digital": {
      "name": "Bisnis Digital",
      "code": "BD",
      "lecturers": [...]
    }
  }
}
```

**Catatan:** Ketika filter prodi dipilih, hanya DTPS dari prodi tersebut yang digunakan untuk perhitungan.

## Struktur Data JSON

Data disimpan di `src/data/sinta_data.json` dengan struktur:

```json
{
  "metadata": {
    "generatedAt": "2026-02-03T...",
    "source": "SINTA 3",
    "version": "2.3"
  },
  "lecturers": [
    {
      "name": "Nama Dosen",
      "prodi": "Sistem Informasi",
      "research": [
        {
          "title": "Judul Penelitian",
          "leader": "Nama Ketua",
          "members": ["Anggota 1", "Anggota 2"],
          "grantType": "HIBAH INTERNAL ( RKDN )",
          "grantCategory": "RKDN",
          "year": "2024",
          "fundingAmount": 25000000,
          "fundingFormatted": "Rp. 25.000.000",
          "status": "Approved",
          "source": "INTERNAL SOURCE"
        }
      ],
      "services": [...],
      "fundingSummary": {...}
    }
  ],
  "prodiSummary": {...}
}
```

## Tabel Rincian Jenis Hibah
- **Semua kategori hibah** ditampilkan dalam tabel (tidak terbatas 10)
- Kolom: Jenis Hibah, Jumlah, Penelitian, Pengabdian, Total Dana, Rata-rata
- Diurutkan berdasarkan total pendanaan tertinggi
- Contoh: HIBAH INTERNAL (RKDN), Penelitian Internal (RKS), PKM, dll

## Tabel Ringkasan per Prodi
Tampilan tabel menyesuaikan dengan filter yang dipilih:

**Mode "Semua Prodi":**
| Kolom | Keterangan |
|-------|------------|
| Prodi | Nama program studi |
| Dosen | Jumlah dosen |
| Penelitian | Jumlah kegiatan penelitian |
| Pengabdian | Jumlah kegiatan pengabdian |
| Dana Penelitian | Total dana penelitian prodi |
| Dana Pengabdian | Total dana pengabdian prodi |
| Total Dana | Dana penelitian + pengabdian |
| Rata-rata/Dosen | Total dana / jumlah dosen |

**Mode "Single Prodi" (misal: Sistem Informasi):**
| Indikator | Keterangan |
|-----------|------------|
| Jumlah Total | Total kegiatan dan dana prodi |
| Rata-rata per Dosen | Rasio per dosen untuk akreditasi |

## Daftar Detail Hibah
Menampilkan setiap kegiatan penelitian/pengabdian dengan detail:
- Judul kegiatan
- Ketua (Leader)
- Anggota tim (Members)
- Jenis hibah
- Tahun pelaksanaan
- Jumlah dana
- Status (Approved/Pending)
- Sumber dana

## Cara Update Data

Jalankan scraper untuk mengambil data terbaru dari SINTA:

```bash
python scripts/sinta_scraper.py
```

Scraper akan:
1. Mengambil data dari setiap dosen yang terdaftar
2. Parse detail penelitian & pengabdian (termasuk leader dan members)
3. Menghitung summary per dosen dan per prodi
4. Menyimpan ke `src/data/sinta_data.json`

**Data yang di-scrape sudah lengkap** dengan `leader` dan `members`, sehingga tidak perlu menjalankan ulang scraper untuk perubahan dashboard ini.

## Filter & Navigasi

- **Filter Prodi** - Pilih prodi tertentu atau "Semua Prodi"
- **Filter Tipe** - Semua / Penelitian / Pengabdian
- **Pagination** - 20 item per halaman

## Kegunaan untuk Akreditasi

Data ini dapat digunakan untuk mengisi:
- **LKPS Tabel 3.b.2** - Penelitian DTPS (gunakan Rasio LKPS dengan ketua DTPS)
- **LKPS Tabel 3.b.4** - Pengabdian DTPS (gunakan Rasio LKPS dengan ketua DTPS)
- **LED** - Narasi capaian tridarma
- **Borang** - Data pendanaan dan produktivitas

### Indikator yang Didukung
| Indikator | Metrik Dashboard |
|-----------|-----------------|
| Jumlah judul penelitian/pengabdian | Kolom "Judul Penelitian/Pengabdian" |
| Rasio penelitian per DTPS per tahun | **Rasio LKPS** (kolom ungu) - hanya ketua DTPS |
| Rasio pengabdian per DTPS per tahun | **Rasio LKPS** (kolom ungu) - hanya ketua DTPS |
| Total dana penelitian per prodi | Tabel Ringkasan per Prodi |
| Sumber pendanaan (internal vs eksternal) | Grafik Sumber Pendanaan |
| Rata-rata 3 tahun terakhir | Footer tabel Kinerja per Tahun |
| Ketua DTPS vs Eksternal | Breakdown kolom Ketua |
| Partisipasi DTPS vs Eksternal | Breakdown kolom Terlibat |
