```shell
  # .env
  PORT=5000
  DB_NAME=DB_Name
  MONGO_URI=mongodb+srv://prvs:<your_password>@quizo.7jh9jk.mongodb.net
  JWT_SECRET=your_jwt_secret
```

```shell
  npm init -y 
  npm install express mongoose dotenv cors multer jsonwebtoken bcryptjs
  npm install --save-dev nodemon
  npm install -D nodemon
```


```json
    "scripts": {
      "server": "nodemon app.js"
  },
```

```sh
  npx nodemon index.js
```

```sh
  npm i cookie-parser
 ```
### CORS (Cross-Origin Resource Sharing)

```shell
  npm install cors
```