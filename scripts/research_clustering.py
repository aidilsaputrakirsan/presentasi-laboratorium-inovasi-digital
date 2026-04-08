"""
Research Topic Clustering using TF-IDF + K-Means
=================================================
Script untuk mengelompokkan penelitian berdasarkan kemiripan topik
menggunakan TF-IDF vectorization dan K-Means clustering.

Tujuan:
- Identifikasi tema/topik penelitian yang mirip
- Mendeteksi potensi kolaborasi lintas prodi (SI + Bisdig)
- Menghasilkan cluster data untuk visualisasi
- Dipisah antara Penelitian dan Pengabdian

Output: clusters_data.json
"""

import json
import os
import re
from datetime import datetime
from collections import Counter

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Konfigurasi
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODI_DIR = os.path.join(BASE_DIR, 'src', 'data', 'prodi')

# Indonesian stopwords — kata generik, kata sifat umum, kata tempat, kata kerja proses
STOPWORDS_ID = {
    # Kata sambung / kata depan
    'dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'dengan', 'yang',
    'adalah', 'ini', 'itu', 'atau', 'dalam', 'sebagai', 'oleh',
    'akan', 'juga', 'dapat', 'bisa', 'ada', 'tidak', 'telah',
    'serta', 'jika', 'agar', 'karena', 'namun', 'tetapi', 'maka',
    'suatu', 'sebuah', 'setiap', 'para', 'bagi', 'antara', 'saat',

    # Kata kerja proses / metodologi generik
    'menggunakan', 'berbasis', 'metode', 'analisis', 'studi', 'kasus',
    'implementasi', 'pengembangan', 'perancangan', 'rancang', 'bangun',
    'penerapan', 'evaluasi', 'peningkatan', 'pemberdayaan', 'pengelolaan',
    'pelaksanaan', 'penyuluhan', 'sosialisasi', 'pendampingan', 'pelatihan',
    'pembuatan', 'pemilihan', 'pemantauan', 'pengukuran', 'pengolahan',
    'pengenalan', 'penentuan', 'pendekatan', 'pemetaan', 'perbandingan',
    'melalui', 'terhadap', 'upaya', 'proses', 'hasil', 'faktor',
    'pemanfaatan', 'penerapan', 'optimalisasi', 'optimasi',

    # Kata benda generik
    'sistem', 'informasi', 'aplikasi', 'data', 'model', 'platform',
    'teknologi', 'digital', 'layanan', 'program', 'kegiatan',
    'masyarakat', 'kelompok', 'warga', 'mahasiswa', 'dosen', 'siswa',
    'sekolah', 'kampus', 'universitas', 'Institut', 'perguruan', 'tinggi',
    'ibu', 'anak', 'wanita', 'pria', 'lansia', 'remaja', 'umkm', 'usaha',
    'tani', 'petani', 'nelayan', 'pedagang', 'karyawan', 'tenaga',

    # Kata tempat / wilayah
    'balikpapan', 'kalimantan', 'timur', 'kelurahan', 'kota', 'desa',
    'kabupaten', 'provinsi', 'wilayah', 'daerah', 'rt', 'rw', 'indonesia',
    'nasional', 'lokal', 'regional', 'internasional', 'global',

    # Kata sifat generik
    'berbasis', 'cerdas', 'efisien', 'efektif', 'optimal', 'baik',
    'tinggi', 'rendah', 'baru', 'lama', 'modern', 'tradisional',
    'potensi', 'potensial', 'kualitas', 'kuantitas', 'tingkat',

    # English stopwords
    'the', 'of', 'and', 'in', 'for', 'to', 'a', 'an', 'on', 'with',
    'using', 'based', 'system', 'information', 'method', 'analysis',
    'case', 'study', 'implementation', 'development', 'design',
    'application', 'approach', 'model', 'data', 'process', 'toward',
    'through', 'its', 'at', 'by', 'from', 'as', 'is', 'are',
}

def get_prodi_folders():
    """Scan prodi directory for folders with sinta_data.json"""
    prodi_folders = []
    if not os.path.exists(PRODI_DIR):
        print(f"Error: {PRODI_DIR} not found.")
        return prodi_folders
    for slug in os.listdir(PRODI_DIR):
        sinta_file = os.path.join(PRODI_DIR, slug, 'sinta_data.json')
        if os.path.isdir(os.path.join(PRODI_DIR, slug)) and os.path.exists(sinta_file):
            prodi_folders.append(slug)
    return sorted(prodi_folders)

def load_sinta_data(prodi_slug):
    """Load data dari per-prodi sinta_data.json"""
    sinta_file = os.path.join(PRODI_DIR, prodi_slug, 'sinta_data.json')
    with open(sinta_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_research_items(sinta_data):
    """
    Extract semua item penelitian dan pengabdian dari semua dosen.
    Returns dict dengan key 'penelitian' dan 'pengabdian'.
    """
    penelitian = []
    pengabdian = []

    for lecturer in sinta_data.get('lecturers', []):
        name = lecturer.get('name', 'Unknown')
        prodi = lecturer.get('prodi', 'Unknown')

        for research in lecturer.get('research', []):
            title = research.get('title', '')
            if title and len(title) > 10:
                penelitian.append({
                    'title': title,
                    'author': name,
                    'prodi': prodi,
                    'type': 'Penelitian',
                    'year': research.get('year', '')
                })

        for service in lecturer.get('services', []):
            title = service.get('title', '')
            if title and len(title) > 10:
                pengabdian.append({
                    'title': title,
                    'author': name,
                    'prodi': prodi,
                    'type': 'Pengabdian',
                    'year': service.get('year', '')
                })

    return {'penelitian': penelitian, 'pengabdian': pengabdian}

def preprocess_text(text):
    """
    Preprocessing teks:
    - Lowercase
    - Remove special characters
    - Remove stopwords
    """
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    words = text.split()
    words = [w for w in words if w not in STOPWORDS_ID and len(w) > 2]
    return ' '.join(words)

def find_optimal_clusters(X, min_k=3, max_k=12):
    """Find optimal number of clusters using silhouette score."""
    best_k = min_k
    best_score = -1
    max_k = min(max_k, X.shape[0] - 1)
    if max_k < min_k:
        return min_k
    for k in range(min_k, max_k + 1):
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = kmeans.fit_predict(X)
        if len(set(labels)) > 1:
            score = silhouette_score(X, labels)
            if score > best_score:
                best_score = score
                best_k = k
    print(f"  Optimal clusters: {best_k} (silhouette: {best_score:.3f})")
    return best_k

def extract_cluster_keywords(tfidf_matrix, labels, vectorizer, n_keywords=5):
    """
    Extract top keywords per cluster menggunakan TF-IDF centroid score
    (lebih akurat dibanding word frequency biasa).
    Hasilnya lebih relevan secara topik (misal: 'smart city', 'machine learning').
    """
    feature_names = vectorizer.get_feature_names_out()
    cluster_keywords = {}

    for cluster_id in set(labels):
        # Ambil baris TF-IDF untuk cluster ini
        mask = np.array(labels) == cluster_id
        cluster_matrix = tfidf_matrix[mask]

        # Hitung rata-rata TF-IDF score per term di cluster ini
        mean_tfidf = np.asarray(cluster_matrix.mean(axis=0)).flatten()

        # Ambil top-N term dengan score tertinggi
        top_indices = mean_tfidf.argsort()[::-1][:n_keywords]
        top_keywords = [feature_names[i] for i in top_indices if mean_tfidf[i] > 0]

        cluster_keywords[cluster_id] = top_keywords

    return cluster_keywords

def generate_cluster_name(keywords):
    """
    Generate cluster name dari keywords.
    Prioritaskan bigrams, buang unigrams yang sudah terkandung di dalam bigram
    agar tidak redundan (misal: 'smart', 'smart city', 'city' → hanya 'Smart City').
    """
    if not keywords:
        return "Topik Umum"

    bigrams  = [kw for kw in keywords if ' ' in kw]
    unigrams = [kw for kw in keywords if ' ' not in kw]

    # Kata-kata yang sudah tercakup di bigram → tidak perlu ditampilkan lagi
    bigram_words = set()
    for bg in bigrams:
        bigram_words.update(bg.split())

    filtered_unigrams = [u for u in unigrams if u not in bigram_words]

    # Prioritas: bigram dulu, lalu unigram unik, maks 3 bagian
    name_parts = (bigrams + filtered_unigrams)[:3]
    name_parts = [kw.replace('_', ' ').title() for kw in name_parts]

    return " & ".join(name_parts) if name_parts else "Topik Umum"

def run_clustering(items, label, n_clusters=None):
    """
    Main clustering function using TF-IDF + K-Means.
    """
    if len(items) < 5:
        print(f"  Not enough items for {label} clustering ({len(items)} items)")
        return None

    processed_titles = [preprocess_text(item['title']) for item in items]
    valid_indices = [i for i, t in enumerate(processed_titles) if len(t.strip()) > 0]
    processed_titles = [processed_titles[i] for i in valid_indices]
    items = [items[i] for i in valid_indices]

    if len(items) < 5:
        print(f"  Not enough valid items after preprocessing for {label}")
        return None

    print(f"  Processing {len(items)} {label} items...")

    vectorizer = TfidfVectorizer(
        max_features=500,
        min_df=1,
        max_df=0.9,
        ngram_range=(1, 2)  # Unigrams + bigrams agar dapat "smart city", "machine learning", dll
    )

    tfidf_matrix = vectorizer.fit_transform(processed_titles)
    print(f"  TF-IDF matrix: {tfidf_matrix.shape}")

    if n_clusters is None:
        n_clusters = find_optimal_clusters(tfidf_matrix, min_k=3, max_k=10)

    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    labels = kmeans.fit_predict(tfidf_matrix)

    cluster_keywords = extract_cluster_keywords(tfidf_matrix, labels, vectorizer)

    clusters = {}
    for cluster_id in range(n_clusters):
        cluster_items = []
        prodis = set()
        authors = set()

        for i, lbl in enumerate(labels):
            if lbl == cluster_id:
                cluster_items.append({
                    'title': items[i]['title'],
                    'author': items[i]['author'],
                    'prodi': items[i]['prodi'],
                    'type': items[i]['type'],
                    'year': items[i]['year']
                })
                prodis.add(items[i]['prodi'])
                authors.add(items[i]['author'])

        is_cross_prodi = len(prodis) > 1

        clusters[str(cluster_id)] = {
            'id': cluster_id,
            'name': generate_cluster_name(cluster_keywords.get(cluster_id, [])),
            'keywords': cluster_keywords.get(cluster_id, []),
            'items': cluster_items,
            'count': len(cluster_items),
            'prodis': list(prodis),
            'authors': list(authors),
            'isCrossProdi': is_cross_prodi,
            'collaborationPotential': 'high' if is_cross_prodi and len(authors) > 2 else 'medium' if is_cross_prodi else 'low'
        }

    return clusters

def cluster_prodi(prodi_slug):
    """Run clustering for a single prodi — terpisah Penelitian & Pengabdian"""
    print(f"\n  Loading SINTA data for {prodi_slug}...")
    sinta_data = load_sinta_data(prodi_slug)

    print("  Extracting items...")
    items_by_type = extract_research_items(sinta_data)
    penelitian_items = items_by_type['penelitian']
    pengabdian_items = items_by_type['pengabdian']
    print(f"  Found {len(penelitian_items)} penelitian, {len(pengabdian_items)} pengabdian")

    print("\n  --- Clustering PENELITIAN ---")
    clusters_penelitian = run_clustering(penelitian_items, 'Penelitian')

    print("\n  --- Clustering PENGABDIAN ---")
    clusters_pengabdian = run_clustering(pengabdian_items, 'Pengabdian')

    if clusters_penelitian is None and clusters_pengabdian is None:
        print("  Clustering failed (not enough data for both types)")
        return

    def make_summary(clusters):
        if not clusters:
            return {'crossProdiCount': 0, 'highPotentialCount': 0, 'topClusters': []}
        return {
            'crossProdiCount': sum(1 for c in clusters.values() if c['isCrossProdi']),
            'highPotentialCount': sum(1 for c in clusters.values() if c['collaborationPotential'] == 'high'),
            'topClusters': sorted(
                [{'id': c['id'], 'name': c['name'], 'count': c['count']} for c in clusters.values()],
                key=lambda x: x['count'],
                reverse=True
            )[:5]
        }

    output_data = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'algorithm': 'TF-IDF + K-Means',
            'totalPenelitian': len(penelitian_items),
            'totalPengabdian': len(pengabdian_items),
            'totalItems': len(penelitian_items) + len(pengabdian_items),
            'totalClusters': (len(clusters_penelitian) if clusters_penelitian else 0) +
                             (len(clusters_pengabdian) if clusters_pengabdian else 0),
        },
        'clusters': {
            'penelitian': clusters_penelitian or {},
            'pengabdian': clusters_pengabdian or {}
        },
        'summary': {
            'penelitian': make_summary(clusters_penelitian),
            'pengabdian': make_summary(clusters_pengabdian),
        }
    }

    output_file = os.path.join(PRODI_DIR, prodi_slug, 'clusters_data.json')
    print(f"\n  Saving to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"  Penelitian clusters : {len(clusters_penelitian) if clusters_penelitian else 0}")
    print(f"  Pengabdian clusters : {len(clusters_pengabdian) if clusters_pengabdian else 0}")


def main():
    import sys

    prodi_folders = get_prodi_folders()
    if not prodi_folders:
        print("No prodi folders with sinta_data.json found!")
        return

    target = sys.argv[1] if len(sys.argv) > 1 else None
    if target:
        if target not in prodi_folders:
            print(f"Error: '{target}' not found. Available: {', '.join(prodi_folders)}")
            return
        prodi_folders = [target]

    print("=" * 60)
    print("Research Topic Clustering - TF-IDF + K-Means (Per Prodi)")
    print(f"Target: {', '.join(prodi_folders)}")
    print("=" * 60)

    for slug in prodi_folders:
        print(f"\n{'='*40}")
        print(f"Clustering: {slug}")
        print(f"{'='*40}")
        cluster_prodi(slug)

    print("\nDONE!")

if __name__ == "__main__":
    main()
