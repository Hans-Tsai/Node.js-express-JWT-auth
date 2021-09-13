const User = require('../models/User');
const jwt = require('jsonwebtoken');

//#region 
/** 建立一個用來專門產生錯誤事件的物件(=> errors object)的錯誤事件處理函數 */
const handleErrors = (err) => {
  // err.message: 錯誤事件的訊息，err.code: 錯誤事件的編號
  let errors = { email: '', password: '' };

  // email 驗證錯誤
  if (err.message === 'incorrect email') errors.email = 'That email isn\'t registered.';
  // password 驗證錯誤
  if (err.message === 'incorrect password') errors.password = 'That password is incorrect';

  // MongoDB duplicate key error
  if (err.code === 11000) {
    errors['email'] = 'that email is already registered';
    return errors;
  }

  // validation error
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(properties => {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
};

/** 建立一個用來產生 JWT token 的函數 
 * @returns 回傳一個帶有簽章(signature)的 JWT token
*/
// JWT token 的有效期間長度，`jwt.sign()` 是以秒為單位
const maxValidDuration = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'Hans Smoothies secret', {
    expiresIn: maxValidDuration,
  });
};

//#endregion

const signup_get = (req, res) => {
  res.render('signup');
};
const signup_post = async (req, res) => {
  // 透過 express.json() 將 `POST` request 夾帶的 JSON 資料解析成 Javascript 的物件形式後，儲存到該 POST RESTful API 的 `request.body` 
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    // 產生一個帶有簽章(signature)的 JWT token
    const token = createToken(user._id);
    // 將這個 JWT token 儲存到 response 物件的 cookie 中，並設定只能給 Web Server 的發送 http(s) request 的時候才能使用，以防止客戶端透過 javascript 來竄改此 JWT token
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxValidDuration * 1000 });
    res.status(201).json({ user: user._id });
  } 
  catch (err) {
    // 若使用者未輸入 email 或 password ...等等的情況時，會導致上面的程式碼拋出錯誤
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
const login_get = (req, res) => {
  res.render('login');
};
const login_post = async (req, res) => {
  // 透過 express.json() 將 `POST` request 夾帶的 JSON 資料解析成 Javascript 的物件形式後，儲存到該 POST RESTful API 的 `request.body` 
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // 產生一個帶有簽章(signature)的 JWT token
    const token = createToken(user._id);
    // 將這個 JWT token 儲存到 response 物件的 cookie 中，並設定只能給 Web Server 的發送 http(s) request 的時候才能使用，以防止客戶端透過 javascript 來竄改此 JWT token
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxValidDuration * 1000 });
    res.status(200).json({ user: user._id })
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout_get = (req, res) => {
  // 將要回傳給客戶端的 response 物件中的 `cookie` 設定為空值
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
};
