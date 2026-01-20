import { categorizePublication } from './categorization.js';

/**
 * Aggregate data from all lecturers
 * @param {Array} lecturersData  - Array of lecturers with publications
 * @returns {Object} - Aggregated statistics
 */
export function aggregateProdiData(lecturersData) {
    let allPublications = [];
    let totalCitations = 0;
    let lecturersWithData = 0;

    lecturersData.forEach(lecturer => {
        if (lecturer.publications && lecturer.publications.length > 0) {
            lecturer.publications.forEach(pub => {
                allPublications.push({
                    ...pub,
                    lecturerName: lecturer.name,
                    category: categorizePublication(pub.title)
                });
                totalCitations += pub.citations || 0;
            });
            lecturersWithData++;
        }
    });

    // Get current year for filtering
    const currentYear = new Date().getFullYear();
    const threeYearsAgo = currentYear - 3;

    // Filter publications from last 3 years
    const recentPublications = allPublications.filter(pub => {
        const year = parseInt(pub.year);
        return year >= threeYearsAgo;
    });

    // Count by category
    const penelitianCount = allPublications.filter(p => p.category === 'Penelitian').length;
    const pengmasCount = allPublications.filter(p => p.category === 'Pengmas').length;

    // Get top lecturers by publication count
    const lecturerStats = {};
    allPublications.forEach(pub => {
        if (!lecturerStats[pub.lecturerName]) {
            lecturerStats[pub.lecturerName] = {
                name: pub.lecturerName,
                publicationCount: 0,
                citations: 0
            };
        }
        lecturerStats[pub.lecturerName].publicationCount++;
        lecturerStats[pub.lecturerName].citations += pub.citations || 0;
    });

    const topLecturers = Object.values(lecturerStats)
        .sort((a, b) => b.publicationCount - a.publicationCount)
        .slice(0, 5);

    const topCited = Object.values(lecturerStats)
        .sort((a, b) => b.citations - a.citations)
        .slice(0, 5);

    return {
        totalLecturers: lecturersData.length,
        lecturersWithData,
        totalPublications: allPublications.length,
        totalRecentPublications: recentPublications.length,
        totalCitations,
        avgPublicationsPerLecturer: lecturersWithData > 0
            ? (allPublications.length / lecturersWithData).toFixed(1)
            : 0,
        penelitianCount,
        pengmasCount,
        topLecturers,
        topCited,
        allPublications
    };
}

/**
 * Prepare data for publications by year chart
 * @param {Array} publications - All publications
 * @returns {Object} - Chart data
 */
export function getPublicationsByYearData(publications) {
    const currentYear = new Date().getFullYear();
    const years = [];

    // Get last 5 years
    for (let i = 4; i >= 0; i--) {
        years.push(currentYear - i);
    }

    const publicationCounts = years.map(year => {
        return publications.filter(p => parseInt(p.year) === year).length;
    });

    return {
        labels: years.map(y => y.toString()),
        datasets: [{
            label: 'Jumlah Publikasi',
            data: publicationCounts,
            backgroundColor: 'rgba(14, 165, 233, 0.5)',
            borderColor: 'rgb(14, 165, 233)',
            borderWidth: 2
        }]
    };
}

/**
 * Prepare data for category distribution pie chart
 * @param {number} penelitianCount - Count of penelitian
 * @param {number} pengmasCount - Count of pengmas
 * @returns {Object} - Chart data
 */
export function getCategoryDistributionData(penelitianCount, pengmasCount) {
    return {
        labels: ['Penelitian', 'Pengmas'],
        datasets: [{
            data: [penelitianCount, pengmasCount],
            backgroundColor: [
                'rgba(59, 130, 246, 0.7)',
                'rgba(16, 185, 129, 0.7)'
            ],
            borderColor: [
                'rgb(59, 130, 246)',
                'rgb(16, 185, 129)'
            ],
            borderWidth: 2
        }]
    };
}

/**
 * Prepare data for top lecturers bar chart
 * @param {Array} topLecturers - Top lecturers array
 * @returns {Object} - Chart data
 */
export function getTopLecturersData(topLecturers) {
    return {
        labels: topLecturers.map(l => l.name.split(' ').slice(0, 2).join(' ')), // Short names
        datasets: [{
            label: 'Jumlah Publikasi',
            data: topLecturers.map(l => l.publicationCount),
            backgroundColor: 'rgba(234, 88, 12, 0.6)',
            borderColor: 'rgb(234, 88, 12)',
            borderWidth: 2
        }]
    };
}
