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
- 在 Model.save() 被呼叫之前，可綁定一個 mongoose hook function，並在其中透過 npm 上的函式庫 [bcrypt.js](https://www.npmjs.com/package/bcrypt) 來將 User Model 的 `password` 屬性值做加密(hash)
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

### Ch08 --- 建立註冊、登入/登出的畫面
- 利用 [EJS](https://ejs.co/) 模板模板引擎(template engine)給伺服器端渲染(SSR)頁面的模板，先建立好 2 個畫面
  + 註冊: `views/signup.ejs`
  + 登入/登出: `views/login.ejs`
- 再利用 `EJS` 的 `partial` 功能，將網站的 `/signup`、`/login` 2 個頁面，新增到 `views/partials/header.ejs` 裡面

> Node Auth Tutorial (JWT) #8 - Auth Views --- [課程影片連結](https://www.youtube.com/watch?v=8RiDRdHPcxA&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=8)

### Ch09 --- **`Cookie`** 基礎觀念介紹
- **`Cookie`**: 是一種方法讓我們能儲存資料(data)在使用者的瀏覽器(user's browser)上。
- **`Cookie`** 的運作方式: 當我們發送一個請求(API request)給伺服器端(server)時，這時伺服器會建立出一個 `cookie`，我們能決定這個 `cookie` 要儲存哪些資料? & 這個 `cookie` 能留存在這個瀏覽器(browser)多久的時間(=> 也就是該 `cookie` 在多久後會自動到期並刪除)?
- 接下來，`cookie` 會隨著 server response 一併回傳給瀏覽器。之後，當瀏覽器接受到這個 `cookie` 時，就會將它註冊(register)在使用者的瀏覽器中
- 之後，每當瀏覽器對指定的 RESTful API 發出 request 時，就會夾帶這個 `cookie` 上的資料一併發出 API request
- cookie 運作機制的整合圖例:
  + <a href="https://imgur.com/egvT56A"><img src="https://i.imgur.com/egvT56A.gif" title="source: imgur.com" /></a>
> 註: 而正因為他是儲存在我們用戶的本機端，通常可以儲存的地方有兩個：記憶體 or 硬體內。記憶體是由瀏覽器(browser)來維護的，通常會在瀏覽器關閉後清除，而各個瀏覽器之間的 `cookie` 是無法相互使用，也就是說對於在同一台電腦上使用 Chrome 或是 Firefox，僅管操作的是同一個人，卻是會認成兩個不一樣的角色。而硬體的 `cookie` 則會有一個保存期限，除非過期或是手動刪除，不然他的儲存時間會較瀏覽器來的長。
- **`cookie` 可以夾帶 `JWT token` 讓我們能夠透過它來進行權限驗證**
- 實戰中，可利用 npm 上的第三方函式庫 [cookie-parser.js](https://www.npmjs.com/package/cookie-parser)來將 API request 夾帶的 `cookie` 中的 `cookie header` 資料"解析"成 Javascript 的物件 (object) 形式。同時會產生 `req.cookies` 的屬性值，並綁定到 `request` 物件上。
  + 範例做法: 
    * ```javascript
      const cookieParser = require('cookie-parser');

      /** 中介函數 (middleware) */
      // 將 API request 夾帶的 `cookie` 中的 `cookie header` 資料"解析"成 Javascript 的物件 (object) 形式。同時會產生 req.cookies 的屬性值，並綁定到 `request` 物件上
      app.use(cookieParser());

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
      ```

> Node Auth Tutorial (JWT) #9 - Cookies Primer --- [課程影片連結](https://www.youtube.com/watch?v=mevc_dl1i1I&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=9)

### Ch10 --- JSON Web Token(= JWT) 理論
- `JWT token` 是由伺服器端(server)所創造的，再回傳給瀏覽器(browser)，然後瀏覽器會將這個 `JWT token` 儲存在 `cookie` 中，以利這個瀏覽器在未來發送到對應的 RESTful API request 時，能攜帶這個 `JWT token` 來讓伺服器端認證(authenticate)該瀏覽器的使用者
  + ![Imgur](https://i.imgur.com/KfNkZFe.png)
- `JWT token` 的結構主要可以拆解成 3 部分
  + `header`: 標頭。即用來告訴伺服器端，這個 `JWT token` 是採用哪種簽章形式(type of signature)? 通常，`header` 會包含以下 2 個部分，也就是這個 `JWT token` 的元資料(meta data)
    * `type`: 即採用的 token 形式，e.g. `JWT`
    * `alg`: 即採用的簽章演算法(signing algorithm)形式，e.g. `HMAC` or `SHA256` or `RSA`
    * 範例:
      * ```json
        {
          "alg": "HS256",
          "typ": "JWT"
        }
        ```
      > 註: 以上的 JSON 物件，會被透過 **Base64Url** 演算法來編碼(encode)成之後的 `JWT token` 的第一段主要部分
  + `payload`: 有效訊息。當 `payload` 中的資訊被解碼(decoded)後，能幫助我們辨別出這個瀏覽器的使用者是誰? 會包含 userID 等等的資訊。通常，`payload` 會包含以下 3 個部分
    * `Registered claims`(標准中注冊的聲明): 建議但不強制使用。通常會包含
      * `iss`: 該 `JWT token` 的簽發者
      * `sub`: 該 `JWT token` 的主要目的
      * `aud`: 該 `JWT token` 的目標接收者
      * `exp`: 該 `JWT token` 的過期時間，這個過期時間必須要 **>** `JWT token` 的簽發時間
    * `Public claims`: 公共的聲明。這裡能新增任何的訊息，一般用來添加用戶的相關訊息 or 其它業務需要的必要訊息。**但不建議添加敏感訊息，因為該部分在客戶端(client)可解密**
    * `Private claims`: 私有聲明。這裡是 `JWT token` 提供者 & 消費者所共同定義的聲明。**一般不建議存放敏感訊息，因為 `base64` 是能對稱解密的，即表示該部分訊息可以歸類為明文訊息**
    * 範例:
      * ```json
        {
          "sub": "1234567890",
          "name": "John Doe",
          "admin": true
        }
        ```
      > 註: 以上的 `payload` 物件，會被透過 **Base64Url** 演算法來編碼(encode)成之後的 `JWT token` 的第二段主要部分
  + `signature`: 簽章。即用來保護這個 `JWT token` 是安全且不會被客戶端(client)隨意竄改、攔截的。這個簽章是由前面的 `header`、`payload` 兩個參數值所組成的，並搭配 `secret` 來進行加密。通常，`payload` 會包含以下 3 個部分
    * `encoded header`: 已經由 **Base64Url** 演算法編碼後的 `header`，會取用裡面的 `alg` 屬性值來作為這次要產生的 `JWT token` 指定演算法基礎
    * `encoded payload`: 已經由 **Base64Url** 演算法編碼後的 `payload`
    * `secret`: 相當於 **bcrypt.js** 的 `salt`。儲存在伺服器端(server)的，**必須是非公開的**。
    * 範例: 若我們想使用 `HMAC SHA256` 演算法來產生一段簽章(signature)
      * ```javascript
        HMACSHA256(
          base64UrlEncode(header) + "." +
          base64UrlEncode(payload),
          secret)
        ```
  + 綜合以上 `header`、`payload`、`signature`，`JWT token` 會有三段主要部分
    + **`Header.Payload.Signature`**
      * ![Imgur](https://i.imgur.com/IYwNrn1.png)
      * ![Imgur](https://i.imgur.com/wYmVXJZ.png)
    + 而瀏覽器會得到經由 `Base64URL` 演算法加密後的結果
      * ![Imgur](https://i.imgur.com/wMkAUlE.png)
      * ![Imgur](https://i.imgur.com/r7ZXpAL.png)
- 伺服器端的 `JWT token` 的驗證流程
  + 伺服器端根據客戶端發過來的 API request，來產生相對應的 `JWT token`，並回傳給客戶端
  + 客戶端儲存下這個 `JWT token`，並在後續的每次對相對應的 RESTful API 發出 request 時，都會在 `cookie` 中夾帶這個 `JWT token` **以作為伺服器端驗證該瀏覽器上的使用者資訊的對照結果**
    * ![Imgur](https://i.imgur.com/9oSb4AX.png)
    * ![Imgur](https://i.imgur.com/Lt82sWe.png)
  + 伺服器端會透過儲存在伺服器(server)上的 `secret`，搭配客戶端傳來的 `header`、`payload` 伺服器端的 `secret` 來進行編碼。並拿這次編碼的結果與 `JWT token` 做比對，若相符，就允許通過驗證; 反之，則拒絕這次的驗證請求

> Node Auth Tutorial (JWT) #10 - JSON Web Tokens (theory) --- [課程影片連結](https://www.youtube.com/watch?v=LZq0G8WUaII&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=10)

### Ch11 --- 新使用者的註冊功能 (part 01)
- 實戰中可利用 npm 上的 [jsonwebtoken.js](https://www.npmjs.com/package/jsonwebtoken) 第三方函式庫來實現伺服器端的權限驗證功能。
- 在對應到 `controller` 檔案(`controllers/authController.js`)中，利用 `jwt.sign()` 方法來產生一個帶有簽章(signature)的 `JWT token`
- 在對應到 `controller` 檔案(`controllers/authController.js`)中，找到需要使用到這個 `JWT token` 的 RESTful APIs 的處理器函數(handler functions)裡面，將這個 `JWT token` 儲存到 `response` 物件的 `cookie` 中。最後，再透過 Express 的 `res.json()` 回傳給客戶端(client)
 
> Node Auth Tutorial (JWT) #11 - New User Signup (part 1) --- [課程連結](https://www.youtube.com/watch?v=S-ZIfNuT5H8&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=11)

### Ch12 --- 新使用者的註冊功能 (part 02)
- **前端錯誤訊息優化**: 在 `views/signup.ejs` 頁面中，將 `emailError`、`passwordError` 兩個 DOM 節點加入顯示錯誤訊息的功能
- **註冊成功後，頁面跳轉回首頁**: 當使用者成功註冊一個新帳號後，伺服器端會自動將使用導回網站首頁(=> 也就是 Hans Smoothies)

> Node Auth Tutorial (JWT) #12 - New User Signup (part 2) --- [課程連結](https://www.youtube.com/watch?v=eWGwQ1__73E&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=12)

### Ch13 --- 新使用者的註冊功能 (part 02)
- **建立一個 User Model 的 `login` 靜態方法**: 在 `models/User.js` 中，建立一個靜態方法(static function)到 `User Model` 上，來實作驗證使用者登入的功能。在這個 `User.login` 方法中，我們可以傳入 `email`、`password` 兩個參數值進去，就能透過後端伺服器到 MongoDB 資料庫驗證此使用者
  + Mongoose 有內建 `Schema.statics.<funcName> = function () { ... };` 的方法來讓開發者能夠對 User Model 建立一個靜態方法(static method)
  > 節錄自 Mongoose 官方文件: You can also add static functions to your model. There are two equivalent ways to add a static:
    > * Add a function property to schema.statics
    > * Call the [Schema#static() function](https://mongoosejs.com/docs/api.html#schema_Schema-static)
    * ```javascript
      // Assign a function to the "statics" object of our animalSchema
      animalSchema.statics.findByName = function(name) {
        return this.find({ name: new RegExp(name, 'i') });
      };
      // Or, equivalently, you can call `animalSchema.static()`.
      animalSchema.static('findByBreed', function(breed) { return this.find({ breed }); });

      const Animal = mongoose.model('Animal', animalSchema);
      let animals = await Animal.findByName('fido');
      animals = animals.concat(await Animal.findByBreed('Poodle'));
      ```
    > 註: Do not declare statics using ES6 arrow functions (`=>`). Arrow functions explicitly prevent binding `this`, so the above examples will not work because of the value of `this`. 
- 在對應到 `controller` 檔案(`controllers/authController.js`) 的 `login_post` API request handler 中，呼叫 `User.login(email, password)` 靜態方法，來執行使用者驗證的功能

> Node Auth Tutorial (JWT) #13 - Logging Users in (part 1) --- [課程連結](https://www.youtube.com/watch?v=VliJT26LPFA&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=13)

### Ch14 --- 新使用者的註冊功能 (part 02)
- 擴充 `controller` 檔案(`controllers/authController.js`) 的 `handleErrors`(錯誤事件處理函數)，在裡面新增驗證 `email`、`password` 兩種情境的錯誤訊息優化
- 完成 `controller` 檔案(`controllers/authController.js`) 的 `login_post` RESTful API 的事件處理函數功能

> Node Auth Tutorial (JWT) #14 - Logging Users in (part 2) --- [課程連結](https://www.youtube.com/watch?v=f-2jDPgh_Ng&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=14)

### Ch15 --- 透過驗證客戶端的 `JWT token` 的中介函數來保護指定的路由(route)
- 建立一個能被重複使用的中介函數，來驗證客戶端 `cookie` 內的 `JWT token` 存在 & 有效
  + 可利用 `jwt.verify()` 方法來實作
- 在 `app.js` 中，找出指定要保護的路由，並在 `app.get(<routePath>, <middleware>, <callbackFunc>)` 中加入這個我們寫好的 `JWT token` 驗證中介函數(E.g. 在這次的課程中就是 `middleware/requireAuth.js`)

> Node Auth Tutorial (JWT) #15 - Protecting Routes --- [課程連結](https://www.youtube.com/watch?v=9N7uqbuODqs&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=15)

### Ch16 --- 建立使用者登出功能
- 其實若我們到 **Chrome/Application/Storage/Cookies** 中，將 `JWT token` 刪除的話，也能強制讓客戶端登出。但我們不可能期待一般用戶會這麼做，因此還是必須實作登出功能，並綁定到前端頁面上。
- 注意! 因為我們無法從伺服器端刪除客戶端 `cookie` 內的 `JWT token`，我們只能將客戶端的 `cookie` 替換(replace)成一個空值(blank value)，並設定一個非常快就要過期的時間
  + ```javascript
    res.cookie('jwt', '', { maxAge: 1 });
    ```

> Node Auth Tutorial (JWT) #16 - Logging Users Out --- [課程連結](https://www.youtube.com/watch?v=jQn74jB5dg0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=16)

### Ch17 --- 確認當前的使用者
- 建立一個能夠確認當前的使用者的中介函數，用來讓前端頁面能顯示在畫面上目前是由哪個使用者登入這個網站
  + 一樣要先確保客戶端 `cookie` 內的 `JWT token` 存在 & 有效
  + 透過 `JWT token` 內的 `User.id` 到 MongoDB 資料庫中找出指定的 `user`，並將這個使用者資訊儲存到 `res.locals` 屬性中，以讓前端 `views/` 內的頁面能夠取用(access)到這個使用者的資料
    * ```javascript
      let user = await User.findById(decodedToken.id);
      res.locals.user = user;
      next();
      ```

> Node Auth Tutorial (JWT) #17 - Checking the Current User --- [課程連結](https://www.youtube.com/watch?v=JqF2BJBQI9Y&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=17)

### Ch18 --- 條件式渲染頁面 (Conditional Rendering)
- 可透過前一個章節中，儲存到 local variable 的使用者(`user`)物件，來將其 `user.email` 屬性搭配 `ejs` 模板引擎的 `if { ... } else { ... }` 來實作條件式渲染頁面
  + ```HTML
    <ul>
      <% if (user) { %>
        <li>Welcome, <%= user.email %></li>
        <li><a href="/logout">Log out</a></li>
      <% } else { %>
        <li><a href="/login">Log in</a></li>
        <li><a href="/signup" class="btn">Sign up</a></li>
      <% } %>
    </ul>
    ```

> Node Auth Tutorial (JWT) #18 - Conditional Rendering --- [課程連結](https://www.youtube.com/watch?v=mqubRYtnPcs&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=18)

### 參考資料
- [JSON Web Token 官方網站](https://jwt.io/)
- [Mongoose Middleware 章節](https://mongoosejs.com/docs/middleware.html)
- [Mongoose Schema Static 章節](https://mongoosejs.com/docs/guide.html#statics)
- [Cross Site Request Forgery (CSRF) 攻擊 --- 介紹](https://owasp.org/www-community/attacks/csrf)
- [Cookie 和 Session 究竟是什麼？有什麼差別？ --- by AlphaCamp](https://tw.alphacamp.co/blog/cookie-session-difference)
- **The Net Ninja** YouTube 頻道上的 [**Node.js Auth Tutorial (JWT)**](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp) 系列教學
  + 此課程提供的作者放在 GitHub 上的[開放原始碼](https://github.com/iamshaunjp/node-express-jwt-auth)