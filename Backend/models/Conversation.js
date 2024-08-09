const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    user: String,
    bot: String
});

module.exports = mongoose.model('Conversation', conversationSchema);
