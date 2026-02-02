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
SINTA_DATA_FILE = os.path.join(BASE_DIR, 'src', 'data', 'sinta_data.json')
OUTPUT_FILE = os.path.join(BASE_DIR, 'src', 'data', 'expertise_data.json')

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

def load_data():
    if not os.path.exists(SINTA_DATA_FILE):
        print(f"Error: {SINTA_DATA_FILE} not found.")
        return None
    with open(SINTA_DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\d+', '', text) # Remove ALL numbers
    text = re.sub(r'[^a-z\s]', ' ', text) # Remove special chars
    words = text.split()
    words = [w for w in words if w not in STOPWORDS_ID and len(w) > 2]
    return ' '.join(words)

def build_expertise_profile():
    data = load_data()
    if not data: return

    lecturers = data.get('lecturers', [])
    corpus = []
    lecturer_map = [] # To map corpus index back to lecturer

    print(f"Processing {len(lecturers)} lecturers...")

    # 1. Prepare Corpus per Lecturer
    for idx, lect in enumerate(lecturers):
        # Combine Research + Service titles
        combined_text = ""
        
        # Collect Titles
        titles = []
        for item in lect.get('research', []):
            if item.get('title'): titles.append(item['title'])
        for item in lect.get('services', []):
            if item.get('title'): titles.append(item['title'])
            
        # Add Publications (Journals/Proceedings)
        documents = lect.get('documents', {})
        for item in documents.get('list', []):
            if item.get('title'): titles.append(item['title'])
            
        # Join and Preprocess
        combined_text = " ".join(titles)
        clean_text = preprocess_text(combined_text)
        
        if clean_text:
            corpus.append(clean_text)
            lecturer_map.append({
                'id': lect.get('id') or lect.get('sintaId') or str(idx), # Fallback ID
                'name': lect['name'],
                'prodi': lect.get('prodi', 'Unknown'),
                'avatar': lect.get('image', ''),
                'sinta_score': lect.get('sintaScoreOverall', 0),
                'title_count': len(titles)
            })
        else:
            # Handle lecturers with no valid text
            corpus.append("") 
            lecturer_map.append({
                 'id': lect.get('id') or lect.get('sintaId') or str(idx),
                 'name': lect['name'],
                 'title_count': 0
            })

    # 2. TF-IDF Calculation
    # Increase max_features to capture more specific terms (Global Vacabulary)
    vectorizer = TfidfVectorizer(max_features=1500, ngram_range=(1,1)) # Increased to 1500
    tfidf_matrix = vectorizer.fit_transform(corpus)
    feature_names = vectorizer.get_feature_names_out()

    final_profiles = []

    for idx, lect_info in enumerate(lecturer_map):
        if lect_info.get('title_count', 0) == 0:
            continue

        # Get top keywords for this lecturer
        row = tfidf_matrix[idx]
        # Coo format to iterate non-zero
        coo = row.tocoo()
        keywords = {}
        
        # store keywords with their weights
        for col, data_val in zip(coo.col, coo.data):
            word = feature_names[col]
            keywords[word] = round(data_val, 3) # Keep distinct weight
            
        # Sort keywords by weight descending and Take Top 50
        sorted_items = sorted(keywords.items(), key=lambda item: item[1], reverse=True)
        sorted_keywords = dict(sorted_items[:50]) # Limit to Top 50 per lecturer

        final_profiles.append({
            **lect_info,
            'keywords': sorted_keywords
        })

    # 3. Save Output
    output_data = {
        'generated_at': "Auto-generated",
        'profiles': final_profiles
    }

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2)

    print(f"Expertise data saved to {OUTPUT_FILE} with {len(final_profiles)} profiles.")

if __name__ == "__main__":
    build_expertise_profile()
