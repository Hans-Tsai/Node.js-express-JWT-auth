const jwt = require('jsonwebtoken');
const User = require('../models/User');

/** 建立一個能被重複使用的中介函數，來驗證客戶端 `cookie` 內的 `JWT token` 存在 & 有效 */
const requireAuth = (req, res, next) => {
  // 將客戶端的 `JWT token` 從 `request` 物件中的 `cookies` 解析出來
  const token = req.cookies.jwt;

  // 驗證客戶端的 `cookie` 中夾帶的 `JWT token` 存在 & 有效
  // 若客戶端存在 `JWT token`
  if (token) {
    jwt.verify(token, 'Hans Smoothies secret', (err, decodedToken) => {
      // 若客戶端的 JWT token 無效，拋出該錯誤訊息，並將瀏覽器畫面導回到登入頁面
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      }
      // 若客戶端通過驗證 `JWT token` 存在 & 有效，繼續執行接下來的程式(=> `next()`)
      else {
        console.log(decodedToken);
        next();
      }
    })
  }
  else {
    // 若客戶端的 `cookie` 中沒有夾帶 `JWT token`，則將瀏覽器畫面導回到登入頁面
    res.redirect('/login');
  }
};

/** 建立一個能夠確認當前的使用者的中介函數 */
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'Hans Smoothies secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // 預設 response 物件中的 `local` 變數中的 `user` 屬性值為 `null`
        res.locals.user = null;
        // 不需要導回到登入頁面，只要讓 Express 繼續執行 stack 中的下一個中介函數就好
        next();
      }
      else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    })
  }
  else {
    res.locals.user = null;
    next();
  }
}

module.exports = { 
  requireAuth, 
  checkUser,
};