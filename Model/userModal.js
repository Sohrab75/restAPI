const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true }, // Add unique constraint
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add role field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
