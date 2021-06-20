const User = require('../models/User');

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
    // 若使用者未輸入 email 或 password 的情況時，會導致上面的程式碼拋出錯誤
    console.log(err);
    res.status(400).send('error, user not created');
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