# Research Roadmap: Metodologi & Flow

Dokumentasi lengkap tentang fitur **Roadmap Riset** yang menggunakan **TF-IDF + Sankey Diagram** untuk memvisualisasikan evolusi topik penelitian dari tahun ke tahun.

---

## 🎯 Tujuan Fitur

1. **Visualisasi Evolusi Topik** - Melihat bagaimana tren penelitian berubah dari 2018 ke 2025.
2. **Kontinuitas Riset** - Melacak topik mana yang konsisten diteliti bertahun-tahun (sustainable).
3. **Emerging Topics** - Mendeteksi topik baru yang mulai populer di tahun-tahun terakhir.

---

## 📊 Flowchart Proses

```mermaid
flowchart TD
    A[sinta_data.json] --> B[Group by Year]
    B --> C[Stopwords Filtering]
    C --> D[TF-IDF per Year]
    D --> E[Extract Dominant Keywords]
    E --> F[Remove Isolated Nodes]
    F --> G[Link Keywords Time-Series]
    G --> H[roadmap_data.json]
    H --> I[ResearchRoadmap.vue (Sankey)]
```

---

## 🔧 Penjelasan Teknis

### Mengapa Raw Data (`sinta_data.json`) vs Clustered Data?

Fitur ini sengaja mengambil dari data mentah `sinta_data.json`, bukan hasil clustering, karena:
1. **Analisis Temporal**: Roadmap fokus pada perubahan tren *per tahun*. Data clustering bersifat *agregat* (gabungan semua tahun) sehingga nuansa perubahan waktu bisa hilang jika dipakai.
2. **Micro-Trends**: Roadmap bisa mendeteksi topik spesifik yang "meledak" hanya di tahun tertentu (misal: "Covid" di 2021) yang mungkin tenggelam jika menggunakan global clustering.

### Step 1: Preprocessing & Stopwords

Data dibersihkan secara agresif untuk menghilangkan lokasi umum agar topik riset lebih menonjol.

**Stopwords Tambahan:**
- Lokasi: *balikpapan, kota, kalimantan, timur, selatan, utara, barat, pusat, kabupaten, provinsi, daerah, wilayah, indonesia*
- Kata Umum: *aplikasi, teknologi, data, analisis, sistem, metode, implementasi*

### Step 2: TF-IDF per Year

TF-IDF dilakukan terpisah untuk setiap tahun (2018, 2019, dst) untuk menemukan kata kunci yang **paling penting di tahun tersebut**.

### Step 3: Filtering Isolated Nodes

Script secara otomatis membuang topik yang:
- Muncul hanya sekali (single year)
- Tidak memiliki hubungan/link ke tahun sebelumnya ataupun sesudahnya
- Kecuali topik tersebut adalah Top 2 Keyword paling dominan di tahun itu.

Tujuannya agar visualisasi Roadmap terlihat bersih, mengalir (flowing), dan fokus pada **kontinuitas riset**.

---

## 📈 Cara Membaca Visualisasi (Sankey Diagram)

- **Node (Kotak Warna)**: Topik/Keyword Riset.
  - Tinggi kotak = Volume penelitian.
- **Link (Aliran)**: Kontinuitas Topik.
  - Garis yang menghubungkan Tahun A ke Tahun B menunjukkan bahwa topik tersebut masih terus diteliti.

---

## 🔄 Cara Re-run Roadmap

Update data roadmap setelah scraping baru:

```bash
python scripts/research_roadmap.py
```

Output: `src/data/roadmap_data.json`
