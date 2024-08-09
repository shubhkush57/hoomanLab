const express = require('express');
const AWS = require('aws-sdk');

const router = express.Router();
AWS.config.update({ accessKeyId: 'AWS_ACCESS_KEY', secretAccessKey: 'AWS_SECRET_KEY', region: 'us-west-2' });
const polly = new AWS.Polly();

router.post('/synthesize', async (req, res) => {
    try {
        const { text } = req.body;
        const params = {
            Text: text,
            OutputFormat: 'mp3',
            VoiceId: 'Joanna'
        };

        const response = await polly.synthesizeSpeech(params).promise();
        res.json({ audioStream: response.AudioStream });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
