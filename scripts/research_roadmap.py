"""
Research Roadmap Analysis (Topic Evolution)
===========================================
Script untuk menganalisis evolusi topik penelitian dari tahun ke tahun
dan menghasilkan data untuk visualisasi Sankey Diagram.

Tujuan:
- Mengidentifikasi tren topik dominan per tahun
- Melihat aliran kontinuitas topik antar tahun
- Menghasilkan roadmap_data.json untuk ECharts

Output: roadmap_data.json
"""

import json
import os
import re
from datetime import datetime
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer

# Konfigurasi
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODI_DIR = os.path.join(BASE_DIR, 'src', 'data', 'prodi')
SHARED_DIR = os.path.join(BASE_DIR, 'src', 'data', 'shared')
OUTPUT_FILE = os.path.join(SHARED_DIR, 'roadmap_data.json')

# Indonesian stopwords (same as clustering)
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
    'melalui', 'secara', 'upaya', 'dalam', 'serta', 'bagi', 'kaltim'
}

def load_all_sinta_data():
    """Load and merge sinta_data.json from all prodi folders"""
    merged = {'lecturers': []}
    if not os.path.exists(PRODI_DIR):
        print(f"Error: {PRODI_DIR} not found.")
        return merged
    for slug in sorted(os.listdir(PRODI_DIR)):
        sinta_file = os.path.join(PRODI_DIR, slug, 'sinta_data.json')
        if os.path.isdir(os.path.join(PRODI_DIR, slug)) and os.path.exists(sinta_file):
            with open(sinta_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            merged['lecturers'].extend(data.get('lecturers', []))
            print(f"  Loaded {len(data.get('lecturers', []))} lecturers from {slug}")
    return merged

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    words = text.split()
    words = [w for w in words if w not in STOPWORDS_ID and len(w) > 2]
    return ' '.join(words)

def extract_items_by_year(sinta_data):
    """Group items by year"""
    items_by_year = {}
    
    for lecturer in sinta_data.get('lecturers', []):
        # Research
        for item in lecturer.get('research', []):
            year = item.get('year')
            title = item.get('title')
            if year and title and len(title) > 10:
                # Normalize year (ambil 4 digit pertama)
                year_match = re.search(r'\d{4}', str(year))
                if year_match:
                    y = int(year_match.group(0))
                    if 2018 <= y <= 2026: # Filter range tahun yang relevan
                        if y not in items_by_year: items_by_year[y] = []
                        items_by_year[y].append(title)
        
        # Services
        for item in lecturer.get('services', []):
            year = item.get('year')
            title = item.get('title')
            if year and title and len(title) > 10:
                year_match = re.search(r'\d{4}', str(year))
                if year_match:
                    y = int(year_match.group(0))
                    if 2018 <= y <= 2026:
                        if y not in items_by_year: items_by_year[y] = []
                        items_by_year[y].append(title)
                        
    return dict(sorted(items_by_year.items()))

def extract_yearly_keywords(items_by_year, top_n=5):
    """Extract top N keywords for each year using TF-IDF and keep related titles"""
    yearly_keywords = {}
    
    all_years = sorted(items_by_year.keys())
    
    for year in all_years:
        texts = items_by_year[year]
        if not texts: continue
        
        processed_texts = [preprocess_text(t) for t in texts]
        
        # TF-IDF per year
        vectorizer = TfidfVectorizer(max_features=20, ngram_range=(1,2))
        try:
            tfidf_matrix = vectorizer.fit_transform(processed_texts)
            feature_names = vectorizer.get_feature_names_out()
            scores = tfidf_matrix.sum(axis=0).A1
            word_scores = list(zip(feature_names, scores))
            top_words = sorted(word_scores, key=lambda x: x[1], reverse=True)[:top_n]
            
            # Find related titles for each top keyword
            keywords_data = []
            for w in top_words:
                keyword = w[0]
                # Filter titles containing this keyword
                related_titles = [
                    title for title in texts 
                    if keyword in preprocess_text(title)
                ]
                
                # Use Count of titles as Value (more intuitive for users)
                # Multiplied by 5 to give enough visual width in Sankey
                # But we will display the real count in frontend
                display_value = len(related_titles)
                
                keywords_data.append({
                    'name': keyword, 
                    'value': display_value * 5, # Visual weight scaling
                    'real_count': display_value, # Actual count for display
                    'year': year,
                    'titles': related_titles[:50] # Increase limit to 50
                })
                
            yearly_keywords[year] = keywords_data
            
        except ValueError:
            continue
            
    return yearly_keywords

def build_sankey_data(yearly_keywords):
    """Build Nodes and Links for Sankey Diagram with clean up"""
    nodes = []
    links = []
    
    years = sorted(yearly_keywords.keys())
    
    node_map = {} # "year_keyword" -> node_object
    
    # 1. Generate All Potential Links First
    temp_links = []
    connected_node_ids = set()
    
    for i in range(len(years) - 1):
        curr_year = years[i]
        next_year = years[i+1]
        
        curr_words = yearly_keywords.get(curr_year, [])
        next_words = yearly_keywords.get(next_year, [])
        
        for cw in curr_words:
            for nw in next_words:
                c_name = cw['name']
                n_name = nw['name']
                
                # Check match (exact match or substring)
                # Relaxed matching: check if words share significantly
                if c_name == n_name or c_name in n_name or n_name in c_name:
                    source_id = f"{curr_year}_{c_name.title()}"
                    target_id = f"{next_year}_{n_name.title()}"
                    
                    val = min(cw['value'], nw['value'])
                    
                    temp_links.append({
                        'source': source_id,
                        'target': target_id,
                        'value': val
                    })
                    connected_node_ids.add(source_id)
                    connected_node_ids.add(target_id)

    # 2. Build Nodes only for Connected items (and top items)
    # Give priority to connected items, but also keep very high value items even if isolated
    final_nodes = []
    final_node_indices = {}
    
    for year in years:
        for item in yearly_keywords[year]:
            clean_name = item['name'].title()
            node_id = f"{year}_{clean_name}"
            
            # Keep if it has connections OR if it's a very major topic (top 3 in that year)
            is_top = item in yearly_keywords[year][:2] 
            
            if node_id in connected_node_ids or is_top:
                final_nodes.append({
                    'name': f"{clean_name} ({year})",
                    'value': item['value'],
                    'real_count': item.get('real_count', 0), # Pass real count
                    'depth': years.index(year),
                    # Pass the titles to the node data
                    'titles': item.get('titles', [])
                })
                final_node_indices[node_id] = len(final_nodes) - 1

    # 3. Build Final Links with correct indices or names
    for link in temp_links:
        src = link['source']
        tgt = link['target']
        
        if src in final_node_indices and tgt in final_node_indices:
            # Check if link already exists (to avoid dupes)
            exists = False
            for l in links:
                if l['source'] == final_nodes[final_node_indices[src]]['name'] and \
                   l['target'] == final_nodes[final_node_indices[tgt]]['name']:
                    exists = True
                    break
            
            if not exists:
                links.append({
                    'source': final_nodes[final_node_indices[src]]['name'],
                    'target': final_nodes[final_node_indices[tgt]]['name'],
                    'value': link['value']
                })

    return {'nodes': final_nodes, 'links': links}

def main():
    print("Generating Research Roadmap Data (from all prodi)...")

    sinta_data = load_all_sinta_data()
    items_by_year = extract_items_by_year(sinta_data)
    
    # 1. Timeline stats
    timeline = []
    for year, items in items_by_year.items():
        print(f"Year {year}: {len(items)} items")
        timeline.append({'year': year, 'count': len(items)})
        
    # 2. Extract keywords
    yearly_keywords = extract_yearly_keywords(items_by_year, top_n=6)
    
    # 3. Build Sankey Data
    sankey_data = build_sankey_data(yearly_keywords)
    
    output = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'yearRange': f"{min(items_by_year.keys())}-{max(items_by_year.keys())}"
        },
        'timeline': timeline,
        'sankey': sankey_data
    }
    
    print(f"\nNodes: {len(sankey_data['nodes'])}, Links: {len(sankey_data['links'])}")
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2)
        
    print(f"Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
