const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

// Mongoose hook function: 當 `doc` 被 Model.save() 到 MongoDB 資料庫"之前"，會觸發這個函數。其中 `doc` 參數即表示"準備" save 到資料庫的那個 document
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  // 這邊的 `this` 特殊變數是指向我們將要建立的那個新的 User Model 實例(instance)
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// mongoose.model() 方法會編譯出 (compile) 一個 user model，並自動依據第一個參數 (e.g. `user`)的複數形式
// 到 MongoDB 資料庫中尋找名稱為 `users` 的那個 collection
const User = mongoose.model('user', userSchema);

module.exports = User;