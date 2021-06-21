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

// 建立一個靜態方法(static function)到 User Model 上，來實作驗證使用者登入的功能
userSchema.statics.login = async function (email, password) {
  // 比對使用者輸入的 `email` 帳號
  const user = await this.findOne({ email });
  // 比對使用者輸入的 `password`
  if (user) { 
    const auth = await bcrypt.compare(password, user.password);
    // 若使用者輸入的 `email`、`password` 皆通過後端伺服器 -> 資料庫做驗證，則回傳該 User Model 物件
    if (auth) return user;
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
}

// mongoose.model() 方法會編譯出 (compile) 一個 user model，並自動依據第一個參數 (e.g. `user`)的複數形式
// 到 MongoDB 資料庫中尋找名稱為 `users` 的那個 collection
const User = mongoose.model('user', userSchema);

module.exports = User;