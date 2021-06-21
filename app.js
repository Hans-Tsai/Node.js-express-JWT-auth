const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

//#region 
/** 中介函數 (middleware) */
// 設定 express app 的靜態資料夾為 `./public/`
app.use(express.static('public'));
// 將 API request 夾帶的 JSON 資料"解析"成 Javascript 的物件 (object) 形式
app.use(express.json());
// 將 API request 夾帶的 `cookie` 中的 `cookie header` 資料"解析"成 Javascript 的物件 (object) 形式。同時會產生 req.cookies 的屬性值，並綁定到 `request` 物件上
app.use(cookieParser());

//#endregion

/** 指定 view engine 為 `ejs` 模板引擎 */
app.set('view engine', 'ejs');

/** 建立 Local MongoDB 連線設定 */
const dbURI = 'mongodb://localhost/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//#region 
/** 設定路由器 (routes) */
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
// 相當於透過 `express app` 的中介函數來套用整個設定好的 `authRoutes` 路由器物件
app.use(authRoutes);

//#endregion

//#region
/** 設定 Cookie 的鍵/值資料 */
app.get('/set-cookies', (req, res) => {
  // res.setHeader('Set-cookie', 'newUser=true');

  res.cookie('newUser', true);
  // 實戰中，權限驗證需在 HTTPS 中執行，因此必須加上 `secure: true` 的選項
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  res.send('you got the cookies!');
});
/** 透過 cookie-parser 函式庫，將產生出來的 `req.cookies` 以 JSON 的形式回傳給 client 端 */
app.get('/get-cookies', (req, res) => {
  const cookies = req.cookies;
  res.json(cookies);
});

//#endregion