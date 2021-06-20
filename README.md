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

> Node Auth Tutorial (JWT) #1 - Intro & Setup --- [課程影片連結](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp)

### Ch02 --- 設定 for 權限驗證功能的路由器(routes) & 控制器 (controllers)
- 此專案的 authentication routes 會有以下 5 個
  + | route | RESTful APIs method | description |
    | ----- | ------------------- | ----------- |
    | **/signup** | `GET` | sign up page |
    | **/signup** | `POST` | create a new user in db |
    | **/login** | `GET` | log **in** page |
    | **/login** | `POST` | authenticate a current user |
    | **/logout** | `GET` | log a user out |

> Node Auth Tutorial (JWT) #2 - Auth Routes & Controllers --- [課程影片連結](https://www.youtube.com/watch?v=muhJTRQ7WMk&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=3)

### 參考資料
- [JSON Web Token 官方網站](https://jwt.io/)
- **The Net Ninja** YouTube 頻道上的 [**Node.js Auth Tutorial (JWT)**](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp) 系列教學
  + 此課程提供的作者放在 GitHub 上的[開放原始碼](https://github.com/iamshaunjp/node-express-jwt-auth)