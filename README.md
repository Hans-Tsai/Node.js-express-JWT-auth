Node.js + Express framework Authentication with JWT token
===

![Imgur](https://i.imgur.com/MIYoqBLt.png)

# 簡介
- 這是我在自學完 The Net Ninja 在 [YouTube 頻道]((https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg))上的 Node.js JWT 使用者權限驗證 的課程之後，所做的筆記 & 範例練習
- 在這系列的教學課程中，我們除了會學到如何在 Node.js + express 的環境下，透過 JSON Web Token(= `JWT`) 來進行使用者權限驗證
- 在課程結束前，我們也會做一個範例網站練習 --- **Hans Smoothies**，在這個網站中會包含以下兩個功能，讓我們趕緊開始吧!
  + 註冊會員
  + 登入/登出

### Ch 01 --- JWT 簡介 & 基礎設定
- 一般來說，常見的使用者權限驗證方式會有以下兩種
  + 透過 `session`
  + 透過 JSON Web Token(= `JWT`) --- 較推薦此做法!

> Node Auth Tutorial (JWT) #1 - Intro & Setup --- [課程影片連結](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=1)

### Ch02 --- 設定 for 權限驗證功能的路由器(routes) & 控制器 (controllers)
- 此專案的 authentication routes 會有以下 5 個
  + | route | RESTful APIs method | description |
    | ----- | ------------------- | ----------- |
    | **/signup** | `GET` | sign up page |
    | **/signup** | `POST` | create a new user in db |
    | **/login** | `GET` | log **in** page |
    | **/login** | `POST` | authenticate a current user |
    | **/logout** | `GET` | log a user out |
- 在 `views/` 資料夾中建立 `login.ejs`、`signup.ejs` 兩個 view 模板
- 建立 `routes/` 資料夾並設定好 `/signup`、`/login` 的相對 `GET`、`POST` 路由器們在 `routes/authRoutes.js` 檔案中
- 建立 `controllers/` 資料夾並設定好要分別對應到 `authRoutes` 路由器中的 RESTful APIs 的控制器(controller)

> Node Auth Tutorial (JWT) #2 - Auth Routes & Controllers --- [課程影片連結](https://www.youtube.com/watch?v=muhJTRQ7WMk&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=2)

### Ch03 --- 測試路由器們 (routes) & 處理相對應的 `POST` request
- 可透過 [Postman](https://www.postman.com/) 桌面應用程式 or 網頁版來**測試 RESTful APIs**，這個 App 也**能選擇要使用的 REST 動詞**，還能**傳入資料 (passing data arguments)**
  + 桌面應用程式版 Postman Desktop App [下載點](https://www.postman.com/downloads/)
  + Chrome 線上版 Postman(免安裝) [下載點](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=zh-TW)
- 設定 JSON 解析中介函數 (=> JSON parse middleware)
  + `express.json()`
    * 將 API request 夾帶的 JSON 資料**解析**成 Javascript 的物件 (object) 形式，並將這個新的 body object 綁定在該 API 處理函數的 `request` 物件上(=> `req.body`)
    * **注意! 此方法只會在 `Content-Type: xxx` 與 `express.json({ type: 'xxx' });` 兩者值相同的條件下，才會解析連同 API request 傳入的資料!**
      * E.g. `Content-Type: "application/json"` & `express.json({ type: "application/json" });`
      > 節錄自 Mongoose 官方文件: Returns middleware that only parses JSON and only looks at requests where the `Content-Type` header matches the `type` option
    * 註: 從 Express ~4.16.0 之後，Express 官方已經將 `body-parser` 的功能整合內建到 express.js 函式庫中了!

> Node Auth Tutorial (JWT) #3 - Testing Routes & Handling POST Requests --- [課程影片連結](https://www.youtube.com/watch?v=uiKwHx2K1Fo&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=3)

### Ch04 --- 建立 `User` 模型 (Model)
- 可透過 [Mongoose](https://mongoosejs.com/) 這個 ODM(Object Document Mapping) 函式庫，來建立對應在 MongoDB No-SQL 資料庫中的 `User` collection 的模型(Model)
  + 建立 `models/` 資料夾並設定好 `User Model`，再實例化一個 `User` 模型出來，並匯出給控制器(`controller`) or 路由器(`route`)來使用
  + 建立 `User Model` 的 Schema，這邊所謂的 Schema 即表示用來規範這個 `User Model` 中每個屬性(=> 也就是各個 `document` 的欄位)的結構，E.g. `type`、`required`、`unique` 等等 Schema options
  + `mongoose.model('<modelName>', <modelSchema>)`
    * 功能: 編譯(compile)一個 `User Model` 出來
    * 參數 1 `<modelName>`: 必須為 **單數** 形式
    * 參數 2 `<modelSchema>`: 該模型(Model)已設定好的相對應的 Schema
    * 注意! Mongoose 函式庫會依據第一個參數 `modelName` 的**複數** & **小寫形式的名稱**，到 MongoDB 中尋找相對應名稱的 `collection`
      > 節錄自 Mongoose 官方文件: The first argument is the **singular** name of the collection your model is for. Mongoose automatically looks for the **plural**, **lowercased** version of your model name. Thus, for the example above, the model `Tank` is for the `tanks` collection in the database. 
    * E.g. `const User = mongoose.model('user');` => 就會到 MongoDB 資料庫中尋找名稱為 `'users'` 的那個 `collection`
  + `Model.create(<documentToInsert>)`
    * 功能: 在本地端新建一個該模型的實例(the instance of that specified Model object)，並將這個實例(instance)出存到 MongoDB 資料庫中
    * 提醒! 此方法為非同步方法 (async method)，必須要搭配 `async`、`await` 修飾子使用
    * > 節錄自 Mongoose 官方文件: Shortcut for saving one or more documents to the database. `MyModel.create(docs)` does `new MyModel(doc).save()` for every `doc` document into the `docs` collection. This function triggers `Model.prototype.save()`.

> Node Auth Tutorial (JWT) #4 - User Model - Auth Routes & Controllers --- [課程影片連結](https://www.youtube.com/watch?v=mnJxyc0DGM8&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=4)

### Ch05 --- Mongoose 內建的 Validation 功能
- 將 `models/User.js` 檔案中的 `User Model Schema` 各欄位屬性設定加上錯誤訊息顯示，這是 mongoose 內建的設定錯誤訊息的功能，有以下 2 種方式能設定錯誤訊息
  + E.g. **Array 形式**: `min: [6, 'Must be at least 6, got {VALUE}']`
  + E.g. **Object 形式**: `enum: { values: ['Coffee', 'Tea'], message: '{VALUE} is not supported' }`
  + 註: mongoose validation 功能也支援基礎的模板字串語法，如同上面範例中的 `{VALUE}` 即表示當前正在進行驗證的欄位值
- 實戰中，常用到的驗證功能可搭配 npm 上的第三方函式庫 [validator.js](https://www.npmjs.com/package/validator) 函式庫來實現，在這個函式庫中有許多常見的驗證功能，E.g. `isEmail()`、`isCreditCard()` ...等等
- 在 controller 中，建立一個用來專門產生錯誤事件的物件(=> errors object)的事件處理函數，該函數能依據各 API 拋出的 Error 物件中的以下 2 種常見屬性，來回傳一個新的錯誤事件的物件
  + `err.message`: 錯誤事件的訊息
  + `err.code`: 錯誤事件的編號
  + 在這次的教學會實作 `E11000: MongoDB duplicate key error`、`validation error` 兩個錯誤訊息優化功能

> Node Auth Tutorial (JWT) #5 - Mongoose Validation --- [課程影片連結](https://www.youtube.com/watch?v=nukNITdis9g&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=5)

### Ch06 --- Mongoose 內建的 Hooks(=> 就是中介函數 middleware function)
- Mongoose hook: 是一種特別的函數，當綁定的事件(event)被觸發時，就會執行該事件所對應到的 hook function。
  > 節錄自 Mongoose 官方文件: **Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. Middleware is specified on the schema level** and is useful for writing plugins.
  + 請記住! 必須要在 express 的每個中介函數(middleware function)、mongoose hook function 中的最後面都要加上 `next();`，以通知 express 能夠記住執行下一個中介函數 or mongoose hook function 了
  > 節錄自 Express 官方文件: Notice the call above to `next()`. Calling this function invokes the next middleware function in the app. The `next()` function is not a part of the Node.js or Express API, but is the third argument that is passed to the middleware function. The `next()` function could be named anything, but by convention it is always named “**next**”. To avoid confusion, always use this convention.

> Node Auth Tutorial (JWT) #6 - Mongoose Hooks --- [課程影片連結](https://www.youtube.com/watch?v=teDkX-_Zkbw&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=6)

### Ch 07 --- 將密碼加密
- 在 Model.save() 被呼叫之前，可綁定一個 mongoose hook function，並在其中透過 npm 上的第三方函式庫 [bcrypt.js](https://www.npmjs.com/package/bcrypt) 來將 User Model 的 `password` 屬性值做加密(hash)
- `bcrypt` 函式庫的加密功能原理說明，可分成以下 2 個步驟
  + 步驟1: 將使用者輸入的值(e.g. password)透過指定的演算法(algorithm)來進行加密，會得到一串加密(hash)過的隨機字串(random string)。**這個步驟雖然看似沒問題，但駭客依然能透過演算法將這個加密字串反推(reverse)出原始的值!**
    * ![Imgur](https://i.imgur.com/OZQp4iB.png)
  + 步驟2: **`bcrypt` 函式庫會產生一個 `salt`**(=> 是密碼學中的專有名詞，意思是在要加密的字串中加特定的字符(`salt`)，打亂原始的字符串，使其生成的散列結果產生變化，其參數越高加鹽次數多越安全相對的加密時間就越長)。**並在利用演算法加密前，將這個 `salt` 加到使用者輸入的值(e.g. password)中**。因此，如同以下的圖解所示，我們最後會得到的就是 `salt + password => hashed new password`，並將這個**加鹽過的加密結果儲存到資料庫中**。
    * ![Imgur](https://i.imgur.com/NvIPULo.png)
    * `salt` 範例: $ `const salt = await bcrypt.genSalt()` => **注意! 這是一個非同步的方法，必須前綴 `await` 修飾子**
    * `hash` 範例: $ `this.password = await bcrypt.hash(this.password, salt);` => **注意! 這是一個非同步的方法，必須前綴 `await` 修飾子**
    * 課程範例結果: ![Imgur](https://i.imgur.com/c1RdAQh.png)
  + 接下來，當使用者要透過帳號 & 密碼來登入網站時，後端伺服器(server)就會自動將 `salt` 值加到使用者輸入在登入畫面上的值，並且透過同一套演算法來得到一串加鹽過的加密字串，**再那這個加鹽過的加密字串跟資料庫中的相對應的使用者密碼進行比對**。若相同，則允許登入網站; 反之，則拒絕登入。

> Node Auth Tutorial (JWT) #7 - Hashing Passwords --- [課程影片連結](https://www.youtube.com/watch?v=DmrjFKTLOYo&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=7)

### 參考資料
- [JSON Web Token 官方網站](https://jwt.io/)
- [Mongoose Middleware 章節](https://mongoosejs.com/docs/middleware.html)
- **The Net Ninja** YouTube 頻道上的 [**Node.js Auth Tutorial (JWT)**](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp) 系列教學
  + 此課程提供的作者放在 GitHub 上的[開放原始碼](https://github.com/iamshaunjp/node-express-jwt-auth)