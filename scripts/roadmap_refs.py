# -*- coding: utf-8 -*-
"""
Definisi acuan roadmap untuk pemetaan judul penelitian prodi.
=============================================================
Satu modul berisi SEMUA acuan agar aturan pemetaan terkumpul di satu tempat
dan dapat diaudit/direvisi koorpro tanpa menyentuh mesin pemetaannya.

Acuan yang tersedia:
  FSTI - Roadmap Penelitian, PkM, dan Renstra FSTI ITK 2025-2029, Bab 4
         (4 Pilar Strategis). Dokumen: Roadmap_FSTI.pdf hal. 9-11.
         CATATAN: dokumen FSTI hanya memuat narasi pilar, TIDAK memuat daftar
         topik. Kata kunci di bawah adalah turunan operasional dari narasi
         tersebut, disusun prodi - bukan kutipan dokumen.

  ITK  - Panduan Penelitian dan PkM ITK Edisi X 2026, Bab 1.1 Fokus Riset
         Penelitian Institut. Dokumen memuat Tabel 1 (Bidang Fokus Riset) dan
         Tabel 3 (Roadmap Pusat Penelitian TIK Smart City) yang MENCANTUMKAN
         topik per sub tema secara eksplisit. Kata kunci di bawah karenanya
         diturunkan langsung dari kolom TOPIK dokumen - dasar yang lebih kuat
         daripada acuan FSTI.

Struktur tiap acuan:
  categories : dict kode -> deskripsi kategori acuan
  rules      : list (kode, bobot, [kata kunci judul])
"""

# =============================================================================
# ACUAN 1: Roadmap FSTI 2025-2029 - 4 Pilar Strategis (Bab 4, hal. 9-11)
# =============================================================================
FSTI_CATEGORIES = {
    'P1': {
        'name': 'Smart Governance dan Transformasi Digital Perkotaan',
        'flagship': 'GovTech Nusantara',
        'siRole': ('Merancang enterprise architecture dan memodelkan integrasi '
                   'layanan e-Government agar ramah pengguna (user-centric)'),
        'source': 'Roadmap FSTI 2025-2029, Bab 4.1 (hal. 9)',
    },
    'P2': {
        'name': 'Smart Education (Edukasi Cerdas dan Inklusif)',
        'flagship': 'AI-based Learning Management System',
        'siRole': ('Rekayasa perangkat lunak sistem informasi akademik dan '
                   'media pembelajaran adaptif/inklusif'),
        'source': 'Roadmap FSTI 2025-2029, Bab 4.2 (hal. 9-10)',
    },
    'P3': {
        'name': 'Smart Living dan Lingkungan Kesehatan Cerdas',
        'flagship': 'Bio-Smart Living System',
        'siRole': ('Platform informasi layanan kesehatan, analitik data '
                   'lingkungan, dan sistem pemantauan berbasis IoT'),
        'source': 'Roadmap FSTI 2025-2029, Bab 4.3 (hal. 10)',
    },
    'P4': {
        'name': 'Smart Grid, Energi Cerdas, dan Mobilitas Berkelanjutan',
        'flagship': 'Microgrid & EV Charging',
        'siRole': ('Sistem monitoring dan visualisasi data energi serta '
                   'antarmuka pengguna aplikasi energi'),
        'source': 'Roadmap FSTI 2025-2029, Bab 4.4 (hal. 10-11)',
    },
}

FSTI_RULES = [
    ('P1', 3, ['E-GOVERNMENT', 'PEMERINTAH', 'KELURAHAN', 'PERIZINAN', 'DPMPTSP',
               'PELAYANAN SATU PINTU', 'UNIT LAYANAN TERPADU', 'LAYANAN MASYARAKAT',
               'TATA KELOLA', 'COBIT', 'TOGAF', 'ARSITEKTUR SISTEM', 'ENTERPRISE',
               'MANAJEMEN RISIKO', 'ISO 31000', 'JUSTIFIKASI TEKNIS', 'DATA CENTER',
               'DISASTER RECOVERY', 'PROSES BISNIS', 'BUSINESS PROCESS',
               'E-READINESS', 'TRANSPARANSI', 'TJSLP', 'PAJAK DAERAH',
               'KRIPTOSISTEM', 'KEAMANAN DATA',
               'COMPANY PROFILE PEMERINTAHAN', 'HUKUM']),
    ('P1', 2, ['SISTEM INFORMASI PROFIL', 'SIMPAS', 'SIMLAB', 'ADMINISTRASI',
               'CUTI PEGAWAI', 'EMPLOYEE INFORMATION SYSTEM', 'APPROVAL WORKFLOW',
               'PENDAFTARAN SANTRI', 'PENELITIAN DAN PENGABDIAN MASYARAKAT', 'PARIWISATA', 'FESTIVAL', 'E-COMMERCE',
               'UMKM', 'MOBILE PAYMENT', 'FINANCIAL TECHNOLOGY', 'SMART ECONOMY']),
    ('P2', 3, ['PEMBELAJARAN', 'BELAJAR MENGAJAR', 'LEARNING MANAGEMENT',
               'E-LEARNING', 'SEKOLAH', 'SMART-SCHOOL', 'SIAKAD', 'AKADEMIK',
               'TUGAS AKHIR', 'PENJADWALAN PEMBELAJARAN', 'GAMIFICATION',
               'MEDIA PEMBELAJARAN', 'ADAPTIVE LEARNING', 'DISABILITAS',
               'PESERTA DIDIK', 'LITERASI', 'DISCRETE TRIAL TRAINING',
               'SISTEM INFORMASI COURSE', 'PERPUSTAKAAN', 'SMART LIBRARY',
               'HERBARIUM', 'METAVERSE', 'BEL SEKOLAH',
               'SIMSIS', 'PUBLISHING APPS']),
    ('P3', 3, ['KESEHATAN', 'KLINIK', 'GIZI', 'BALITA', 'POSTPARTUM', 'REKAM MEDIS',
               'KEMATIAN IBU', 'SAMPAH', 'TPS 3R', 'TEMPAT PEMBUANGAN AKHIR', 'KUALITAS UDARA', 'KUALITAS AIR',
               'KOMPOS', 'LIMBAH', 'KEBISINGAN', 'KEBAKARAN', 'KESELAMATAN',
               'LIVABLE HOME', 'BATIMETRI', 'KESEHATAN MENTAL',
               'KESELAMATAN BERKENDARA', 'PEMANTAUAN KESELAMATAN']),
    ('P4', 3, ['ENERGI LISTRIK', 'ENERGI HIJAU', 'TURBIN ANGIN', 'ELECTRICITY',
               'SAKELAR LISTRIK', 'SAKLAR LISTRIK', 'MONITORING DATA ENERGI']),
    # Konteks pendukung lintas pilar
    ('P3', 1, ['IOT', 'SMART HOME', 'MONITORING']),
    ('P1', 1, ['IKN', 'IBU KOTA NEGARA', 'SMART CITY', 'SMART SOCIETY', 'AGILE', 'SCRUM', 'WATERFALL', 'EXTREME PROGRAMMING',
               'ICONIX', 'PROTOTYPING', 'RAPID APPLICATION DEVELOPMENT', 'UI/UX']),
]

# =============================================================================
# ACUAN 2: Panduan Penelitian & PkM ITK Edisi X 2026 - Fokus Riset Institut
# -----------------------------------------------------------------------------
# Level 1 = Pusat Penelitian (6 pusat, Tabel 1 hal. 5-11)
# Level 2 = Tema (khusus Pusat TIK Smart City: 6 dimensi smart city)
# Level 3 = Sub Tema (Tabel 3, hal. 20-25) <- unit pemetaan yang dipakai
#
# Nilai `topik` di bawah adalah KUTIPAN kolom TOPIK dokumen, sehingga tiap
# kategori dapat ditelusuri langsung ke halaman panduan.
# =============================================================================
ITK_CATEGORIES = {
    # --- Pusat Penelitian TIK Smart City -> SMART GOVERNANCE ---
    'SG-PS': {
        'name': 'Smart Governance / Public Service (Layanan Publik)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Governance',
        'topik': ('Pelayanan Administrasi; Sarana prasarana & Monitoring bahan pokok '
                  'dan jasa pokok untuk masyarakat'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 20)',
    },
    'SG-BR': {
        'name': 'Smart Governance / Bureaucracy (Birokrasi)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Governance',
        'topik': ('Pembangunan birokrasi; Inisiasi SIM SPBE (kepegawaian, keamanan, '
                  'perijinan, dsb); aset TIK, data, dan manajemen layanan'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 20)',
    },
    'SG-PP': {
        'name': 'Smart Governance / Public Policy (Kebijakan Publik)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Governance',
        'topik': ('Pembangunan budaya dan praktik citizen-centered policy; '
                  'pengembangan strategi reformasi kebijakan publik, khususnya '
                  'data dan sistem data terbuka'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 20)',
    },
    # --- SMART BRANDING ---
    'SB-TO': {
        'name': 'Smart Branding / Tourism (Pariwisata Daerah)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Branding',
        'topik': ('Pengembangan destinasi wisata daerah; pembangunan infrastruktur '
                  'kenyamanan wisatawan (amenities); budaya ramah (hospitality); '
                  'inisiasi virtual tour'),
        'source': 'Panduan P2M ITK 2026, Tabel 1 (hal. 7) & Tabel 3 (hal. 21)',
    },
    'SB-BB': {
        'name': 'Smart Branding / Business Branding (Bisnis Daerah)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Branding',
        'topik': ('Pembangunan dan pasar perdagangan (market place); ekosistem '
                  'investasi daerah; produk dan jasa industri khas daerah'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 21)',
    },
    'SB-CA': {
        'name': 'Smart Branding / City Appearance (Wajah Kota)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Branding',
        'topik': ('Perwujudan penataan kembali wajah kota; pembangunan batas wilayah '
                  '(edge), landmark, signage, path, node; SIG kota'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 21-22)',
    },
    # --- SMART ECONOMY ---
    'SE-IN': {
        'name': 'Smart Economy / Industry (Ekosistem Industri)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Economy',
        'topik': 'Pembangunan daya saing industri daerah; sentra produksi dan inovasi',
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 22)',
    },
    'SE-WE': {
        'name': 'Smart Economy / Welfare (Kesejahteraan Rakyat)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Economy',
        'topik': ('Peningkatan pendapatan rumah tangga (income); penyerapan angkatan '
                  'kerja (employment); pemberdayaan ekonomi masyarakat (empowerment); '
                  'UMKM dan inkubator bisnis'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 22-23)',
    },
    'SE-TR': {
        'name': 'Smart Economy / Transaction (Transaksi Keuangan)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Economy',
        'topik': ('Pembangunan ekosistem transaksi keuangan digital; masyarakat '
                  'bankable dan akses permodalan; perwujudan ekonomi digital '
                  '(e-commerce & market place); QRIS dan e-money'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 23)',
    },
    # --- SMART LIVING ---
    'SL-HA': {
        'name': 'Smart Living / Harmony (Harmonisasi Tata Ruang Wilayah)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Living',
        'topik': ('Perwujudan tata ruang wilayah yang nyaman dan harmonis; pemetaan '
                  'infrastruktur (perumahan, kesehatan, RTH, utilitas); image '
                  'processing dalam pemetaan'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 23)',
    },
    'SL-HE': {
        'name': 'Smart Living / Health (Sarana Prasarana Kesehatan)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Living',
        'topik': ('Penyediaan akses ketersediaan makan minum sehat (food), pelayanan '
                  'kesehatan (healthcare) dan prasarana olahraga (sport); inisiasi '
                  'SIM kesehatan (rekomendasi pola, pemetaan)'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 24)',
    },
    'SL-BU': {
        'name': 'Smart Living / Building (Sarana Prasarana Bangunan)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Living',
        'topik': ('Perwujudan bangunan yang efisien dan nyaman; pengembangan konsep '
                  'infrastruktur dan sensor; inisiasi sensor terkait bangunan'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 24)',
    },
    # --- SMART SOCIETY ---
    'SS-CO': {
        'name': 'Smart Society / Community (Interaksi Masyarakat)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Society',
        'topik': ('Perwujudan kemudahan interaksi sosial secara paralel; pemetaan '
                  'keahlian dan keterampilan masyarakat; pengembangan platform '
                  'digital dan creative hub'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 24)',
    },
    'SS-LE': {
        'name': 'Smart Society / Learning (Ekosistem Belajar)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Society',
        'topik': ('Perwujudan ekosistem pendidikan formal dan non-formal; '
                  'pengembangan kurikulum; pembentukan e-learning; integrasi program '
                  'merdeka belajar'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 25)',
    },
    'SS-SE': {
        'name': 'Smart Society / Security (Keamanan Masyarakat)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Society',
        'topik': ('Perwujudan sistem atau manajemen keamanan dan keselamatan '
                  'masyarakat; e-parking, CCTV, pemetaan risiko bencana; integrasi '
                  'sistem keamanan kota'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 25)',
    },
    # --- SMART ENVIRONMENT ---
    'SV-PR': {
        'name': 'Smart Environment / Protection (Proteksi Lingkungan)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Environment',
        'topik': ('Pengembangan sistem tata kelola perlindungan air, udara dan '
                  'mengintegrasi dengan teknologi; basis data dan sistem kontrol; '
                  'smart water operation management; identifikasi RTH'),
        'source': 'Panduan P2M ITK 2026, Tabel 3 (hal. 25)',
    },
    'SV-WA': {
        'name': 'Smart Environment / Waste (Pengelolaan Sampah dan Limbah)',
        'center': 'Pusat Penelitian TIK Smart City',
        'theme': 'Smart Environment',
        'topik': ('Pengembangan sistem tata kelola limbah industri dan domestik '
                  'berbasis TI untuk monitoring, pemilahan, daur ulang, komposting, '
                  'serta evaluasi kebijakan dalam kerangka circular economy'),
        'source': 'Panduan P2M ITK 2026, Tabel 1 (hal. 8) & Tabel 3 (hal. 25)',
    },
    # --- Pusat Penelitian LAIN (di luar TIK Smart City) ---
    'PP1-EM': {
        'name': 'Energi Terbarukan / Energy Management and Policy',
        'center': 'Pusat Penelitian Energi Terbarukan',
        'theme': 'Energy management and policy',
        'topik': ('Energy forecasting, energy auditing, optimization for smart grid, '
                  'environmental management; smart monitoring and flow control; '
                  'wind turbine system'),
        'source': 'Panduan P2M ITK 2026, Tabel 1 (hal. 5-6)',
    },
    'PP4-MA': {
        'name': 'Infrastruktur Berkelanjutan / Teknologi Maritim',
        'center': 'Pusat Penelitian Infrastruktur Berkelanjutan dan Teknologi Maritim',
        'theme': 'Teknologi Perlindungan dan Pemanfaatan Sumber Daya Maritim',
        'topik': ('Teknologi pengawasan laut; teknologi pemanfaatan sumber daya laut; '
                  'pengembangan teknologi dan manajemen pulau-pulau kecil dan pesisir'),
        'source': 'Panduan P2M ITK 2026, Tabel 1 (hal. 6)',
    },
    'PP5-K3': {
        'name': 'Manufaktur dan Industri Ramah Lingkungan / Tata Kelola Industri dan K3L',
        'center': 'Pusat Penelitian Manufaktur dan Industri Ramah Lingkungan',
        'theme': 'Tata Kelola Industri dan K3L',
        'topik': ('Analisis kebijakan K3L; analisis risiko kecelakaan industri; sistem '
                  'monitoring K3 berbasis sensor; evaluasi K3L pada industri'),
        'source': 'Panduan P2M ITK 2026, Tabel 1 (hal. 10)',
    },
}

ITK_RULES = [
    ('SG-PS', 3, ['PELAYANAN ADMINISTRASI', 'UNIT LAYANAN TERPADU',
                  'PELAYANAN SATU PINTU', 'LAYANAN MASYARAKAT', 'PERIZINAN',
                  'DPMPTSP', 'KELURAHAN', 'SILURAH', 'LIVABLE HOME',
                  'PENDAFTARAN SANTRI', 'SIMPAS', 'SIMLAB', 'PUSAT LAYANAN HUKUM',
                  'PENELITIAN DAN PENGABDIAN MASYARAKAT', 'SISTEM INFORMASI PROFIL',
                  'COMPANY PROFILE PEMERINTAHAN']),
    ('SG-BR', 3, ['CUTI PEGAWAI', 'EMPLOYEE INFORMATION SYSTEM', 'APPROVAL WORKFLOW',
                  'PROSES BISNIS', 'BUSINESS PROCESS', 'TATA KELOLA TEKNOLOGI INFORMASI',
                  'COBIT', 'TOGAF', 'ARSITEKTUR SISTEM', 'MANAJEMEN RISIKO',
                  'ISO 31000', 'DATA CENTER', 'DISASTER RECOVERY',
                  'JUSTIFIKASI TEKNIS', 'E-READINESS', 'KRIPTOSISTEM',
                  'KEAMANAN DATA']),
    ('SG-PP', 3, ['TRANSPARANSI', 'TJSLP', 'PAJAK DAERAH', 'KEBIJAKAN PUBLIK',
                  'DATA TERBUKA']),

    ('SB-TO', 3, ['PARIWISATA', 'FESTIVAL', 'CULTURAL TOURISM', 'KEBUN RAYA',
                  'HERBARIUM', 'VIRTUAL TOUR']),
    ('SB-TO', 2, ['METAVERSE', 'DIGITAL TWIN']),
    ('SB-BB', 3, ['E-COMMERCE', 'MARKETPLACE', 'MARKET PLACE']),
    ('SE-WE', 3, ['UMKM', 'PEMBERDAYAAN EKONOMI', 'ANGKATAN KERJA']),
    ('SE-TR', 3, ['MOBILE PAYMENT', 'FINANCIAL TECHNOLOGY', 'QRIS', 'E-MONEY',
                  'TRANSAKSI KEUANGAN']),

    ('SL-HE', 3, ['KESEHATAN', 'KLINIK', 'GIZI', 'BALITA', 'POSTPARTUM',
                  'REKAM MEDIS', 'KEMATIAN IBU', 'KESEHATAN MENTAL']),
    ('SL-HA', 3, ['TATA RUANG', 'PEMETAAN KAWASAN', 'RUANG TERBUKA HIJAU']),
    ('SL-BU', 2, ['SMART HOME', 'SENSOR BANGUNAN', 'BANGUNAN EFISIEN']),

    ('SS-LE', 3, ['PEMBELAJARAN', 'BELAJAR MENGAJAR', 'LEARNING MANAGEMENT',
                  'E-LEARNING', 'SEKOLAH', 'SMART-SCHOOL', 'SIAKAD', 'AKADEMIK',
                  'TUGAS AKHIR', 'GAMIFICATION', 'MEDIA PEMBELAJARAN',
                  'ADAPTIVE LEARNING', 'PESERTA DIDIK', 'LITERASI', 'DISABILITAS',
                  'DISCRETE TRIAL TRAINING', 'SISTEM INFORMASI COURSE',
                  'PERPUSTAKAAN', 'SMART LIBRARY', 'BEL SEKOLAH', 'SIMSIS',
                  'PUBLISHING APPS', 'PENDIDIKAN', 'PENJADWALAN']),
    ('SS-CO', 2, ['SMART SOCIETY', 'INTERAKSI SOSIAL', 'KETERAMPILAN MASYARAKAT']),
    ('SS-SE', 3, ['KESELAMATAN', 'KEBAKARAN', 'E-PARKING', 'CCTV',
                  'RISIKO BENCANA', 'KESELAMATAN BERKENDARA', 'PEMANTAUAN KESELAMATAN']),

    ('SV-PR', 3, ['KUALITAS UDARA', 'KUALITAS AIR', 'POLUSI', 'PERLINDUNGAN AIR']),
    ('SV-WA', 3, ['SAMPAH', 'TPS 3R', 'TEMPAT PEMBUANGAN AKHIR', 'LIMBAH',
                  'KOMPOS']),

    ('PP1-EM', 3, ['ENERGI LISTRIK', 'ENERGI HIJAU', 'TURBIN ANGIN', 'ELECTRICITY',
                   'SAKELAR LISTRIK', 'SAKLAR LISTRIK', 'MONITORING DATA ENERGI']),
    ('PP4-MA', 3, ['BATIMETRI', 'KEDALAMAN LAUT', 'PESISIR']),
    ('PP5-K3', 3, ['KEBISINGAN', 'K3L', 'KESELAMATAN KERJA', 'LAMA PAPARAN']),
]


REFERENCES = {
    'FSTI': {
        'key': 'FSTI',
        'label': 'Roadmap Fakultas (FSTI)',
        'outputFile': 'roadmap_mapping.json',
        'categoryLabel': 'Pilar Strategis',
        'reference': 'Roadmap Penelitian, PkM, dan Renstra FSTI ITK 2025-2029',
        'referenceDoc': 'Roadmap_FSTI.pdf, Bab 4 (hal. 9-11)',
        'scope': ('Acuan tingkat FAKULTAS. Pembagian pilarnya berbeda dengan roadmap '
                  'tingkat institut, sehingga angka pada acuan ini tidak dapat '
                  'dibandingkan langsung dengan angka pada acuan ITK.'),
        'keywordBasis': ('Dokumen roadmap fakultas hanya memuat uraian tiap pilar dan '
                         'peran masing-masing program studi; dokumen ini TIDAK memuat '
                         'daftar topik penelitian. Karena itu kata kunci yang dipakai '
                         'untuk memetakan disusun sendiri oleh program studi dengan '
                         'menurunkan uraian tersebut, jadi bukan kutipan dari dokumen.'),
        'categories': FSTI_CATEGORIES,
        'rules': FSTI_RULES,
    },
    'ITK': {
        'key': 'ITK',
        'label': 'Roadmap Institut (ITK)',
        'outputFile': 'roadmap_mapping_itk.json',
        'categoryLabel': 'Sub Tema Fokus Riset',
        'reference': 'Panduan Penelitian dan Pengabdian kepada Masyarakat ITK Edisi X 2026',
        'referenceDoc': ('Panduan P2M ITK Edisi X 2026, Bab 1.1 Fokus Riset Penelitian '
                         'Institut - Tabel 1 (hal. 5-11) dan Tabel 3 Roadmap Pusat '
                         'Penelitian TIK Smart City (hal. 20-25)'),
        'scope': ('Acuan tingkat INSTITUT. Judul dipetakan sampai tingkat Sub Tema di '
                  'bawah masing-masing Pusat Penelitian, sehingga lebih rinci '
                  'daripada acuan fakultas.'),
        'keywordBasis': ('Panduan ITK mencantumkan daftar topik penelitian untuk setiap '
                         'sub tema. Kata kunci yang dipakai untuk memetakan diambil '
                         'langsung dari daftar topik tersebut, dan setiap kategori '
                         'mencantumkan nomor tabel serta halaman panduannya sehingga '
                         'dapat dicek langsung ke dokumen aslinya.'),
        'categories': ITK_CATEGORIES,
        'rules': ITK_RULES,
    },
}
