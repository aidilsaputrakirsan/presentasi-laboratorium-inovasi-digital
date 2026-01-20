import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Cache configuration
const CACHE_DIR = path.join(__dirname, 'cache');
const CACHE_DURATION_DAYS = 7; // Default: 7 days
const CACHE_DURATION_MS = CACHE_DURATION_DAYS * 24 * 60 * 60 * 1000;

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    console.log('📁 Cache directory created');
}

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

/**
 * Get cache file path for an author
 */
function getCacheFilePath(authorId) {
    return path.join(CACHE_DIR, `${authorId}.json`);
}

/**
 * Check if cache is valid (not expired)
 */
function isCacheValid(cacheFilePath) {
    if (!fs.existsSync(cacheFilePath)) {
        return false;
    }

    const stats = fs.statSync(cacheFilePath);
    const now = Date.now();
    const cacheAge = now - stats.mtimeMs;

    return cacheAge < CACHE_DURATION_MS;
}

/**
 * Read cache from file
 */
function readCache(authorId) {
    const cacheFilePath = getCacheFilePath(authorId);

    if (isCacheValid(cacheFilePath)) {
        try {
            const data = fs.readFileSync(cacheFilePath, 'utf8');
            const cache = JSON.parse(data);
            console.log(`✅ Cache HIT for ${authorId}`);
            return cache;
        } catch (error) {
            console.error(`❌ Cache read error for ${authorId}:`, error.message);
            return null;
        }
    }

    console.log(`⏭️  Cache MISS for ${authorId}`);
    return null;
}

/**
 * Write cache to file
 */
function writeCache(authorId, data) {
    const cacheFilePath = getCacheFilePath(authorId);

    try {
        const cacheData = {
            authorId,
            timestamp: Date.now(),
            data: data
        };
        fs.writeFileSync(cacheFilePath, JSON.stringify(cacheData, null, 2));
        console.log(`💾 Cache SAVED for ${authorId}`);
        return true;
    } catch (error) {
        console.error(`❌ Cache write error for ${authorId}:`, error.message);
        return false;
    }
}

/**
 * Delete cache for an author (force refresh)
 */
function deleteCache(authorId) {
    const cacheFilePath = getCacheFilePath(authorId);

    if (fs.existsSync(cacheFilePath)) {
        try {
            fs.unlinkSync(cacheFilePath);
            console.log(`🗑️  Cache DELETED for ${authorId}`);
            return true;
        } catch (error) {
            console.error(`❌ Cache delete error for ${authorId}:`, error.message);
            return false;
        }
    }
    return false;
}

/**
 * Get cache metadata
 */
function getCacheMetadata(authorId) {
    const cacheFilePath = getCacheFilePath(authorId);

    if (fs.existsSync(cacheFilePath)) {
        const stats = fs.statSync(cacheFilePath);
        const ageMs = Date.now() - stats.mtimeMs;
        const ageDays = Math.floor(ageMs / (24 * 60 * 60 * 1000));

        return {
            exists: true,
            lastUpdated: new Date(stats.mtimeMs).toISOString(),
            ageDays,
            isValid: isCacheValid(cacheFilePath)
        };
    }

    return {
        exists: false,
        lastUpdated: null,
        ageDays: null,
        isValid: false
    };
}

// SerpApi proxy endpoint with caching
app.get('/api/scholar', async (req, res) => {
    try {
        const { author_id, force_refresh } = req.query;

        if (!author_id) {
            return res.status(400).json({
                success: false,
                error: 'author_id parameter required'
            });
        }

        // Check if force refresh is requested
        if (force_refresh === 'true') {
            deleteCache(author_id);
            console.log(`🔄 Force refresh requested for ${author_id}`);
        }

        // Try to get from cache first
        const cachedData = readCache(author_id);
        if (cachedData) {
            return res.json({
                success: true,
                data: cachedData.data,
                fromCache: true,
                cacheMetadata: getCacheMetadata(author_id)
            });
        }

        // Cache miss - fetch from SerpApi
        console.log(`🌐 Fetching from SerpApi for ${author_id}`);
        const response = await axios.get('https://serpapi.com/search', {
            params: {
                engine: 'google_scholar_author',
                author_id: author_id,
                api_key: process.env.VITE_SERPAPI_KEY,
                num: 100
            }
        });

        // Save to cache
        writeCache(author_id, response.data);

        // Return data
        res.json({
            success: true,
            data: response.data,
            fromCache: false,
            cacheMetadata: getCacheMetadata(author_id)
        });

    } catch (error) {
        console.error('SerpApi Error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch data from SerpApi'
        });
    }
});

// Get cache status for all authors
app.get('/api/cache/status', (req, res) => {
    try {
        const files = fs.readdirSync(CACHE_DIR);
        const cacheStatus = files
            .filter(f => f.endsWith('.json'))
            .map(f => {
                const authorId = f.replace('.json', '');
                return {
                    authorId,
                    ...getCacheMetadata(authorId)
                };
            });

        res.json({
            success: true,
            cacheDurationDays: CACHE_DURATION_DAYS,
            totalCached: cacheStatus.length,
            caches: cacheStatus
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Clear all cache
app.post('/api/cache/clear', (req, res) => {
    try {
        const files = fs.readdirSync(CACHE_DIR);
        let deletedCount = 0;

        files.forEach(file => {
            if (file.endsWith('.json')) {
                fs.unlinkSync(path.join(CACHE_DIR, file));
                deletedCount++;
            }
        });

        res.json({
            success: true,
            message: `Cleared ${deletedCount} cache files`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'SerpApi Proxy Server Running',
        caching: 'enabled',
        cacheDuration: `${CACHE_DURATION_DAYS} days`
    });
});

app.listen(PORT, () => {
    console.log(`\n🚀 SerpApi Proxy Server running on http://localhost:${PORT}`);
    console.log(`📡 Frontend should connect to: http://localhost:${PORT}/api/scholar`);
    console.log(`💾 Server-side caching: ENABLED (${CACHE_DURATION_DAYS} days duration)`);
    console.log(`📁 Cache directory: ${CACHE_DIR}\n`);
});
