const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const Conversation = require('../models/Conversation');

const router = express.Router();
const configuration = new Configuration({ apiKey: 'OPENAI_API_KEY' });
const openai = new OpenAIApi(configuration);

router.post('/respond', async (req, res) => {
    try {
        const { userMessage } = req.body;
        const conversation = await Conversation.find({});
        const history = conversation.map(conv => `${conv.user}: ${conv.bot}`).join('\n');

        const response = await openai.createChatCompletion({
            model: 'gpt-4-mini',
            messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: history + '\n' + userMessage }]
        });

        const botMessage = response.data.choices[0].message.content;
        await Conversation.create({ user: userMessage, bot: botMessage });
        res.json({ botMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
