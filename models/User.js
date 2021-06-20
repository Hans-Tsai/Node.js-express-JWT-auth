const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an E-mail.'],
    unique: true,
    // lowercase: true,
    validate: [isEmail, 'Please enter an valid E-mail.'],
  },
  password: {
    type: String,
    required: [true, 'Please enter an password.'],
    // 最小位數限制
    minlength: [6, 'Password minimum length cannot be less than 6 characters.'],
  },
});

// mongoose.model() 方法會編譯出 (compile) 一個 user model，並自動依據第一個參數 (e.g. `user`)的複數形式
// 到 MongoDB 資料庫中尋找名稱為 `users` 的那個 collection
const User = mongoose.model('user', userSchema);

module.exports = User;