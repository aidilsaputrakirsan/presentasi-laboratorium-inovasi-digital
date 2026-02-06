"""
Build Expertise Data for Matchmaking System
===========================================
Generates weighted keyword profiles for each lecturer based on their 
Research and Community Service titles.

Output: expertise_data.json
"""

import json
import os
import re
from sklearn.feature_extraction.text import TfidfVectorizer

# Configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODI_DIR = os.path.join(BASE_DIR, 'src', 'data', 'prodi')

# Expanded Stopwords (Include Locations & Generals)
STOPWORDS_ID = {
    'dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'dengan', 'yang', 
    'adalah', 'ini', 'itu', 'atau', 'dalam', 'sebagai', 'oleh',
    'akan', 'juga', 'dapat', 'bisa', 'ada', 'tidak', 'telah',
    'menggunakan', 'berbasis', 'sistem', 'informasi', 'metode',
    'analisis', 'studi', 'kasus', 'implementasi', 'pengembangan',
    'perancangan', 'rancang', 'bangun', 'penerapan', 'evaluasi',
    'aplikasi', 'teknologi', 'data', 'pada', 'terhadap',
    'of', 'and', 'in', 'for', 'to', 'with', 'using', 'based', 'system',
    'balikpapan', 'kota', 'kalimantan', 'timur', 'selatan', 'utara', 'barat', 'pusat',
    'kabupaten', 'provinsi', 'daerah', 'wilayah', 'nasional', 'indonesia',
    'melalui', 'secara', 'upaya', 'dalam', 'serta', 'bagi', 'kaltim',
    'pelatihan', 'pendampingan', 'pemberdayaan', 'masyarakat', 'bengkel', 'workshop',
    'pt', 'cv', 'ud', 'tbk', 'xyz', 'abc', 'mitra', 'kota', 'kabupaten',
    # English Stopwords
    'the', 'and', 'of', 'in', 'to', 'for', 'with', 'on', 'at', 'by', 'from', 'up', 'about',
    'through', 'over', 'before', 'between', 'after', 'since', 'without', 'under',
    'within', 'along', 'following', 'across', 'behind', 'beyond', 'plus', 'except',
    'but', 'up', 'out', 'around', 'down', 'off', 'above', 'near',
    'system', 'information', 'method', 'analysis', 'design', 'development', 'implementation',
    'study', 'case', 'review', 'based', 'using', 'application', 'model', 'approach',
    'evaluation', 'performance', 'assessment', 'management', 'technology', 'research'
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

def load_data(prodi_slug):
    sinta_file = os.path.join(PRODI_DIR, prodi_slug, 'sinta_data.json')
    if not os.path.exists(sinta_file):
        print(f"Error: {sinta_file} not found.")
        return None
    with open(sinta_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\d+', '', text) # Remove ALL numbers
    text = re.sub(r'[^a-z\s]', ' ', text) # Remove special chars
    words = text.split()
    words = [w for w in words if w not in STOPWORDS_ID and len(w) > 2]
    return ' '.join(words)

def build_expertise_profile(prodi_slug):
    data = load_data(prodi_slug)
    if not data: return

    lecturers = data.get('lecturers', [])
    corpus = []
    lecturer_map = []

    print(f"  Processing {len(lecturers)} lecturers...")

    # 1. Prepare Corpus per Lecturer
    for idx, lect in enumerate(lecturers):
        titles = []
        for item in lect.get('research', []):
            if item.get('title'): titles.append(item['title'])
        for item in lect.get('services', []):
            if item.get('title'): titles.append(item['title'])
        documents = lect.get('documents', {})
        for item in documents.get('list', []):
            if item.get('title'): titles.append(item['title'])

        combined_text = " ".join(titles)
        clean_text = preprocess_text(combined_text)

        if clean_text:
            corpus.append(clean_text)
            lecturer_map.append({
                'id': lect.get('id') or lect.get('sintaId') or str(idx),
                'name': lect['name'],
                'prodi': lect.get('prodi', 'Unknown'),
                'avatar': lect.get('image', ''),
                'sinta_score': lect.get('sintaScoreOverall', 0),
                'title_count': len(titles)
            })
        else:
            corpus.append("")
            lecturer_map.append({
                 'id': lect.get('id') or lect.get('sintaId') or str(idx),
                 'name': lect['name'],
                 'title_count': 0
            })

    # 2. TF-IDF Calculation
    vectorizer = TfidfVectorizer(max_features=1500, ngram_range=(1,1))
    tfidf_matrix = vectorizer.fit_transform(corpus)
    feature_names = vectorizer.get_feature_names_out()

    final_profiles = []

    for idx, lect_info in enumerate(lecturer_map):
        if lect_info.get('title_count', 0) == 0:
            continue

        row = tfidf_matrix[idx]
        coo = row.tocoo()
        keywords = {}

        for col, data_val in zip(coo.col, coo.data):
            word = feature_names[col]
            keywords[word] = round(data_val, 3)

        sorted_items = sorted(keywords.items(), key=lambda item: item[1], reverse=True)
        sorted_keywords = dict(sorted_items[:50])

        final_profiles.append({
            **lect_info,
            'keywords': sorted_keywords
        })

    # 3. Save Output per prodi
    output_file = os.path.join(PRODI_DIR, prodi_slug, 'expertise_data.json')
    output_data = {
        'generated_at': "Auto-generated",
        'profiles': final_profiles
    }

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2)

    print(f"  Expertise data saved to {output_file} with {len(final_profiles)} profiles.")


if __name__ == "__main__":
    import sys

    prodi_folders = get_prodi_folders()
    if not prodi_folders:
        print("No prodi folders with sinta_data.json found!")
        sys.exit(1)

    target = sys.argv[1] if len(sys.argv) > 1 else None
    if target:
        if target not in prodi_folders:
            print(f"Error: '{target}' not found. Available: {', '.join(prodi_folders)}")
            sys.exit(1)
        prodi_folders = [target]

    for slug in prodi_folders:
        print(f"\n{'='*40}")
        print(f"Building expertise data: {slug}")
        print(f"{'='*40}")
        build_expertise_profile(slug)
