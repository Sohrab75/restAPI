const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true }, // Add unique constraint
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
