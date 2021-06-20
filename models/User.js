const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    // lowercase: true,
  },
  password: {
    type: String,
    required: true,
    // 最小位數限制
    minLength: 6,
  },
});

// mongoose.model() 方法會編譯出 (compile) 一個 user model，並自動依據第一個參數 (e.g. `user`)的複數形式
// 到 MongoDB 資料庫中尋找名稱為 `users` 的那個 collection
const User = mongoose.model('user', userSchema);

module.exports = User;