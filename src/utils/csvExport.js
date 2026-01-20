import Papa from 'papaparse';

/**
 * Export data publikasi ke CSV format borang akreditasi
 * Format kolom: Nama, Judul, Jurnal, Tahun, Jenis
 * @param {Array} publications - Array publikasi
 * @param {string} filename - Nama file output
 */
export function exportToCSV(publications, filename = 'publikasi-akreditasi.csv') {
    // Format data sesuai borang akreditasi
    const formattedData = publications.map(pub => ({
        'Nama': pub.author || '',
        'Judul': pub.title || '',
        'Jurnal': pub.publication || pub.journal || '',
        'Tahun': pub.year || '',
        'Jenis': pub.category || ''
    }));

    // Convert to CSV
    const csv = Papa.unparse(formattedData, {
        quotes: true,
        delimiter: ',',
        header: true
    });

    // Trigger download
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

/**
 * Export dengan filter tahun tertentu
 * @param {Array} publications - Array publikasi
 * @param {number} startYear - Tahun mulai
 * @param {number} endYear - Tahun akhir
 * @param {string} filename - Nama file
 */
export function exportFilteredCSV(publications, startYear, endYear, filename) {
    const filtered = publications.filter(pub => {
        const year = parseInt(pub.year);
        return year >= startYear && year <= endYear;
    });

    const customFilename = filename || `publikasi-${startYear}-${endYear}.csv`;
    exportToCSV(filtered, customFilename);
}
