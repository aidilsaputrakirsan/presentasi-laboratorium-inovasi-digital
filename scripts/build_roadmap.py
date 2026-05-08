"""
Build roadmap_data.json — Research Topic Evolution (AI Curated)
================================================================
Generate roadmap_data.json yang menunjukkan evolusi topik penelitian dan
pengabdian dosen dari tahun ke tahun.

Pengelompokan topik, narasi observasi, fase evolusi, dan rekomendasi
strategis dilakukan oleh agen AI Claude Opus (Anthropic) — model penalaran
tingkat tinggi yang membaca seluruh judul karya 2018-2025 dan menyimpulkan
benang merah riset lab. TIDAK menggunakan algoritma TF-IDF atau ekstraksi
keyword statistik.

Output schema kompatibel dengan ResearchRoadmap.vue (Sankey diagram).

Usage:
  python scripts/build_roadmap.py
"""

import json
import os
import re
import sys
from datetime import datetime
from collections import defaultdict

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODI_DIR = os.path.join(BASE_DIR, 'src', 'data', 'prodi')
SHARED_DIR = os.path.join(BASE_DIR, 'src', 'data', 'shared')
OUTPUT_FILE = os.path.join(SHARED_DIR, 'roadmap_data.json')

YEAR_MIN, YEAR_MAX = 2018, 2026

AI_AGENT = {
    'name': 'Claude Opus 4.7',
    'provider': 'Anthropic',
    'role': 'High-level reasoning agent',
    'task': 'Topic evolution synthesis and strategic narrative',
}


# =====================================================================
# RESEARCH PHASES — Curated by AI agent
# =====================================================================
PHASES = [
    {
        'years': [2018, 2019],
        'name': 'Fondasi',
        'narrative': 'Periode awal lab — riset eksploratif data analytics, rekayasa SI dasar untuk perguruan tinggi & pemerintah daerah, dan pengabdian masyarakat berbasis komunitas.',
    },
    {
        'years': [2020, 2021],
        'name': 'Pembangunan Institusional',
        'narrative': 'Konsolidasi tata kelola TI ITK (TOGAF, COBIT, SIMPAS LPPM). AI/ML mulai muncul sebagai topik fondasional. Pengabdian fokus ke edukasi anak dan adaptasi pembelajaran daring saat pandemi.',
    },
    {
        'years': [2022, 2023],
        'name': 'Era Smart',
        'narrative': 'Eksplosi topik "smart" — Smart Home/IoT, Smart City, Smart School. UMKM digital, klasterisasi wilayah, dan pengabdian terstruktur ke RT/kawasan wisata mulai menjadi pola tetap.',
    },
    {
        'years': [2024, 2025, 2026],
        'name': 'Maturity & IKN-Driven',
        'narrative': 'Kapasitas riset matang dengan fokus strategis Pembangunan IKN — riset terapan, kolaborasi lintas prodi yang stabil, dan ekosistem pengabdian yang siap di-replikasi.',
    },
]


# =====================================================================
# TOPICS — Curated by AI agent (Claude Opus)
# =====================================================================
TOPICS = [
    {
        'id': 1,
        'name': 'Tata Kelola SI Kampus',
        'color': '#3b82f6',  # blue
        'narrative': 'Backbone riset lab — sistem informasi internal ITK (akademik, tata kelola TI, dukungan LPPM). Bertumbuh konsisten dengan kebutuhan kampus.',
        'recommendation': 'Konsolidasi sebagai produk "Ekosistem Digital ITK" yang dapat di-scale ke kampus lain di Kalimantan.',
        'patterns': [
            'manajemen tugas akhir', 'simlab', 'unit layanan terpadu', 'pelayanan administrasi',
            'pengajuan cuti', 'pusat layanan hukum', 'data center', 'disaster recovery',
            'simpas lppm', 'tridharma', 'cobit', 'togaf', 'siakad', 'penjadwalan',
            'sistem informasi penelitian dan pengabdian', 'arsitektur sistem',
            'pemerintah kota', 'company profile pemerintahan', 'opd',
        ],
    },
    {
        'id': 2,
        'name': 'Smart City & IKN',
        'color': '#8b5cf6',  # violet
        'narrative': 'Topik strategis lintas prodi — kombinasi infrastruktur teknis (kualitas lingkungan, klasterisasi wilayah) dan analisis kebijakan/preferensi masyarakat. Tumbuh dramatis sejak 2023 sejalan pembangunan IKN.',
        'recommendation': 'Bentuk konsorsium SI+BD untuk pengusulan hibah riset terapan IKN — momentum tertinggi saat ini.',
        'patterns': [
            'smart city', 'simsis', 'kota penyangga', 'tjslp', 'tanggung jawab sosial',
            'kualitas udara', 'kualitas air', 'klasterisasi', 'e-readiness', 'penajam paser',
            'pendapatan pajak', 'pembuangan sampah', 'bontang', 'forecasting ketercukupan',
            'kawasan ikn', 'preferensi penduduk', 'pemilihan hunian', 'garis pantai',
            'pesisir ikn', 'air bersih', 'grey water', 'limbah domestik',
            'stasiun penukaran baterai', 'sepeda motor listrik',
        ],
    },
    {
        'id': 3,
        'name': 'Smart Home & IoT Energi',
        'color': '#10b981',  # emerald
        'narrative': 'Konsentrasi pada IoT untuk monitoring energi listrik, deteksi kebakaran, dan otomasi domestik. Tim kecil tapi konsisten dengan publikasi kualitas.',
        'recommendation': 'Angkat ke produk komersial — kerjasama dengan PLN atau startup energi untuk pilot project di hunian IKN.',
        'patterns': [
            'smart home', 'saklar listrik', 'sakelar listrik', 'deteksi dini kebakaran',
            'sistem bel sekolah', 'sustainable electricity', 'monitoring data energi',
            'auto feeder',
        ],
    },
    {
        'id': 4,
        'name': 'AI/ML untuk Sains',
        'color': '#f59e0b',  # amber
        'narrative': 'Riset fondasional algoritma — deep learning, fuzzy logic, metaheuristik untuk masalah sains terapan (kelautan, kesehatan, optimasi).',
        'recommendation': 'Daya saing internasional tinggi — dorong publikasi Q1/Q2 dan kolaborasi dengan AI ethics di BD.',
        'patterns': [
            'interpretable deep learning', 'metaheuristik', 'adaptive mesh', 'svm',
            'support vector machine', 'fuzzy logic', 'fuzzy rule', 'artificial neural network',
            'data mining', 'klasifikasi status gizi', 'logika fuzzy',
            'klasifikasi emosi teks', 'isu privasi', 'manajemen proses bisnis',
            'kecerdasan buatan', 'artificial intelligence',
        ],
    },
    {
        'id': 5,
        'name': 'Pembelajaran Adaptif & Edukasi Digital',
        'color': '#ec4899',  # pink
        'narrative': 'Penelitian + pengabdian edukasi — adaptive learning, gamification, smart school IKN, lab metaverse, hingga pelatihan koding anak SD/SMP. Pola kerja yang sangat konsisten.',
        'recommendation': 'Sinergi antara riset (smart classroom IKN) dan pengabdian (sekolah binaan) untuk dampak yang reinforcing.',
        'patterns': [
            'adaptive learning', 'media pembelajaran', 'gamification', 'gamifikasi',
            'smart-school', 'smart school', 'learning management', 'technology acceptance',
            'personal extreme programming', 'proses belajar mengajar', 'metaverse',
            'lab terpadu', 'publishing apps', 'smart society', 'literasi modified',
            'sdn', 'al azhar', 'pesantren koding', 'mit app inventor',
            'pelatihan pemrograman', 'aplikasi scratch', 'kelas digital', 'try out',
            'perpustakaan berbasis web', 'internet sehat', 'pembelajaran daring',
            'edukasi penggunaan internet', 'rpg berbasis android', 'pengajaran anak',
        ],
    },
    {
        'id': 6,
        'name': 'UMKM, E-Commerce & Digital Marketing',
        'color': '#ef4444',  # red
        'narrative': 'Tema ekonomi digital — riset adopsi e-commerce/fintech UMKM (SI), manajemen UMKM dengan predictive analytics (BD), plus pengabdian pemasaran digital UMKM lintas tahun.',
        'recommendation': 'Bentuk Pusat UMKM Digital ITK formal yang menggabungkan output 3 cluster ini — duplikasi tinggi tapi dampak gabungan luar biasa.',
        'patterns': [
            'e-commerce', 'mobile payment', 'financial technology', 'fintech',
            'continuance intention', 'smart economy',
            'umkm', 'industri mikro', 'sistem stok gudang', 'manajemen stok gudang',
            'predictive analytics untuk usaha mikro', 'bimbingan penjualan',
            'pemilihan produk umkm', 'inkubator bisnis', 'pembiayaan umkm',
            'digital marketing', 'pemasaran digital', 'pelatihan pemasaran',
            'pemasaran produk', 'platform digital', 'batik', 'pepaya',
            'pemasaran hasil', 'olahan jambu', 'urban farming',
            'kewirausahaan berbasis mikro', 'inkubasi global',
            'pemberdayaan pencinta anggrek', 'kelompok usaha bersama', 'sablon',
            'pasar bangun reksa', 'redesign packaging', 'koperasi sebagai mitra',
            'kewirausahaan', 'startup', 'cyberloafing', 'social commerce',
            'lean six sigma', 'industri oleh-oleh',
            'mall', 'produk halal', 'wisata kuliner', 'destinasi kuliner',
            'aplikasi wisata kuliner', 'eco-friendly', 'pertanian di kalimantan',
            'daging sapi', 'distribusi multi-produk', 'multi-eselon',
            'heavy equipment leasing', 'coretax', 'wajib pajak',
            'badan layanan umum', 'proyeksi kebijakan',
        ],
    },
    {
        'id': 7,
        'name': 'Lingkungan & Pertanian Berkelanjutan',
        'color': '#14b8a6',  # teal
        'narrative': 'Pengabdian terapan — bank sampah, akuaponik, urban farming, pengolahan limbah pertanian. Output praktis yang menyentuh kebutuhan lingkungan urban Balikpapan.',
        'recommendation': 'Konversi best practice ini menjadi paket replikasi standar untuk kota lain Kaltim — pendanaan KLHK potensial.',
        'patterns': [
            'bank sampah', 'pengelolaan sampah', 'pengolahan sampah', 'biopori',
            'desa digital peduli sampah', 'urban farming dan pengelolaan sampah',
            'kelompok tani', 'kelompok wanita tani', 'akuaponik', 'budikdamber',
            'budidaya ikan lele', 'pupuk organik', 'jambu kristal', 'kebun melon',
            'rainwater harvesting', 'biogas', 'hidroponik', 'limbah pertanian',
            'kangkung', 'urban farming', 'singkong', 'olahan buah brownies mangrove',
            'aquaponik berbasis internet of things', 'turbin angin', 'savonius',
            'aditif manufakturing', 'kompos', 'limbah baglog', 'mol nasi basi',
        ],
    },
    {
        'id': 8,
        'name': 'Wisata Digital & Smart RT',
        'color': '#0ea5e9',  # sky
        'narrative': 'Pengabdian branding kawasan + digitalisasi RT/kelurahan — ekosistem mitra binaan yang sudah stabil dan berkembang.',
        'recommendation': 'Buat platform wisata Balikpapan terpadu + paket Smart RT ITK yang siap deploy ke RT mana pun.',
        'patterns': [
            'wisata', 'mangrove', 'meranti', 'sungai wain', 'tanjung gading',
            'kampung e-sport', 'kampung kang', 'bamboe wanadesa', 'hutan kota',
            'kawasan kuliner', 'destinasi', 'permodelan 3d',
            'tourism in teritip', 'kampung wisata', 'celosia garden',
            'smart rt', 'kelurahan margo mulyo', 'graha indah', 'muara rapak',
            'website dashboard', 'pembangunan website dashboard', 'digitalisasi layanan',
            'rumah warna-warni', 'telaga sari', 'gantion',
            'administrasi rt', 'pengelolaan data warga', 'ppks', 'pendataan warga',
            'website serta program edukasi rt',
            'masjid berkah', 'yayasan berkah', 'sistem pendataan donasi',
            'silurah', 'kelurahan', 'livable home', 'pelayanan satu pintu',
            'iconix process', 'pariwisata berbasis', 'pendaftaran santri',
            'layanan masyarakat', 'sistem informasi pengajian',
            'pemodelan proses bisnis', 'bizagi', 'optimalisasi teknologi',
            'pemberdayaan masyarakat baru', 'penataan kawasan pemukiman',
            'penyandang disabilitas', 'ppdi', 'gotong royong',
        ],
    },
]


def assign_topic(title):
    """Match a title to first topic whose pattern matches."""
    t = title.lower()
    for topic in TOPICS:
        for pat in topic['patterns']:
            if pat.lower() in t:
                return topic
    return None


def collect_items():
    """Read all research + service items from sinta_data.json files."""
    items = []
    for slug in os.listdir(PRODI_DIR):
        sinta_path = os.path.join(PRODI_DIR, slug, 'sinta_data.json')
        if not os.path.isfile(sinta_path):
            continue
        with open(sinta_path, encoding='utf-8') as f:
            data = json.load(f)
        for lec in data.get('lecturers', []):
            for r in lec.get('research', []):
                items.append({
                    'title': r.get('title', ''),
                    'year': _parse_year(r.get('year')),
                    'type': 'Penelitian',
                })
            for s in lec.get('services', []):
                items.append({
                    'title': s.get('title', ''),
                    'year': _parse_year(s.get('year')),
                    'type': 'Pengabdian',
                })
    return items


def _parse_year(y):
    if not y:
        return None
    m = re.search(r'\d{4}', str(y))
    if m:
        yi = int(m.group(0))
        if YEAR_MIN <= yi <= YEAR_MAX:
            return yi
    return None


def build_topic_year_buckets(items):
    """topic_id -> year -> list of unique titles."""
    buckets = defaultdict(lambda: defaultdict(set))
    overall_year = defaultdict(set)
    for it in items:
        if not it['year'] or not it['title']:
            continue
        topic = assign_topic(it['title'])
        if topic:
            buckets[topic['id']][it['year']].add(it['title'])
        overall_year[it['year']].add(it['title'])
    return buckets, overall_year


def build_sankey(buckets):
    """Build sankey nodes/links from topic-year buckets.

    Each (topic, year) where topic is active becomes a node.
    Links connect a topic across consecutive active years.
    """
    nodes = []
    links = []
    node_index = {}  # (topic_id, year) -> name

    # Collect all years per topic
    topic_year_map = {}
    for topic in TOPICS:
        years_active = sorted(buckets.get(topic['id'], {}).keys())
        if not years_active:
            continue
        topic_year_map[topic['id']] = years_active

    # Build nodes (one per topic-year)
    for topic in TOPICS:
        years = topic_year_map.get(topic['id'], [])
        for y in years:
            titles = sorted(buckets[topic['id']][y])
            count = len(titles)
            name = f"{topic['name']} ({y})"
            node_index[(topic['id'], y)] = name
            nodes.append({
                'name': name,
                'topic_id': topic['id'],
                'topic_name': topic['name'],
                'color': topic['color'],
                'year': y,
                'depth': y - YEAR_MIN,  # for ECharts Sankey x-position
                'value': count,
                'real_count': count,
                'titles': titles,
            })

    # Build links — connect each topic across consecutive active years
    for topic_id, years in topic_year_map.items():
        for a, b in zip(years[:-1], years[1:]):
            src = node_index.get((topic_id, a))
            dst = node_index.get((topic_id, b))
            if src and dst:
                a_count = len(buckets[topic_id][a])
                b_count = len(buckets[topic_id][b])
                links.append({
                    'source': src,
                    'target': dst,
                    'value': min(a_count, b_count) or 1,
                })

    return nodes, links


def main():
    items = collect_items()
    print(f'Total items: {len(items)}')

    buckets, overall_year = build_topic_year_buckets(items)
    nodes, links = build_sankey(buckets)
    print(f'Nodes: {len(nodes)}, Links: {len(links)}')

    # Per-topic summary
    topics_out = []
    for topic in TOPICS:
        per_year = buckets.get(topic['id'], {})
        if not per_year:
            continue
        total = sum(len(v) for v in per_year.values())
        peak_year = max(per_year.keys(), key=lambda y: len(per_year[y]))
        topics_out.append({
            'id': topic['id'],
            'name': topic['name'],
            'color': topic['color'],
            'narrative': topic['narrative'],
            'recommendation': topic['recommendation'],
            'active_years': sorted(per_year.keys()),
            'peak_year': peak_year,
            'total_count': total,
        })

    # Timeline (overall counts per year)
    timeline = [
        {'year': y, 'count': len(overall_year[y])}
        for y in sorted(overall_year.keys())
    ]

    out = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'yearRange': f'{YEAR_MIN}-{YEAR_MAX}',
            'curatedBy': AI_AGENT,
            'method': 'Manual topic evolution synthesis by AI agent — no algorithmic keyword extraction',
        },
        'phases': PHASES,
        'topics': topics_out,
        'timeline': timeline,
        'sankey': {
            'nodes': nodes,
            'links': links,
        },
    }

    os.makedirs(SHARED_DIR, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f'Wrote {OUTPUT_FILE}')


if __name__ == '__main__':
    main()
