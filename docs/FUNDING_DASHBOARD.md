# Fitur Dana & Hibah

## Deskripsi
Fitur **Dana & Hibah** menampilkan data pendanaan penelitian dan pengabdian masyarakat yang diambil dari SINTA (Science and Technology Index). Data ini dapat digunakan untuk berbagai keperluan internal: evaluasi kinerja, pelaporan akreditasi, AMI (Audit Mutu Internal), dan perencanaan.

## Struktur Dashboard

Dashboard disusun dengan alur **dari umum ke khusus**:

```
1. Header + Overview    → Ringkasan total (big picture)
2. Filter Prodi         → Navigasi per program studi
3. Ringkasan per Prodi  → Perbandingan antar prodi
4. Kinerja Dosen        → Detail hibah per dosen
5. Grafik Visualisasi   → Tren dan distribusi
6. Rincian Jenis Hibah  → Per kategori skema
7. Daftar Detail        → Item per item
```

## Penjelasan Setiap Card

### 1. Header + Overview
Menampilkan total keseluruhan:
- **Penelitian** = jumlah kegiatan penelitian
- **Pengabdian** = jumlah kegiatan pengabdian masyarakat
- **Dana Penelitian** = total pendanaan penelitian (Rupiah)
- **Dana Pengabdian** = total pendanaan pengabdian (Rupiah)
- **Dosen** = jumlah dosen yang terdata
- **Rata-rata/Dosen** = total dana dibagi jumlah dosen

### 2. Filter Program Studi
Tombol untuk memfilter data berdasarkan program studi. Pilih "Semua Prodi" untuk melihat data gabungan.

### 3. Ringkasan per Program Studi
**Mode "Semua Prodi":**
Tabel perbandingan antar prodi dengan kolom:
- Nama prodi, jumlah dosen, penelitian, pengabdian, dana, rata-rata/dosen

**Mode "Single Prodi":**
Detail kinerja prodi terpilih dengan baris:
- Jumlah total dan rata-rata per dosen

### 4. Kinerja Dosen
Tabel detail kinerja hibah per dosen dengan filter tahun.

| Kolom | Keterangan |
|-------|------------|
| **Nama Dosen** | Dosen yang terdaftar di prodi |
| **Penelitian - Ketua** | Judul penelitian dimana dosen menjadi ketua |
| **Penelitian - Anggota** | Judul penelitian dimana dosen menjadi anggota* |
| **Pengabdian - Ketua** | Judul pengabdian dimana dosen menjadi ketua |
| **Pengabdian - Anggota** | Judul pengabdian dimana dosen menjadi anggota* |
| **Total Judul** | Ketua + Anggota (judul yang bisa diklaim prodi) |
| **Total Dana** | Akumulasi dana dari judul sebagai ketua |

*\*Kolom Anggota hanya menghitung judul dimana ketuanya dari **luar prodi** (kolaborasi eksternal)*

**Filter:** Dropdown untuk memilih tahun tertentu atau "Semua Tahun"

### 5. Grafik Visualisasi
- **Tren Pendanaan** = grafik batang per tahun (penelitian vs pengabdian)
- **Sumber Pendanaan** = pie chart (internal vs eksternal vs lainnya)

### 6. Rincian per Jenis Hibah
Tabel semua kategori hibah dengan:
- Nama skema, jumlah kegiatan, penelitian, pengabdian, total dana, rata-rata

### 7. Daftar Detail Kegiatan
List setiap kegiatan dengan filter (Semua/Penelitian/Pengabdian):
- Judul, ketua, anggota, jenis hibah, tahun, dana, status

## Perbedaan Perhitungan Antar Card

Dashboard ini memiliki **dua jenis perhitungan** yang berbeda:

### Card dengan "Judul Unik" (Overview, Ringkasan, Grafik, Rincian Hibah)
- Menghitung judul yang tercatat di SINTA **tanpa duplikasi**
- 1 judul dengan 3 dosen = **1 judul**
- Tidak menghitung partisipasi sebagai anggota di proyek luar prodi

### Card "Kinerja Dosen"
- Menghitung judul berdasarkan **peran dosen**
- Termasuk partisipasi sebagai **anggota di proyek luar prodi**
- Total bisa **lebih besar** dari card lainnya

**Contoh:**
- Overview menampilkan: 50 penelitian
- Kinerja Dosen menampilkan: 55 total judul (50 ketua + 5 anggota di proyek luar)

---

## Cara Perhitungan Kinerja Dosen

### Aturan Penghitungan Judul
```
Skenario 1: Dosen A (prodi SI) sebagai KETUA
→ Dihitung di kolom "Ketua" untuk dosen A

Skenario 2: Dosen A (prodi SI) sebagai ANGGOTA, Ketua dari prodi SI
→ TIDAK dihitung (sudah tercatat di ketua)

Skenario 3: Dosen A (prodi SI) sebagai ANGGOTA, Ketua dari LUAR prodi
→ Dihitung di kolom "Anggota" untuk dosen A
```

### Logika Penghitungan
- **Ketua dari prodi sama** = judul sudah tercatat sekali, tidak perlu duplikasi
- **Ketua dari luar prodi** = partisipasi dosen perlu dicatat karena ini adalah kontribusi kolaborasi eksternal

### Total Dana
```
Total Dana = Σ dana dari semua judul dimana dosen menjadi KETUA
```
Dana dari judul sebagai anggota tidak dihitung untuk menghindari duplikasi.

## Struktur Data

### Master DTPS (lecturers.json)
```json
{
  "studyPrograms": {
    "Sistem Informasi": {
      "lecturers": [
        { "name": "Nama Dosen", "sintaId": "12345" }
      ]
    }
  }
}
```

### Data SINTA (sinta_data.json)
```json
{
  "lecturers": [
    {
      "name": "Nama Dosen",
      "prodi": "Sistem Informasi",
      "research": [
        {
          "title": "Judul",
          "leader": "Ketua",
          "members": ["Anggota 1", "Anggota 2"],
          "grantType": "HIBAH INTERNAL",
          "year": "2024",
          "fundingAmount": 25000000,
          "status": "Approved",
          "source": "INTERNAL SOURCE"
        }
      ],
      "services": [...]
    }
  ]
}
```

## Cara Update Data

```bash
python scripts/sinta_scraper.py
```

Scraper akan mengambil data dari SINTA dan menyimpan ke `src/data/sinta_data.json`.

## Kegunaan Data

Data dapat digunakan untuk:
- **Evaluasi Kinerja** - melihat produktivitas per dosen/prodi
- **Pelaporan Akreditasi** - data untuk LKPS tabel 3.b.2 dan 3.b.4
- **AMI** - audit mutu internal
- **Perencanaan** - identifikasi tren dan target
- **Analisis Kolaborasi** - melihat kerjasama dengan pihak eksternal
