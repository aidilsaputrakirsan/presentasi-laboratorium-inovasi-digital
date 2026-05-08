"""
Build clusters_data.json — Semantic Topic Clustering (AI Curated)
==================================================================
Generate clusters_data.json untuk setiap prodi.

Pengelompokan tematik, narasi observasi, dan rekomendasi kolaborasi
dilakukan oleh agen AI Claude Opus (Anthropic) — model penalaran tingkat
tinggi yang membaca seluruh judul karya dan menyusun klaster berdasarkan
pemahaman semantik konten. TIDAK menggunakan algoritma TF-IDF, K-Means,
atau metode statistik lainnya.

Definisi cluster (nama, keyword, pola judul, narrative, recommendation)
ditulis manual di file ini sebagai output analisis AI.

Output schema kompatibel dengan ResearchClusters.vue.

Usage:
  python scripts/build_clusters.py

Output:
  src/data/prodi/{slug}/clusters_data.json
"""

import json
import os
import sys
from datetime import datetime

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODI_DIR = os.path.join(BASE_DIR, 'src', 'data', 'prodi')

# AI agent attribution (used in metadata)
AI_AGENT = {
    'name': 'Claude Opus 4.7',
    'provider': 'Anthropic',
    'role': 'High-level reasoning agent',
    'task': 'Semantic clustering, narrative synthesis, collaboration recommendations',
}


# =====================================================================
# CLUSTER DEFINITIONS — Curated by AI agent (Claude Opus)
# =====================================================================
# Each cluster has:
#   - name: human-readable topic name (semantic synthesis, not TF-IDF output)
#   - keywords: 4-6 chosen semantic concepts
#   - narrative: 1-2 sentence observation about the cluster (what's distinctive)
#   - recommendation: actionable collaboration/strategy suggestion
#   - patterns: substring patterns for auto-assignment of items to this cluster
#
# Cluster names that match across prodi will be detected as Lintas-Prodi.
# =====================================================================

SI_PENELITIAN_CLUSTERS = [
    {
        'name': 'Sistem Informasi Tata Kelola Kampus',
        'keywords': ['tata kelola', 'akademik ITK', 'TOGAF', 'COBIT', 'arsitektur enterprise'],
        'narrative': 'Cluster terbesar di SI dengan fokus internal kampus — sistem akademik (TA, SIAKAD), layanan terpadu, tata kelola TI berbasis COBIT/TOGAF, hingga dukungan LPPM. Menunjukkan kapabilitas kuat dalam rekayasa SI institusional.',
        'recommendation': 'Konsolidasi sebagai "ekosistem digital ITK" terpadu yang dapat di-scale ke kampus lain di Kalimantan; potensi produk kompetitif untuk lisensi.',
        'patterns': [
            'manajemen tugas akhir', 'simlab', 'unit layanan terpadu', 'pelayanan administrasi',
            'pengajuan cuti', 'pusat layanan hukum', 'data center', 'disaster recovery',
            'simpas lppm', 'tridharma', 'cobit', 'togaf', 'siakad', 'penjadwalan',
            'sistem informasi penelitian dan pengabdian', 'arsitektur sistem',
        ],
    },
    {
        'name': 'Smart Home & IoT Energi',
        'keywords': ['smart home', 'IoT', 'monitoring energi', 'sistem otomasi', 'sensor'],
        'narrative': 'Konsentrasi pada IoT untuk monitoring energi listrik, deteksi kebakaran, dan otomasi perangkat domestik. Tim relatif kecil (4 dosen) tapi konsisten lintas tahun.',
        'recommendation': 'Angkat ke produk komersial — kerjasama dengan PLN atau startup energi untuk pilot project di hunian IKN / asrama mahasiswa.',
        'patterns': [
            'smart home', 'saklar listrik', 'sakelar listrik', 'deteksi dini kebakaran',
            'sistem bel sekolah', 'sustainable electricity', 'monitoring data energi',
        ],
    },
    {
        'name': 'Smart City & Pembangunan IKN',
        'keywords': ['smart city', 'IKN', 'kota penyangga', 'kualitas lingkungan', 'klasterisasi wilayah'],
        'narrative': 'Topik strategis lintas prodi (SI+BD) — kombinasi infrastruktur teknis (kualitas udara/air, klasterisasi wilayah, monitoring) dengan analisis kebijakan dan preferensi masyarakat. Sisi SI dominan pada sisi teknis komputasi.',
        'recommendation': 'Bentuk konsorsium SI+BD untuk pengusulan hibah riset terapan IKN — potensi tertinggi dengan total 29 karya gabungan dan 13 dosen lintas prodi.',
        'patterns': [
            'smart city', 'simsis', 'kota penyangga', 'tjslp', 'tanggung jawab sosial',
            'kualitas udara', 'kualitas air', 'klasterisasi', 'e-readiness', 'penajam paser',
            'pendapatan pajak', 'pembuangan sampah', 'bontang', 'forecasting ketercukupan',
        ],
    },
    {
        'name': 'Pembelajaran Adaptif & AI Edukasi',
        'keywords': ['adaptive learning', 'gamification', 'AI edukasi', 'LMS', 'media pembelajaran'],
        'narrative': 'Riset edukasi modern dengan AI, gamification, dan adaptive learning. Mencakup pengembangan smart school IKN, lab metaverse ITK, dan media pembelajaran berbasis AI.',
        'recommendation': 'Kolaborasi dengan Diknas/Kemdikbud untuk implementasi smart classroom di sekolah penyangga IKN; potensi publikasi jurnal pendidikan.',
        'patterns': [
            'adaptive learning', 'media pembelajaran', 'gamification', 'gamifikasi',
            'smart-school', 'smart school', 'learning management', 'technology acceptance',
            'personal extreme programming', 'proses belajar mengajar', 'metaverse',
            'lab terpadu', 'publishing apps', 'smart society', 'literasi',
        ],
    },
    {
        'name': 'Layanan Publik & Smart Government',
        'keywords': ['layanan publik', 'kelurahan', 'pemerintahan', 'OPD Balikpapan', 'website pemerintah'],
        'narrative': 'Sistem informasi untuk pemerintah daerah, kelurahan, dan layanan publik. Mayoritas berbasis web framework klasik (Waterfall/Agile/ICONIX) — masih ada ruang modernisasi tech-stack.',
        'recommendation': 'Modernisasi ke microservices/cloud-native dan kerjasama strategis dengan Diskominfo Balikpapan/IKN sebagai mitra adopter utama.',
        'patterns': [
            'silurah', 'kelurahan', 'opd', 'pemerintah kota', 'company profile pemerintahan',
            'livable home', 'pelayanan satu pintu', 'iconix process', 'pariwisata berbasis',
            'pendaftaran santri', 'layanan masyarakat',
        ],
    },
    {
        'name': 'Algoritma AI/ML untuk Sains',
        'keywords': ['deep learning', 'metaheuristik', 'fuzzy logic', 'optimasi', 'machine learning'],
        'narrative': 'Penelitian fondasional pada deep learning, metaheuristik, dan fuzzy logic untuk masalah sains terapan — kelautan (batimetri), kesehatan (gizi balita, postpartum), dan optimasi kombinatorial.',
        'recommendation': 'Cocok diangkat sebagai topik publikasi internasional Q1/Q2 — output algoritmik punya daya saing global dan portabilitas tinggi ke domain lain.',
        'patterns': [
            'interpretable deep learning', 'metaheuristik', 'adaptive mesh', 'svm',
            'support vector machine', 'fuzzy logic', 'fuzzy rule', 'artificial neural network',
            'data mining', 'klasifikasi status gizi', 'logika fuzzy',
        ],
    },
    {
        'name': 'E-Commerce, Fintech & UMKM Digital',
        'keywords': ['e-commerce', 'mobile payment', 'fintech', 'UMKM', 'UI/UX bisnis'],
        'narrative': 'Studi adopsi teknologi pada UMKM Balikpapan — e-commerce, mobile payment, dan UI/UX fintech. Topik bersinggungan dengan kompetensi BD.',
        'recommendation': 'Sinergi dengan cluster BD "Manajemen UMKM" untuk membentuk pusat studi UMKM digital ITK — combined expertise sangat kuat.',
        'patterns': [
            'e-commerce', 'mobile payment', 'financial technology', 'fintech',
            'continuance intention', 'smart economy',
        ],
    },
    {
        'name': 'Inovasi Material & Energi Terbarukan',
        'keywords': ['material', 'turbin angin', 'kompos', 'energi terbarukan', 'manufaktur aditif'],
        'narrative': 'Topik tipis dan terisolasi (3 karya: turbin angin Savonius, pengolahan limbah jamur). Bukan core kompetensi prodi SI — kemungkinan kontribusi dari kolaborasi lintas jurusan.',
        'recommendation': 'Pertimbangkan re-host ke jurusan Teknik Mesin/Lingkungan, atau eksplisitkan kolaborasi sebagai tim multidisiplin.',
        'patterns': [
            'turbin angin', 'savonius', 'aditif manufakturing', 'kompos',
            'limbah baglog', 'mol nasi basi',
        ],
    },
]

SI_PENGABDIAN_CLUSTERS = [
    {
        'name': 'Sekolah Cerdas & Edukasi Digital Anak',
        'keywords': ['sekolah dasar', 'pemrograman anak', 'literasi digital', 'pembelajaran daring'],
        'narrative': 'Aktivitas konsisten setiap tahun — pelatihan pemrograman dasar, edukasi internet sehat, dan dukungan pembelajaran daring untuk SD/SMP/SMA Balikpapan. 7 dosen aktif.',
        'recommendation': 'Sinergi dengan cluster Penelitian "Pembelajaran Adaptif & AI Edukasi" untuk membangun framework smart classroom regional yang terbukti di lapangan.',
        'patterns': [
            'sdn', 'sd ', 'al azhar', 'smp', 'sma', 'pesantren koding', 'mit app inventor',
            'pelatihan pemrograman', 'aplikasi scratch', 'kelas digital', 'try out',
            'perpustakaan berbasis web', 'internet sehat', 'pembelajaran daring',
            'edukasi penggunaan internet', 'media pembelajaran',
        ],
    },
    {
        'name': 'Bank Sampah & Pengelolaan Lingkungan Digital',
        'keywords': ['bank sampah', 'pengelolaan sampah', 'biopori', 'lingkungan urban'],
        'narrative': 'Digitalisasi bank sampah lokal Balikpapan — pola kerja sudah matang dengan beberapa RT mitra rutin (Margo Mulyo, Borneo 38, Klandasan Ilir).',
        'recommendation': 'Konversi best practice ini menjadi paket replikasi standar untuk bank sampah di kota lain Kaltim — potensi pendanaan KLHK / Adipura.',
        'patterns': [
            'bank sampah', 'pengelolaan sampah', 'pengolahan sampah', 'biopori',
            'desa digital peduli sampah', 'urban farming dan pengelolaan sampah',
        ],
    },
    {
        'name': 'Wisata Lokal & Branding Digital',
        'keywords': ['wisata', 'branding kawasan', 'mangrove', 'kampung tematik', 'promosi digital'],
        'narrative': 'Cluster terbesar pengabdian SI (16 karya, 9 dosen) — branding digital kawasan wisata, hutan kota, dan kampung tematik. Ekosistem mitra stabil dan beragam.',
        'recommendation': 'Buat "Platform Wisata Balikpapan" terpadu yang memayungi seluruh kawasan binaan — produk turunan dari pengabdian bisa menjadi aset jangka panjang.',
        'patterns': [
            'wisata', 'mangrove', 'meranti', 'sungai wain', 'tanjung gading',
            'kampung e-sport', 'kampung kang', 'bamboe wanadesa', 'hutan kota',
            'kawasan kuliner', 'destinasi', 'permodelan 3d',
        ],
    },
    {
        'name': 'UMKM & Pemasaran Digital',
        'keywords': ['UMKM', 'pemasaran digital', 'digital marketing', 'produk lokal'],
        'narrative': 'Konsisten lintas tahun — pelatihan digital marketing untuk UMKM batik, kuliner, urban farming, hingga komunitas disabilitas. Bersinggungan kuat dengan kompetensi BD.',
        'recommendation': 'Kolaborasi formal dengan BD untuk pendampingan UMKM jangka panjang berbasis kurikulum baku — hindari tumpang tindih, perkuat dampak.',
        'patterns': [
            'umkm', 'digital marketing', 'pemasaran digital', 'pelatihan pemasaran',
            'pemasaran produk', 'platform digital', 'batik', 'pepaya',
            'pemasaran hasil', 'olahan jambu', 'urban farming', 'kewirausahaan berbasis mikro',
        ],
    },
    {
        'name': 'Smart RT & Layanan Pemukiman Digital',
        'keywords': ['smart RT', 'website RT', 'data warga', 'layanan kelurahan'],
        'narrative': 'Digitalisasi administrasi RT/kelurahan — website data warga, dashboard layanan, modernisasi pengarsipan. Pola kerja sudah replicable.',
        'recommendation': 'Standardisasi sebagai "Paket Smart RT ITK" yang siap di-deploy ke RT mana pun — bisa jadi produk pengabdian masal.',
        'patterns': [
            'smart rt', 'kelurahan margo mulyo', 'graha indah', 'muara rapak',
            'website dashboard', 'pembangunan website dashboard', 'digitalisasi layanan',
            'rumah warna-warni', 'telaga sari', 'gantion',
        ],
    },
    {
        'name': 'Pemberdayaan Pertanian & Akuaponik',
        'keywords': ['kelompok tani', 'akuaponik', 'budikdamber', 'pupuk organik', 'pertanian urban'],
        'narrative': 'Aktivitas teknik terapan untuk kelompok tani — akuaponik, hidroponik, budikdamber, pengolahan limbah pertanian. 5 dosen, 5 karya.',
        'recommendation': 'Kerjasama dengan Dinas Pertanian Kaltim untuk skala lebih luas; potensi sinergi dengan BD "Pemberdayaan Pertanian".',
        'patterns': [
            'kelompok tani', 'kelompok wanita tani', 'akuaponik', 'budikdamber',
            'budidaya ikan lele', 'pupuk organik', 'jambu kristal', 'kebun melon',
            'rainwater harvesting', 'biogas', 'hidroponik', 'limbah pertanian',
            'kangkung',
        ],
    },
    {
        'name': 'Pemberdayaan Sosial & Inklusivitas',
        'keywords': ['pemberdayaan sosial', 'disabilitas', 'inklusi', 'gotong royong'],
        'narrative': 'Cakupan sangat tipis (1 karya untuk PPDI). Area yang underserved padahal high-impact secara sosial.',
        'recommendation': 'Tambah skala — disabilitas adalah area pengabdian yang underserved; potensi pendanaan Kementerian Sosial / lembaga internasional.',
        'patterns': [
            'penyandang disabilitas', 'ppdi', 'gotong royong', 'pemberdayaan masyarakat baru',
            'penataan kawasan pemukiman',
        ],
    },
    {
        'name': 'Sistem Informasi untuk Komunitas',
        'keywords': ['SI komunitas', 'aplikasi web komunitas', 'pemodelan proses bisnis'],
        'narrative': 'Pengembangan SI untuk lembaga komunitas (pengajian, edukasi anak). Kecil tapi diversifikasi mitra OK.',
        'recommendation': 'Konsolidasi ke template generik "SI Komunitas" yang dapat dipakai berulang — efisiensi tinggi untuk pengabdian rutin.',
        'patterns': [
            'sistem informasi pengajian', 'pemodelan proses bisnis', 'bizagi',
            'optimalisasi teknologi', 'pengajaran anak-anak',
        ],
    },
]

BD_PENELITIAN_CLUSTERS = [
    {
        'name': 'Manajemen UMKM & Industri Mikro',
        'keywords': ['UMKM', 'industri mikro kecil', 'manajemen stok', 'predictive analytics', 'IKN'],
        'narrative': 'Cluster terbesar BD — fokus pada predictive analytics, sistem stok gudang, dan rancang bangun aplikasi untuk industri mikro di kota penyangga IKN. 7 dosen aktif.',
        'recommendation': 'Bentuk Pusat Layanan Teknologi UMKM ITK yang menggabungkan output cluster ini dengan SI "E-Commerce, Fintech & UMKM Digital".',
        'patterns': [
            'umkm', 'industri mikro', 'sistem stok gudang', 'manajemen stok gudang',
            'predictive analytics untuk usaha mikro', 'bimbingan penjualan',
            'pemilihan produk umkm', 'inkubator bisnis',
        ],
    },
    {
        'name': 'Smart City & Pembangunan IKN',
        'keywords': ['smart city', 'IKN', 'kota penyangga', 'preferensi masyarakat', 'infrastruktur'],
        'narrative': 'Topik strategis lintas prodi — sisi BD dominan pada aspek kebijakan, kelayakan hunian, dan infrastruktur pendukung (air bersih, baterai EV, garis pantai).',
        'recommendation': 'Bentuk konsorsium SI+BD untuk pengusulan hibah riset terapan IKN; sisi BD memperkuat aspek sosial-ekonomi dan kebijakan publik.',
        'patterns': [
            'smart city', 'kota penyangga', 'kawasan ikn', 'preferensi penduduk',
            'pemilihan hunian', 'garis pantai', 'pesisir ikn', 'air bersih', 'grey water',
            'limbah domestik', 'stasiun penukaran baterai', 'sepeda motor listrik',
        ],
    },
    {
        'name': 'Pembiayaan UMKM & Pertanian Berkelanjutan',
        'keywords': ['pembiayaan UMKM', 'eco-friendly', 'pangan', 'distribusi'],
        'narrative': 'Skema pembiayaan UMKM pertanian eco-friendly Kaltim — riset multi-tahun (T2-T3) yang konsisten tapi terkonsentrasi pada satu PI utama.',
        'recommendation': 'Cari co-PI baru untuk diversifikasi tim; kerjasama dengan Bank Pembangunan Daerah / Bank Indonesia untuk skala kebijakan.',
        'patterns': [
            'pembiayaan umkm', 'eco-friendly', 'pertanian di kalimantan',
            'daging sapi', 'distribusi multi-produk', 'multi-eselon',
            'heavy equipment leasing',
        ],
    },
    {
        'name': 'Pajak & Tata Kelola Keuangan Publik',
        'keywords': ['pajak', 'coretax', 'badan layanan umum', 'kebijakan keuangan'],
        'narrative': 'Niche tapi sangat relevan — evaluasi adopsi Coretax dan kebijakan keuangan BLU. Topik baru (2025) dengan 4 penulis berbeda.',
        'recommendation': 'Kerjasama dengan KPP Pratama Balikpapan dan BLU kementerian sebagai mitra studi adopsi; potensi publikasi kebijakan publik.',
        'patterns': [
            'coretax', 'wajib pajak', 'badan layanan umum',
            'proyeksi kebijakan pengelolaan keuangan',
        ],
    },
    {
        'name': 'Wisata Kuliner Digital',
        'keywords': ['wisata kuliner', 'destinasi', 'pemasaran digital', 'IKN'],
        'narrative': 'Sangat tipis di sisi penelitian (1 karya bersih). Mayoritas konten wisata kuliner BD justru ada di pengabdian.',
        'recommendation': 'Konversi pengabdian wisata kuliner menjadi penelitian — siap diangkat sebagai studi kasus marketing digital UMKM kuliner.',
        'patterns': [
            'wisata kuliner', 'destinasi kuliner', 'aplikasi wisata kuliner',
            'mall', 'produk halal',
        ],
    },
    {
        'name': 'Perilaku Digital & Cyberloafing',
        'keywords': ['perilaku digital', 'gamifikasi kerja', 'cyberloafing', 'literasi digital'],
        'narrative': 'Tema HR-tech yang underexplored — gamifikasi sebagai antitesis cyberloafing untuk produktivitas kerja. Fresh angle.',
        'recommendation': 'Topik fresh, cocok untuk publikasi jurnal manajemen Q2; cari kolaborator dari psikologi industri / OB.',
        'patterns': [
            'perilaku digital', 'literasi digital', 'cyberloafing', 'role-playing game',
            'rpg berbasis android', 'klasifikasi emosi teks',
        ],
    },
    {
        'name': 'AI & Manajemen Proses Bisnis',
        'keywords': ['kecerdasan buatan', 'manajemen proses bisnis', 'social commerce', 'AI ethics'],
        'narrative': 'Topik baru (2026) tentang privasi AI di social commerce — pintu masuk ke kajian AI ethics di konteks bisnis Indonesia.',
        'recommendation': 'Perluas ke roadmap riset AI ethics; kolaborasi dengan SI "Algoritma AI/ML untuk Sains" untuk kombinasi teknis-etis.',
        'patterns': [
            'manajemen proses bisnis', 'kecerdasan buatan', 'artificial intelligence',
            'social commerce', 'isu privasi',
        ],
    },
    {
        'name': 'Sistem Cerdas Akuakultur & IoT',
        'keywords': ['smart auto feeder', 'fuzzy logic', 'IoT akuakultur', 'budidaya ikan'],
        'narrative': 'Outlier di BD — smart auto feeder ikan dengan fuzzy logic. Lebih sesuai dengan kompetensi prodi teknik elektro/biomedis.',
        'recommendation': 'Kolaborasi dengan Teknik Elektro/Biomedis untuk pengembangan IoT akuakultur; potensi spin-off ke tambak modern.',
        'patterns': [
            'auto feeder', 'umur dan ukuran ikan',
        ],
    },
]

BD_PENGABDIAN_CLUSTERS = [
    {
        'name': 'UMKM & Pemasaran Digital',
        'keywords': ['UMKM', 'pemasaran digital', 'desain produk', 'inkubator startup'],
        'narrative': 'Cluster terbesar BD pengabdian (16 karya, 8 dosen) — pelatihan pemasaran digital, redesign packaging, pendampingan startup. Sangat overlap dengan SI.',
        'recommendation': 'Bentuk Inkubator UMKM ITK formal yang menggabungkan kapasitas BD ini dengan SI "UMKM & Pemasaran Digital" — hilangkan duplikasi.',
        'patterns': [
            'pemasaran produk umkm', 'pelatihan optimalisasi pemasaran digital',
            'pemasaran digital', 'industri mikro kecil', 'koperasi sebagai mitra',
            'kewirausahaan', 'startup', 'inkubasi global',
            'pemberdayaan pencinta anggrek', 'kelompok usaha bersama', 'sablon',
            'pasar bangun reksa', 'redesign packaging',
        ],
    },
    {
        'name': 'Wisata Lokal & Branding Digital',
        'keywords': ['wisata kawasan', 'branding digital', 'celosia', 'tanjung gading'],
        'narrative': 'Branding wisata kawasan (Teritip, Kang Bejo, Celosia, Tanjung Gading) dengan pendekatan digital — overlap dengan SI dengan mitra berbeda.',
        'recommendation': 'Sinergi dengan SI untuk Platform Wisata Balikpapan terintegrasi; saling rujuk sebagai showcase ekosistem.',
        'patterns': [
            'tourism in teritip', 'kampung wisata', 'celosia garden',
            'tanjung gading', 'bamboe wanadesa',
        ],
    },
    {
        'name': 'Smart RT & Layanan Pemukiman Digital',
        'keywords': ['administrasi RT', 'PPKS', 'pendataan warga', 'layanan kelurahan'],
        'narrative': 'Sistem informasi pendataan warga (PPKS), administrasi RT digital — overlap konseptual dengan SI tetapi mitra dan konteks berbeda.',
        'recommendation': 'Sinergi dengan SI untuk Paket Smart RT terpadu; kontribusi BD adalah aspek sosial/data warga.',
        'patterns': [
            'administrasi rt', 'pengelolaan data warga', 'ppks', 'pendataan warga',
            'website serta program edukasi rt',
        ],
    },
    {
        'name': 'Pemberdayaan Masjid & Yayasan',
        'keywords': ['masjid', 'yayasan', 'donasi web', 'IoT komunitas religi'],
        'narrative': 'Niche unik BD — IT untuk lembaga keagamaan/yayasan (donasi web, akuaponik IoT masjid). Tidak ada di SI.',
        'recommendation': 'Replikasi ke yayasan lain; potensi pendanaan dari BAZNAS / Kementerian Agama / DMI.',
        'patterns': [
            'masjid berkah', 'yayasan berkah', 'sistem pendataan donasi',
            'aquaponik berbasis internet of things',
        ],
    },
    {
        'name': 'Lean Six Sigma & Perbaikan Industri Lokal',
        'keywords': ['lean six sigma', 'perbaikan proses', 'industri oleh-oleh', 'kualitas produk'],
        'narrative': 'Tipis (1 karya) tapi distinctive — Lean Six Sigma untuk industri oleh-oleh. Skill langka di lingkungan lab.',
        'recommendation': 'Skalakan dengan kerjasama Disperindag — peningkatan kualitas IKM Balikpapan/IKN adalah kebutuhan riil.',
        'patterns': [
            'lean six sigma', 'industri oleh-oleh',
        ],
    },
    {
        'name': 'Pemberdayaan Pertanian & Pengolahan Hasil',
        'keywords': ['urban farming', 'pengolahan singkong', 'mangrove', 'pemberdayaan pesisir'],
        'narrative': 'Pemberdayaan urban farming, pengolahan singkong, mangrove — overlap dengan SI "Pemberdayaan Pertanian" dengan pendekatan ekonomi.',
        'recommendation': 'Sinergi dengan SI "Pemberdayaan Pertanian & Akuaponik" untuk paket PkM bersama; SI menyediakan teknologi, BD menyediakan model bisnis.',
        'patterns': [
            'urban farming', 'singkong', 'olahan buah brownies mangrove',
        ],
    },
]

CLUSTER_DEFS = {
    ('sistem-informasi', 'penelitian'): SI_PENELITIAN_CLUSTERS,
    ('sistem-informasi', 'pengabdian'): SI_PENGABDIAN_CLUSTERS,
    ('bisnis-digital', 'penelitian'): BD_PENELITIAN_CLUSTERS,
    ('bisnis-digital', 'pengabdian'): BD_PENGABDIAN_CLUSTERS,
}


def assign_cluster(title, defs):
    """Return cluster index (or -1 if no match) based on first matching pattern."""
    t = title.lower()
    for idx, c in enumerate(defs):
        for pat in c['patterns']:
            if pat.lower() in t:
                return idx
    return -1


def build_clusters_for_prodi(prodi_slug, sinta_data):
    prodi_name = sinta_data.get('metadata', {}).get('prodi', prodi_slug)

    raw_items = {'penelitian': [], 'pengabdian': []}
    for lec in sinta_data.get('lecturers', []):
        author = lec.get('name', '')
        for r in lec.get('research', []):
            raw_items['penelitian'].append({
                'title': r.get('title', ''),
                'author': author,
                'prodi': prodi_name,
                'type': 'Penelitian',
                'year': str(r.get('year', '')),
            })
        for s in lec.get('services', []):
            raw_items['pengabdian'].append({
                'title': s.get('title', ''),
                'author': author,
                'prodi': prodi_name,
                'type': 'Pengabdian',
                'year': str(s.get('year', '')),
            })

    out = {'penelitian': {}, 'pengabdian': {}}
    summary = {
        'penelitian': {'crossProdiCount': 0, 'highPotentialCount': 0,
                       'totalClusters': 0, 'totalItems': 0, 'topClusters': []},
        'pengabdian': {'crossProdiCount': 0, 'highPotentialCount': 0,
                       'totalClusters': 0, 'totalItems': 0, 'topClusters': []},
    }

    for ctype in ('penelitian', 'pengabdian'):
        defs = CLUSTER_DEFS.get((prodi_slug, ctype), [])
        buckets = [[] for _ in defs]
        unmatched = []

        for it in raw_items[ctype]:
            idx = assign_cluster(it['title'], defs)
            if idx >= 0:
                buckets[idx].append(it)
            else:
                unmatched.append(it)

        cluster_id = 0
        for idx, c in enumerate(defs):
            items = buckets[idx]
            if not items:
                continue
            authors = sorted({i['author'] for i in items})
            prodis = sorted({i['prodi'] for i in items})
            cluster_obj = {
                'id': cluster_id,
                'name': c['name'],
                'keywords': c['keywords'],
                'narrative': c.get('narrative', ''),
                'recommendation': c.get('recommendation', ''),
                'items': items,
                'count': len(items),
                'prodis': prodis,
                'authors': authors,
                'isCrossProdi': len(prodis) > 1,
                'collaborationPotential': 'low',
                'isHighPotential': False,
            }
            out[ctype][str(cluster_id)] = cluster_obj
            cluster_id += 1

        if unmatched:
            authors = sorted({i['author'] for i in unmatched})
            prodis = sorted({i['prodi'] for i in unmatched})
            out[ctype][str(cluster_id)] = {
                'id': cluster_id,
                'name': 'Topik Beragam Lainnya',
                'keywords': ['lain-lain', 'topik beragam'],
                'narrative': 'Karya yang belum terklasifikasi ke topik utama — biasanya topik unik/baru atau berada di persimpangan beberapa cluster.',
                'recommendation': 'Tinjau ulang setelah jumlah karya meningkat — bisa jadi cluster baru muncul dari sini.',
                'items': unmatched,
                'count': len(unmatched),
                'prodis': prodis,
                'authors': authors,
                'isCrossProdi': len(prodis) > 1,
                'collaborationPotential': 'low',
                'isHighPotential': False,
            }
            cluster_id += 1

        all_clusters = list(out[ctype].values())
        all_clusters_sorted = sorted(all_clusters, key=lambda x: -x['count'])
        summary[ctype]['totalClusters'] = len(all_clusters)
        summary[ctype]['totalItems'] = sum(c['count'] for c in all_clusters)
        summary[ctype]['topClusters'] = [
            {'id': c['id'], 'name': c['name'], 'count': c['count']}
            for c in all_clusters_sorted[:5]
        ]

    return {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'curatedBy': AI_AGENT,
            'method': 'Manual semantic clustering by AI agent — no algorithmic clustering',
            'totalPenelitian': sum(c['count'] for c in out['penelitian'].values()),
            'totalPengabdian': sum(c['count'] for c in out['pengabdian'].values()),
            'totalItems': (sum(c['count'] for c in out['penelitian'].values())
                          + sum(c['count'] for c in out['pengabdian'].values())),
            'totalClusters': len(out['penelitian']) + len(out['pengabdian']),
        },
        'clusters': out,
        'summary': summary,
    }


def cross_prodi_pass(all_results):
    """Mark clusters that share the same name across prodi as cross-prodi."""
    for ctype in ('penelitian', 'pengabdian'):
        name_to_prodis = {}
        for slug, data in all_results.items():
            for cid, c in data['clusters'][ctype].items():
                name_to_prodis.setdefault(c['name'], set()).add(slug)
        cross_names = {n for n, s in name_to_prodis.items() if len(s) > 1}

        for slug, data in all_results.items():
            crossCount = 0
            highCount = 0
            for cid, c in data['clusters'][ctype].items():
                if c['name'] in cross_names:
                    c['isCrossProdi'] = True
                    crossCount += 1
                    if c['count'] >= 5:
                        c['collaborationPotential'] = 'high'
                        c['isHighPotential'] = True
                        highCount += 1
                    else:
                        c['collaborationPotential'] = 'medium'
            data['summary'][ctype]['crossProdiCount'] = crossCount
            data['summary'][ctype]['highPotentialCount'] = highCount


def main():
    prodi_slugs = [d for d in os.listdir(PRODI_DIR)
                   if os.path.isdir(os.path.join(PRODI_DIR, d))]
    results = {}
    for slug in prodi_slugs:
        sinta_path = os.path.join(PRODI_DIR, slug, 'sinta_data.json')
        if not os.path.exists(sinta_path):
            continue
        with open(sinta_path, encoding='utf-8') as f:
            sinta_data = json.load(f)
        if (slug, 'penelitian') not in CLUSTER_DEFS:
            continue
        print(f'[{slug}] Processing...')
        results[slug] = build_clusters_for_prodi(slug, sinta_data)

    cross_prodi_pass(results)

    for slug, data in results.items():
        out_path = os.path.join(PRODI_DIR, slug, 'clusters_data.json')
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        m = data['metadata']
        print(f'  -> {slug}: {m["totalPenelitian"]} pen + {m["totalPengabdian"]} pkm '
              f'in {m["totalClusters"]} clusters')

    print('Done.')


if __name__ == '__main__':
    main()
