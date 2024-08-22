const express = require('express');
const router = express.Router();
const esClient = require('../services/elasticClient');

// Endpoint para adicionar filmes
router.post('/', async (req, res) => {
    const { title, director, releaseYear, genre } = req.body;

    const movie = { title, director, releaseYear, genre };

    try {
        await esClient.index({
            index: 'movies',
            body: movie,
        });

        res.status(201).json({ message: 'Movie added successfully!', movie });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ error: 'Failed to add movie' });
    }
});

// Endpoint para buscar filmes
router.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        const result = await esClient.search({
            index: 'movies',
            body: {
                query: {
                    multi_match: {
                        query: query,
                        fields: ['title', 'director', 'genre'],
                    },
                },
            },
        });

        res.status(200).json(result.hits.hits);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Failed to search movies' });
    }
});

module.exports = router;
