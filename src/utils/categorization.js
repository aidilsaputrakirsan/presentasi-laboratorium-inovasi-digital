/**
 * Utility untuk kategorisasi publikasi
 * Penelitian vs Pengabdian Masyarakat
 */

const PENGMAS_KEYWORDS = [
    'pengabdian',
    'masyarakat',
    'pemberdayaan',
    'pelatihan',
    'community',
    'service',
    'empowerment',
    'training'
];

/**
 * Kategorisasi publikasi berdasarkan judul
 * @param {string} title - Judul publikasi
 * @returns {string} - 'Pengmas' atau 'Penelitian'
 */
export function categorizePublication(title) {
    if (!title) return 'Penelitian';

    const lowerTitle = title.toLowerCase();

    // Cek apakah ada kata kunci pengmas
    const isPengmas = PENGMAS_KEYWORDS.some(keyword =>
        lowerTitle.includes(keyword)
    );

    return isPengmas ? 'Pengmas' : 'Penelitian';
}

/**
 * Filter publikasi berdasarkan tahun
 * @param {Array} publications - Array publikasi
 * @param {number} startYear - Tahun awal
 * @param {number} endYear - Tahun akhir (opsional)
 * @returns {Array} - Publikasi yang difilter
 */
export function filterByYear(publications, startYear, endYear = null) {
    return publications.filter(pub => {
        const year = parseInt(pub.year);
        if (endYear) {
            return year >= startYear && year <= endYear;
        }
        return year >= startYear;
    });
}

/**
 * Filter publikasi berdasarkan kategori
 * @param {Array} publications - Array publikasi
 * @param {string} category - 'All', 'Penelitian', atau 'Pengmas'
 * @returns {Array} - Publikasi yang difilter
 */
export function filterByCategory(publications, category) {
    if (category === 'All') return publications;

    return publications.filter(pub =>
        categorizePublication(pub.title) === category
    );
}

/**
 * Hitung statistik IKU
 * @param {Array} publications - Array publikasi
 * @returns {Object} - Statistik
 */
export function calculateStatistics(publications) {
    const currentYear = new Date().getFullYear();
    const threeYearsAgo = currentYear - 3;

    // Total publikasi 3 tahun terakhir
    const recentPublications = filterByYear(publications, threeYearsAgo);

    // Group by author dan hitung sitasi
    const authorStats = {};
    publications.forEach(pub => {
        const author = pub.author || 'Unknown';
        if (!authorStats[author]) {
            authorStats[author] = {
                name: author,
                totalCitations: 0,
                publicationCount: 0
            };
        }
        authorStats[author].totalCitations += pub.citations || 0;
        authorStats[author].publicationCount += 1;
    });

    // Cari dosen dengan sitasi tertinggi
    const topCitedAuthor = Object.values(authorStats)
        .sort((a, b) => b.totalCitations - a.totalCitations)[0] || null;

    return {
        totalPublicationsLast3Years: recentPublications.length,
        topCitedAuthor: topCitedAuthor ? {
            name: topCitedAuthor.name,
            citations: topCitedAuthor.totalCitations
        } : null,
        totalAuthors: Object.keys(authorStats).length,
        totalPublications: publications.length
    };
}
