"""
Research Topic Clustering using TF-IDF + K-Means
=================================================
Script untuk mengelompokkan penelitian berdasarkan kemiripan topik
menggunakan TF-IDF vectorization dan K-Means clustering.

Tujuan:
- Identifikasi tema/topik penelitian yang mirip
- Mendeteksi potensi kolaborasi lintas prodi (SI + Bisdig)
- Menghasilkan cluster data untuk visualisasi

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
SINTA_DATA_FILE = os.path.join(BASE_DIR, 'src', 'data', 'sinta_data.json')
OUTPUT_FILE = os.path.join(BASE_DIR, 'src', 'data', 'clusters_data.json')

# Indonesian stopwords (common words to remove)
STOPWORDS_ID = {
    'dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'dengan', 'yang', 
    'adalah', 'ini', 'itu', 'atau', 'dalam', 'sebagai', 'oleh',
    'akan', 'juga', 'dapat', 'bisa', 'ada', 'tidak', 'telah',
    'menggunakan', 'berbasis', 'sistem', 'informasi', 'metode',
    'analisis', 'studi', 'kasus', 'implementasi', 'pengembangan',
    'perancangan', 'rancang', 'bangun', 'penerapan', 'evaluasi',
    'the', 'of', 'and', 'in', 'for', 'to', 'a', 'an', 'on', 'with',
    'using', 'based', 'system', 'information', 'method', 'analysis',
    'case', 'study', 'implementation', 'development', 'design',
    'application', 'approach', 'model', 'data', 'process'
}

def load_sinta_data():
    """Load data dari sinta_data.json"""
    with open(SINTA_DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_research_items(sinta_data):
    """
    Extract semua item penelitian dan pengabdian dari semua dosen.
    Returns list of dicts dengan title, author, prodi, type.
    """
    items = []
    
    for lecturer in sinta_data.get('lecturers', []):
        name = lecturer.get('name', 'Unknown')
        prodi = lecturer.get('prodi', 'Unknown')
        
        # Penelitian
        for research in lecturer.get('research', []):
            title = research.get('title', '')
            if title and len(title) > 10:
                items.append({
                    'title': title,
                    'author': name,
                    'prodi': prodi,
                    'type': 'Penelitian',
                    'year': research.get('year', '')
                })
        
        # Pengabdian
        for service in lecturer.get('services', []):
            title = service.get('title', '')
            if title and len(title) > 10:
                items.append({
                    'title': title,
                    'author': name,
                    'prodi': prodi,
                    'type': 'Pengabdian',
                    'year': service.get('year', '')
                })
    
    return items

def preprocess_text(text):
    """
    Preprocessing teks:
    - Lowercase
    - Remove special characters
    - Remove stopwords
    """
    # Lowercase
    text = text.lower()
    
    # Remove special characters, keep alphanumeric and spaces
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    
    # Split into words
    words = text.split()
    
    # Remove stopwords and short words
    words = [w for w in words if w not in STOPWORDS_ID and len(w) > 2]
    
    return ' '.join(words)

def find_optimal_clusters(X, min_k=3, max_k=15):
    """
    Find optimal number of clusters using silhouette score.
    """
    best_k = min_k
    best_score = -1
    
    # Limit max_k based on number of samples
    max_k = min(max_k, X.shape[0] - 1)
    
    if max_k < min_k:
        return min_k
    
    for k in range(min_k, max_k + 1):
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = kmeans.fit_predict(X)
        
        # Calculate silhouette score
        if len(set(labels)) > 1:
            score = silhouette_score(X, labels)
            if score > best_score:
                best_score = score
                best_k = k
    
    print(f"Optimal clusters: {best_k} (silhouette score: {best_score:.3f})")
    return best_k

def extract_cluster_keywords(texts, labels, vectorizer, n_keywords=5):
    """
    Extract top keywords untuk setiap cluster.
    """
    feature_names = vectorizer.get_feature_names_out()
    cluster_keywords = {}
    
    for cluster_id in set(labels):
        # Get texts in this cluster
        cluster_texts = [texts[i] for i, label in enumerate(labels) if label == cluster_id]
        
        # Count word frequency in cluster
        all_words = ' '.join(cluster_texts).split()
        word_counts = Counter(all_words)
        
        # Get top keywords
        top_keywords = [word for word, count in word_counts.most_common(n_keywords)]
        cluster_keywords[cluster_id] = top_keywords
    
    return cluster_keywords

def generate_cluster_name(keywords):
    """
    Generate human-readable cluster name from keywords.
    """
    if not keywords:
        return "Topik Umum"
    
    # Capitalize and join top 3 keywords
    name_parts = [kw.capitalize() for kw in keywords[:3]]
    return " & ".join(name_parts)

def run_clustering(items, n_clusters=None):
    """
    Main clustering function using TF-IDF + K-Means.
    """
    if len(items) < 5:
        print("Not enough items for clustering")
        return None
    
    # Preprocess titles
    processed_titles = [preprocess_text(item['title']) for item in items]
    
    # Filter out empty titles after preprocessing
    valid_indices = [i for i, t in enumerate(processed_titles) if len(t.strip()) > 0]
    processed_titles = [processed_titles[i] for i in valid_indices]
    items = [items[i] for i in valid_indices]
    
    if len(items) < 5:
        print("Not enough valid items after preprocessing")
        return None
    
    print(f"Processing {len(items)} research items...")
    
    # TF-IDF Vectorization
    vectorizer = TfidfVectorizer(
        max_features=500,
        min_df=1,
        max_df=0.9,
        ngram_range=(1, 2)  # Unigrams and bigrams
    )
    
    tfidf_matrix = vectorizer.fit_transform(processed_titles)
    print(f"TF-IDF matrix shape: {tfidf_matrix.shape}")
    
    # Find optimal number of clusters if not specified
    if n_clusters is None:
        n_clusters = find_optimal_clusters(tfidf_matrix, min_k=4, max_k=12)
    
    # K-Means Clustering
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    labels = kmeans.fit_predict(tfidf_matrix)
    
    # Extract keywords for each cluster
    cluster_keywords = extract_cluster_keywords(processed_titles, labels, vectorizer)
    
    # Build cluster results
    clusters = {}
    for cluster_id in range(n_clusters):
        cluster_items = []
        prodis = set()
        authors = set()
        
        for i, label in enumerate(labels):
            if label == cluster_id:
                cluster_items.append({
                    'title': items[i]['title'],
                    'author': items[i]['author'],
                    'prodi': items[i]['prodi'],
                    'type': items[i]['type'],
                    'year': items[i]['year']
                })
                prodis.add(items[i]['prodi'])
                authors.add(items[i]['author'])
        
        # Determine if cross-prodi collaboration potential
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

def main():
    print("=" * 60)
    print("Research Topic Clustering - TF-IDF + K-Means")
    print("=" * 60)
    
    # Load data
    print("\nLoading SINTA data...")
    sinta_data = load_sinta_data()
    
    # Extract research items
    print("Extracting research items...")
    items = extract_research_items(sinta_data)
    print(f"Found {len(items)} research items")
    
    # Run clustering
    print("\nRunning TF-IDF + K-Means clustering...")
    clusters = run_clustering(items)
    
    if clusters is None:
        print("Clustering failed!")
        return
    
    # Build output data
    output_data = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'algorithm': 'TF-IDF + K-Means',
            'totalItems': len(items),
            'totalClusters': len(clusters)
        },
        'clusters': clusters,
        'summary': {
            'crossProdiCount': sum(1 for c in clusters.values() if c['isCrossProdi']),
            'highPotentialCount': sum(1 for c in clusters.values() if c['collaborationPotential'] == 'high'),
            'topClusters': sorted(
                [{'id': c['id'], 'name': c['name'], 'count': c['count']} for c in clusters.values()],
                key=lambda x: x['count'],
                reverse=True
            )[:5]
        }
    }
    
    # Save output
    print(f"\nSaving to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print("\n" + "=" * 60)
    print("CLUSTERING RESULTS SUMMARY")
    print("=" * 60)
    print(f"Total Clusters: {len(clusters)}")
    print(f"Cross-Prodi Clusters: {output_data['summary']['crossProdiCount']}")
    print(f"High Collaboration Potential: {output_data['summary']['highPotentialCount']}")
    print("\nTop 5 Clusters by Size:")
    for i, c in enumerate(output_data['summary']['topClusters'], 1):
        print(f"  {i}. {c['name']} ({c['count']} items)")
    
    print("\nDONE!")

if __name__ == "__main__":
    main()
