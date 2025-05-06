# Quizo Backend

This is the backend for the Quizo application.

## Setup Instructions

1. Install dependencies:
   ```sh
   npm install

2. Create a .env file with the following content:

```shell
  # .env
  PORT=5000
  DB_NAME=DB_Name
  MONGO_URI=mongodb+srv://prvs:<your_password>@quizo.7jh9jk.mongodb.net
  JWT_SECRET=your_jwt_secret
```
3. Start the Server:

```sh
  npm run server
```

### Available Scripts
* npm run server: Starts the development server using nodemon.


### Features
* User authentication and authorization
* Exam creation and management
* Question management with image upload
* Exam attempts and scoring

### API End Points:
POSTMAN Json: []()

### Model Link: []()

### Notes
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