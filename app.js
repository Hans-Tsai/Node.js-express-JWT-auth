const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

/** 中介函數 (middleware)
 * @description 設定 express app 的靜態資料夾為 `./public/`
*/
app.use(express.static('public'));

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