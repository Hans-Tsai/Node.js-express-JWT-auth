const express = require('express');
const mongoose = require('mongoose');

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

/** 設定路由 (routes) */
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));