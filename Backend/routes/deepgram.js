const express = require('express');
const { Deepgram } = require('@deepgram/sdk');

const router = express.Router();
const deepgram = new Deepgram('DEEPGRAM_API_KEY');

router.post('/transcribe', async (req, res) => {
    try {
        console.log('Here I am ');
        const { audio } = req.body;
        const response = await deepgram.transcription.preRecorded({ buffer: audio, mimetype: 'audio/wav' });
        res.json(response.results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
