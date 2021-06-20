const signup_get = (req, res) => {
  res.render('signup');
};
const signup_post = (req, res) => {
  // 透過 express.json() 將 `POST` request 夾帶的 JSON 資料解析成 Javascript 的物件形式後，儲存到該 POST RESTful API 的 `request.body` 
  const { email, password } = req.body;
  res.send('new signup');
};
const login_get = (req, res) => {
  res.render('login');
};
const login_post = (req, res) => {
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