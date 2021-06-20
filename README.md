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
      > 節錄自官方文件: Returns middleware that only parses JSON and only looks at requests where the `Content-Type` header matches the `type` option
    * 註: 從 Express ~4.16.0 之後，Express 官方已經將 `body-parser` 的功能整合內建到 express.js 函式庫中了!

> Node Auth Tutorial (JWT) #2 - Auth Routes & Controllers --- [課程影片連結](https://www.youtube.com/watch?v=uiKwHx2K1Fo&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=3)

### 參考資料
- [JSON Web Token 官方網站](https://jwt.io/)
- **The Net Ninja** YouTube 頻道上的 [**Node.js Auth Tutorial (JWT)**](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp) 系列教學
  + 此課程提供的作者放在 GitHub 上的[開放原始碼](https://github.com/iamshaunjp/node-express-jwt-auth)