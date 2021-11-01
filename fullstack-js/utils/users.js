const mongoose = require('mongoose');

// Membuat schema
const userModel = mongoose.model('user', {
    id: String,
    nama: String,
    email: String,
    pass: String
})

module.exports = userModel