const User = require('../models/User');

/** 建立一個用來專門產生錯誤事件的物件(=> errors object)的錯誤事件處理函數 */
const handlerErrors = (err) => {
  // err.message: 錯誤事件的訊息，err.code: 錯誤事件的編號
  let errors = { email: '', password: '' };

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

const signup_get = (req, res) => {
  res.render('signup');
};
const signup_post = async (req, res) => {
  // 透過 express.json() 將 `POST` request 夾帶的 JSON 資料解析成 Javascript 的物件形式後，儲存到該 POST RESTful API 的 `request.body` 
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } 
  catch (err) {
    // 若使用者未輸入 email 或 password ...等等的情況時，會導致上面的程式碼拋出錯誤
    const errors = handlerErrors(err);
    res.status(400).json({ errors });
  }
};
const login_get = (req, res) => {
  res.render('login');
};
const login_post = async (req, res) => {
  // 透過 express.json() 將 `POST` request 夾帶的 JSON 資料解析成 Javascript 的物件形式後，儲存到該 POST RESTful API 的 `request.body` 
  const { email, password } = req.body;
  res.send('user login');
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};