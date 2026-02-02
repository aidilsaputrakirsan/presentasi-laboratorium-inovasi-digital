# Expertise Finder (Sistem Matchmaking)

Fitur **Cari Pakar** memungkinkan mahasiswa atau peneliti lain untuk menemukan dosen pembimbing/mitra yang paling relevan dengan topik penelitian mereka menggunakan teknologi **TF-IDF Keyword Matching**.

---

## 🎯 Cara Kerja

Sistem ini tidak menggunakan pencarian database biasa (seperti SQL `LIKE %query%`), melainkan menggunakan pendekatan **Information Retrieval** sederhana:

1. **Profiling (Backend - Python)**:
   - Script `build_expertise_data.py` mengumpulkan semua judul penelitian & pengabdian setiap dosen.
   - Melakukan *text cleaning* (hapus kata sambung, lokasi umum, dll).
   - Menghitung bobot kata kunci menggunakan algoritma **TF-IDF** (Term Frequency - Inverse Document Frequency).
   - Menghasilkan "Profile DNA" untuk setiap dosen (misal: `AI: 0.8`, `IoT: 0.5`, `Sampah: 0.3`).

2. **Matching (Frontend - Vue)**:
   - Saat user mengetik ide (misal: *"Aplikasi deteksi sampah dengan AI"*), browser memecah kalimat menjadi token kata kunci (*Aplikasi, deteksi, sampah, AI*).
   - Sistem mencocokkan token tersebut dengan "Profile DNA" dosen.
   - **Skor Relevansi** dihitung berdasarkan penjumlahan bobot kata kunci yang cocok.

$$Score = \sum (KeywordWeight_{dosen} \times MatchCount)$$

---

## 🚀 Cara Update Data Expertise

Setiap kali ada penambahan data dosen atau scraping baru, Anda perlu memperbarui index pencarian.

Jalankan perintah ini di terminal:

```bash
python scripts/build_expertise_data.py
```

Output: `src/data/expertise_data.json`

---

## 📊 Struktur Data JSON

File `expertise_data.json` berisi list profil dosen yang sudah dioptimasi untuk pencarian cepat di browser (tanpa database server).

```json
{
  "generated_at": "YYYY-MM-DD",
  "profiles": [
    {
      "id": "12345",
      "name": "Dr. Dosen A",
      "keywords": {
        "kecerdasan": 0.453,
        "buatan": 0.453,
        "algoritma": 0.312
      }
    }
  ]
}
```

## 🛠️ Tech Stack

- **Backend Logic**: Python (`scikit-learn` TfidfVectorizer)
- **Frontend Logic**: Vue.js (Client-side matching)
- **Keunggulan**: Sangat cepat (instant search), tidak membebani server, deployable di GitHub Pages.
