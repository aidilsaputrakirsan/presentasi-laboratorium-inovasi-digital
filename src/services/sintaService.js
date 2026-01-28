/**
 * SINTA Data Service
 * Service untuk membaca dan mengolah data SINTA (HKI, Penelitian, Pengabdian, Buku)
 */

// Import data SINTA (akan di-generate oleh Python script)
let sintaData = null;

/**
 * Load SINTA data dari file JSON
 */
export async function loadSintaData() {
    try {
        const response = await import('../data/sinta_data.json');
        sintaData = response.default || response;
        return sintaData;
    } catch (error) {
        console.warn('SINTA data not found. Run python scripts/sinta_scraper.py first.');
        return null;
    }
}

/**
 * Get SINTA data untuk satu dosen berdasarkan SINTA ID
 */
export function getLecturerSintaData(sintaId) {
    if (!sintaData || !sintaData.lecturers) return null;
    return sintaData.lecturers.find(l => l.sintaId === sintaId);
}

/**
 * Get semua IPR/HKI dari semua dosen
 */
export function getAllIPR() {
    if (!sintaData || !sintaData.lecturers) return [];

    const allIPR = [];
    sintaData.lecturers.forEach(lecturer => {
        if (lecturer.ipr && lecturer.ipr.length > 0) {
            lecturer.ipr.forEach(ipr => {
                allIPR.push({
                    ...ipr,
                    lecturerName: lecturer.name,
                    sintaId: lecturer.sintaId
                });
            });
        }
    });
    return allIPR;
}

/**
 * Get semua penelitian dari semua dosen
 */
export function getAllResearch() {
    if (!sintaData || !sintaData.lecturers) return [];

    const allResearch = [];
    sintaData.lecturers.forEach(lecturer => {
        if (lecturer.research && lecturer.research.length > 0) {
            lecturer.research.forEach(research => {
                allResearch.push({
                    ...research,
                    lecturerName: lecturer.name,
                    sintaId: lecturer.sintaId
                });
            });
        }
    });
    return allResearch;
}

/**
 * Get semua pengabdian masyarakat dari semua dosen
 */
export function getAllServices() {
    if (!sintaData || !sintaData.lecturers) return [];

    const allServices = [];
    sintaData.lecturers.forEach(lecturer => {
        if (lecturer.services && lecturer.services.length > 0) {
            lecturer.services.forEach(service => {
                allServices.push({
                    ...service,
                    lecturerName: lecturer.name,
                    sintaId: lecturer.sintaId
                });
            });
        }
    });
    return allServices;
}

/**
 * Get semua buku dari semua dosen
 */
export function getAllBooks() {
    if (!sintaData || !sintaData.lecturers) return [];

    const allBooks = [];
    sintaData.lecturers.forEach(lecturer => {
        if (lecturer.books && lecturer.books.length > 0) {
            lecturer.books.forEach(book => {
                allBooks.push({
                    ...book,
                    lecturerName: lecturer.name,
                    sintaId: lecturer.sintaId
                });
            });
        }
    });
    return allBooks;
}

/**
 * Get statistik agregat SINTA
 */
export function getSintaStatistics() {
    if (!sintaData || !sintaData.lecturers) {
        return {
            totalIPR: 0,
            totalResearch: 0,
            totalServices: 0,
            totalBooks: 0,
            lecturersWithData: 0
        };
    }

    const stats = {
        totalIPR: 0,
        totalResearch: 0,
        totalServices: 0,
        totalBooks: 0,
        lecturersWithData: 0
    };

    sintaData.lecturers.forEach(lecturer => {
        const hasData = (lecturer.ipr?.length > 0) ||
                       (lecturer.research?.length > 0) ||
                       (lecturer.services?.length > 0) ||
                       (lecturer.books?.length > 0);

        if (hasData) stats.lecturersWithData++;

        stats.totalIPR += lecturer.ipr?.length || 0;
        stats.totalResearch += lecturer.research?.length || 0;
        stats.totalServices += lecturer.services?.length || 0;
        stats.totalBooks += lecturer.books?.length || 0;
    });

    return stats;
}

/**
 * Get IPR by category (Paten, Hak Cipta, dll)
 */
export function getIPRByCategory() {
    const allIPR = getAllIPR();
    const categories = {};

    allIPR.forEach(ipr => {
        const category = ipr.category || 'Lainnya';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(ipr);
    });

    return categories;
}

/**
 * Get data grouped by year
 */
export function getDataByYear(type = 'all') {
    const yearData = {};

    if (!sintaData || !sintaData.lecturers) return yearData;

    sintaData.lecturers.forEach(lecturer => {
        const processItems = (items) => {
            items.forEach(item => {
                const year = item.year || 'Unknown';
                if (!yearData[year]) yearData[year] = 0;
                yearData[year]++;
            });
        };

        if (type === 'all' || type === 'ipr') {
            processItems(lecturer.ipr || []);
        }
        if (type === 'all' || type === 'research') {
            processItems(lecturer.research || []);
        }
        if (type === 'all' || type === 'services') {
            processItems(lecturer.services || []);
        }
        if (type === 'all' || type === 'books') {
            processItems(lecturer.books || []);
        }
    });

    return yearData;
}

/**
 * Check if SINTA data is available
 */
export function isSintaDataAvailable() {
    return sintaData !== null && sintaData.lecturers && sintaData.lecturers.length > 0;
}

/**
 * Get metadata
 */
export function getMetadata() {
    return sintaData?.metadata || null;
}

export default {
    loadSintaData,
    getLecturerSintaData,
    getAllIPR,
    getAllResearch,
    getAllServices,
    getAllBooks,
    getSintaStatistics,
    getIPRByCategory,
    getDataByYear,
    isSintaDataAvailable,
    getMetadata
};
