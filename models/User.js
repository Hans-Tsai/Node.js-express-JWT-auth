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

// Mongoose hook function: 當 `doc` 被 Model.save() 到 MongoDB 資料庫"之前"，會觸發這個函數。其中 `doc` 參數即表示"準備" save 到資料庫的那個 document
userSchema.pre('save', function (next) {
  // 這邊的 `this` 參數即表示"準備"要 save 到資料庫的那個本地端(local)的 User Model 實例(instance)
  console.log('user is about to be created & saved', this);
  next();
});

// Mongoose hook function: 當 `doc` 被 Model.save() 到 MongoDB 資料庫"之後"，會觸發這個函數。其中 `doc` 參數即表示剛剛"已經" save 到資料庫的那個 document
userSchema.post('save', function (doc, next) {
  console.log('new user was created & saved', doc);
  next();
});

// mongoose.model() 方法會編譯出 (compile) 一個 user model，並自動依據第一個參數 (e.g. `user`)的複數形式
// 到 MongoDB 資料庫中尋找名稱為 `users` 的那個 collection
const User = mongoose.model('user', userSchema);

module.exports = User;