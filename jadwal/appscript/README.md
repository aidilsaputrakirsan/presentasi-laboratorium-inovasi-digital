# Sinkronisasi Jadwal Praktikum FSTI — Sheet Lab

Apps Script untuk spreadsheet **KELOMPOK GASAL 2026/2027**. Menambahkan menu
**Jadwal Lab** di Google Sheets yang mengisi kolom jadwal fix di sheet `FSTI`
berdasarkan isi seluruh sheet `Lab ...`, lengkap dengan dashboard.

## Pemasangan (sekali saja)

1. Upload file `.xlsx` ke Google Drive, buka dengan Google Sheets
   (File > Save as Google Sheets kalau masih format Excel).
2. **Extensions > Apps Script**.
3. Ganti isi `Code.gs` dengan file [`Code.gs`](Code.gs) di folder ini.
4. Klik **+ > HTML**, beri nama persis **`Dashboard`** (tanpa `.html`),
   isi dengan [`Dashboard.html`](Dashboard.html).
5. Simpan (Ctrl+S), lalu **refresh** tab spreadsheet.
6. Menu **Jadwal Lab** muncul di samping menu Help. Saat pertama kali diklik,
   Google minta izin — pilih akun, *Advanced* > *Go to ... (unsafe)* > *Allow*.
   Ini normal untuk script buatan sendiri.

## Isi menu

| Menu | Fungsi |
|---|---|
| Sinkronkan Jadwal Fix | Baca semua sheet Lab, tulis hasil ke sheet FSTI |
| Buka Dashboard | Dashboard interaktif (ringkasan, detail, bentrok) |
| Cek Bentrok Jadwal | Cari slot lab yang dipakai dua MK bersamaan |
| Hapus Kolom Hasil Sinkron | Kosongkan kolom hasil (baris data tetap aman) |
| Kunci Sekarang | Tutup sesi, password diminta lagi |

## Password menu

Semua item menu terkunci. Password diminta sekali, lalu menu tetap terbuka
selama **60 menit** (atur lewat `PW_MENIT` di `Code.gs`). Menu *Kunci Sekarang*
menutupnya lebih cepat.

Password tidak ditulis apa adanya di dalam kode, yang disimpan hanya sidik jari
SHA-256-nya di variabel `PW_HASH`.

### Mengganti password

Sengaja **tidak ada menu ganti password** di spreadsheet, supaya orang lain yang
kebetulan tahu passwordnya tidak bisa menggantinya dan mengunci Anda sendiri.
Penggantian hanya bisa dari editor Apps Script:

1. Buka fungsi `buatHashPassword()` di `Code.gs`.
2. Ganti isi `passwordBaru`, pilih fungsi itu di dropdown editor, klik **Run**.
3. Salin nilai `PW_HASH` yang muncul di **Execution log**.
4. Tempel ke variabel `PW_HASH` di bagian atas `Code.gs`, simpan.

Password lama langsung tidak berlaku. Kalau ada yang sedang terbuka sesinya,
jalankan menu *Kunci Sekarang* untuk memutusnya.

**Batas kemampuan proteksi ini — penting.** Kunci ini menghalangi orang
menjalankan menu, bukan menyembunyikan data. Siapa pun yang punya akses **Edit**
ke spreadsheet tetap bisa membuka Extensions > Apps Script, mengubah script,
atau membaca isi sheet secara langsung. Kalau tujuannya benar-benar membatasi
akses, atur juga hak berbagi filenya:

- beri orang lain akses **Viewer** saja, bukan Editor;
- atau lindungi sheet lewat **Data > Protect sheets and ranges**;
- kalau perlu, simpan file di Drive pribadi dan bagikan hanya hasil ekspornya.

Kalau lupa password: jalankan `buatHashPassword()` dengan password baru pilihan
Anda, lalu ganti `PW_HASH` seperti langkah di atas.

## Kolom yang ditulis di sheet FSTI

Script mencari kolom berdasarkan **judul di baris 1**, bukan posisi kolom. Kalau
belum ada, kolom dibuat di ujung kanan tabel. Jadi aman kalau nanti ada kolom
manual yang disisipkan di tengah.

| Judul kolom | Isi |
|---|---|
| `JADWAL FIX (SINKRON SHEET LAB)` | `Lab Komputer C \| Senin \| Sesi 1 (07.30-10.00) \| Minggu: 1-4, 6-8, 10, 12-16` (satu baris per slot kalau MK punya lebih dari satu slot) |
| `MINGGU PELAKSANAAN (FIX)` | Gabungan semua minggu, format ringkas `1-4, 6-8, 10, 12-16` |
| `TOTAL PERTEMUAN` | Jumlah pertemuan hasil hitung |
| `STATUS SINKRON` | `OK` / `BARU (auto)` / `BELUM TERJADWAL` |

Warna: merah muda = MK ada di FSTI tapi belum ada di sheet lab; hijau = baris
yang baru ditambahkan otomatis.

## Cara script mencocokkan data

Isi sel di sheet Lab punya dua pola yang bercampur:

```
Analisis Big Data A - Bisnis Digital      -> MK - Prodi
Teknik Industri - Riset Operasi 1 C       -> Prodi - MK
```

Script mengenali mana bagian prodi dengan mencocokkan ke daftar prodi
(`PRODI_FSTI` + `PRODI_LUAR` + prodi yang sudah ada di sheet FSTI), lalu sisanya
dianggap nama MK. Nama dinormalisasi (huruf kecil, spasi dirapikan, typo
diperbaiki lewat tabel alias) sebelum dicocokkan, jadi
`Statistika Sistem Informasi  A` (dua spasi) tetap ketemu dengan
`Statistika Sistem Informasi A`.

Minggu yang bukan milik MK tersebut tidak ikut terhitung. Contoh: `Analisis Big
Data A` tercatat minggu `1-4, 6-8, 10, 12-16` — minggu 9 memang tidak masuk
karena slot Senin sesi 1 minggu 9 dipakai `Teknik Industri - Riset Operasi 1 C`.

## Untuk jangka panjang

- **Idempoten** — boleh diklik berkali-kali, tidak menghasilkan baris dobel.
- **Auto-tambah baris** — MK/prodi baru yang muncul di sheet Lab tapi belum ada
  di FSTI ditambahkan otomatis sebagai baris baru (prodi + nama MK + jadwal fix),
  ditandai hijau. Kolom Modul dan MK Wajib tetap diisi manual.
  Hanya berlaku untuk prodi FSTI; entri prodi lain (TPB, PWK, Teknik Mesin,
  Teknik Industri, Teknik Kimia) hanya dilaporkan di dashboard.
- **Sesi terbaca dinamis** — kolom sesi dibaca dari header sheet Lab, jadi kalau
  jumlah sesi berubah dari 4 menjadi 5, script tetap jalan tanpa diubah.
- **Sheet lab baru** otomatis ikut terbaca asal namanya diawali `Lab `.

### Yang perlu diubah kalau ada perubahan besar

Semua di bagian atas `Code.gs`:

| Variabel | Kapan diubah |
|---|---|
| `PRODI_FSTI` | FSTI menambah prodi baru |
| `PRODI_LUAR` | Ada prodi fakultas lain yang mulai memakai lab |
| `ALIAS_PRODI` | Ketemu singkatan/typo nama prodi baru, mis. `'ia' : 'ilmu aktuaria'` |
| `ALIAS_KATA_MK` | Ketemu typo pada nama MK, mis. `'statisitik' : 'statistik'` |
| `CFG.LAB_PREFIX` | Pola penamaan sheet lab berubah |
| `CFG.ROW_START` | Baris awal data di sheet FSTI bergeser |

## Hasil uji dengan data Gasal 2026/2027

- 9 sheet lab terbaca, 1.286 sel jadwal, 63 mata kuliah unik.
- 47 dari 60 MK di sheet FSTI berhasil dicocokkan.
- 13 MK Informatika (Struktur Data, Desain Web, Manajemen Basis Data, Sistem
  Digital, Pengembangan Aplikasi Perangkat Bergerak, Pengolahan Citra Digital)
  memang belum muncul sama sekali di sheet Lab — bukan gagal cocok, tapi memang
  belum dijadwalkan.
- 16 entri sisanya milik prodi non-FSTI (TPB, PWK, Teknik Industri, Teknik Kimia,
  Teknik Mesin) — sengaja tidak dimasukkan ke sheet FSTI.
