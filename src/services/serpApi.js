import axios from 'axios';

// Use local proxy server to avoid CORS issues
const PROXY_URL = 'http://localhost:3000/api/scholar';
const PROFILES_URL = 'http://localhost:3000/api/scholar/profiles';

/**
 * Search Google Scholar by author
 * @param {string} authorName - Nama author
 * @returns {Promise} - Promise with search results
 */
export async function searchByAuthor(authorName) {
    try {
        const response = await axios.get(PROXY_URL, {
            params: {
                author_id: authorName
            }
        });

        if (response.data.success) {
            return {
                success: true,
                data: parseAuthorResults(response.data.data)
            };
        } else {
            return {
                success: false,
                error: response.data.error || 'Failed to fetch data'
            };
        }
    } catch (error) {
        console.error('SerpApi Error:', error);
        return {
            success: false,
            error: error.response?.data?.error || error.message || 'Network error. Pastikan proxy server berjalan (npm run server)'
        };
    }
}

/**
 * Search Google Scholar profiles
 * @param {string} query - Search query
 * @returns {Promise} - Promise with profiles
 */
export async function searchProfiles(query) {
    try {
        const response = await axios.get(PROFILES_URL, {
            params: {
                query: query
            }
        });

        if (response.data.success) {
            return {
                success: true,
                data: response.data.data.profiles || []
            };
        } else {
            return {
                success: false,
                error: response.data.error || 'Failed to fetch profiles'
            };
        }
    } catch (error) {
        console.error('SerpApi Error:', error);
        return {
            success: false,
            error: error.response?.data?.error || error.message || 'Network error. Pastikan proxy server berjalan (npm run server)'
        };
    }
}

/**
 * Get publications from author ID
 * @param {string} authorId - Google Scholar author ID
 * @param {boolean} forceRefresh - Force refresh from API (bypass cache)
 * @returns {Promise} - Promise with publications
 */
export async function getAuthorPublications(authorId, forceRefresh = false) {
    try {
        const params = { author_id: authorId };
        if (forceRefresh) {
            params.force_refresh = 'true';
        }

        const response = await axios.get(PROXY_URL, { params });

        if (response.data.success) {
            const data = response.data.data;
            return {
                success: true,
                author: data.author || {},
                publications: parsePublications(data.articles || []),
                fromCache: response.data.fromCache || false,
                cacheMetadata: response.data.cacheMetadata || null
            };
        } else {
            return {
                success: false,
                error: response.data.error || 'Failed to fetch publications'
            };
        }
    } catch (error) {
        console.error('SerpApi Error:', error);
        return {
            success: false,
            error: error.response?.data?.error || error.message || 'Network error. Pastikan proxy server berjalan di port 3000 (npm run server)'
        };
    }
}

/**
 * Parse author results from SerpApi
 * @param {Object} data - Raw SerpApi data
 * @returns {Object} - Parsed data
 */
function parseAuthorResults(data) {
    return {
        author: data.author || {},
        publications: parsePublications(data.articles || []),
        citedBy: data.cited_by || {},
        coAuthors: data.co_authors || []
    };
}

/**
 * Parse publications array
 * @param {Array} articles - Raw articles array
 * @returns {Array} - Parsed publications
 */
function parsePublications(articles) {
    return articles.map(article => ({
        title: article.title || '',
        link: article.link || '',
        citations: article.cited_by?.value || 0,
        year: article.year || '',
        publication: article.publication || '',
        authors: article.authors || '',
        snippet: article.snippet || ''
    }));
}

/**
 * Fetch publications for multiple lecturers in parallel
 * @param {Array} lecturers - Array of lecturer objects with scholarId
 * @param {boolean} forceRefresh - Force refresh from API (bypass cache)
 * @returns {Promise<Array>} - Array of lecturer data with publications
 */
export async function fetchMultipleLecturers(lecturers, forceRefresh = false) {
    const promises = lecturers.map(async (lecturer) => {
        try {
            const result = await getAuthorPublications(lecturer.scholarId, forceRefresh);

            if (result.success) {
                return {
                    ...lecturer,
                    publications: result.publications || [],
                    author: result.author || {},
                    loaded: true,
                    error: null,
                    fromCache: result.fromCache,
                    cacheMetadata: result.cacheMetadata
                };
            } else {
                return {
                    ...lecturer,
                    publications: [],
                    loaded: true,
                    error: result.error
                };
            }
        } catch (error) {
            return {
                ...lecturer,
                publications: [],
                loaded: true,
                error: error.message
            };
        }
    });

    return await Promise.all(promises);
}
