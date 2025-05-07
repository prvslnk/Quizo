# 📘 Quizo API Documentation

## 🔐 Authentication

### Login

**POST** `/api/auth/login`
Authenticates a user.

**Request Body**

```json
{
  "email": "pravas4@quizo.com",
  "password": "123"
}
```

**Response**

```json
{
  "_id": "USER_ID",
  "name": "Pravas 4",
  "email": "pravas4@quizo.com",
  "token": "JWT_TOKEN",
  "avatar": "/uploads/avatars/user.png",
  "rollNo": "QXII01",
  "standard": "X",
  "role": "user"
}
```

---

### Register

**POST** `/api/auth/register`
Registers a new user.

**Request Body (Form-Data)**

```
name: User
email: user@example.com
password: 123
rollNo: QX001
standard: X
avatar: <image file>
```

**Response**

```json
{
  "_id": "USER_ID",
  "name": "User",
  "email": "user@example.com",
  "token": "JWT_TOKEN",
  "avatar": "/uploads/avatars/user.png",
  "rollNo": "QX001",
  "standard": "X",
  "role": "user"
}
```

### Update User Profile (By User)

**PUT** `/api/user/myprofile/:id`

Updates the user's profile. Only `name`, `email`, `avatar`, and `password` can be modified. Changes to `class` and `rollNo` are not allowed.

**Headers**

```
Authorization: Bearer <token>
```

**Request Body (Form-Data)**

```
name: User
email: user@example.com
password: 123
avatar: <image file>
```

**Response**

```json
{
    "_id": "USER_ID",
    "name": "User",
    "email": "user@example.com",
    "avatar": "/uploads/avatars/user.png",
    "rollNo": "ROLL_NO",
    "standard": "STANDARD",
    "role": "user"
}
```

---

## 👤 User Management ( For Admin )

### Get All Users (By Admin)

**GET** `/api/user/profile`
Fetches all users.

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
[
  {
    "_id": "USER_ID",
    "name": "Name",
    "email": "email@example.com",
    "avatar": "/uploads/avatars/user.png",
    "role": "user"
  },
  ...
]
```

---

### Get User by ID (By Admin)

**GET** `/api/user/profile?id=USER_ID`
Fetches a user by their unique ID.

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
{
    "_id": "USER_ID",
    "name": "User Name",
    "email": "user@example.com",
    "rollNo": "ROLL_NO",
    "standard": "STANDARD",
    "avatar": "/uploads/avatars/user.png",
    "role": "user"
}
```

---

### Get Users by Name and Standard (By Admin)

**GET** `/api/user/profile?name=NAME_QUERY&standard=STANDARD`
Fetches users whose names match the query and belong to a specific standard.

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
[
    {
        "_id": "USER_ID",
        "name": "User Name",
        "email": "user@example.com",
        "rollNo": "ROLL_NO",
        "standard": "STANDARD",
        "avatar": "/uploads/avatars/user.png",
        "role": "user"
    },
    {
        "_id": "USER_ID_2",
        "name": "User Name 2",
        "email": "user2@example.com",
        "rollNo": "ROLL_NO_2",
        "standard": "STANDARD",
        "avatar": "/uploads/avatars/user2.png",
        "role": "user"
    }
]
```

---

### Get Users by Standard (By Admin)

**GET** `/api/user/profile?standard=STANDARD`
Fetches all users from a specific standard.

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
[
    {
        "_id": "USER_ID",
        "name": "User Name",
        "email": "user@example.com",
        "rollNo": "ROLL_NO",
        "standard": "STANDARD",
        "avatar": "/uploads/avatars/user.png",
        "role": "user"
    },
    {
        "_id": "USER_ID_2",
        "name": "User Name 2",
        "email": "user2@example.com",
        "rollNo": "ROLL_NO_2",
        "standard": "STANDARD",
        "avatar": "/uploads/avatars/user2.png",
        "role": "user"
    }
]
```

### Update User Profile (By Admin)

**PUT** `/api/user/profile/:id`

Updates a user's profile, including their role. Admin privileges are required.

**Headers**

```
Authorization: Bearer <token>
```

**Request Body**

```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "rollNo": "QXII02",
    "standard": "XII",
    "avatar": "/uploads/avatars/user.png",
    "role": "admin"
}
```

**Response**

```json
{
    "_id": "USER_ID",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "rollNo": "QXII02",
    "standard": "XII",
    "avatar": "/uploads/avatars/user.png",
    "role": "admin",
    "createdAt": "2025-05-04T08:19:29.687Z",
    "updatedAt": "2025-05-07T06:30:30.823Z",
    "__v": 0
}
```

---

### Delete User (By Admin)

**DELETE** `/api/user/profile/:id`

Deletes a user by their unique ID. Admin privileges are required.

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
{
    "message": "User deleted successfully."
}
```

---

## 📝 Exam Management

### Create Exam (By Admin)

**POST** `/api/exams`

**Headers**

```
Authorization: Bearer <token>
```

**Request Body**

```json
{
  "title": "Final Term Mathematics Exam",
  "description": "Final exam for Mathematics",
  "examStatus": "upcoming",
  "startTime": "2025-06-15T10:00:00.000Z",
  "duration": 60,
  "classFilter": ["XII", "X"],
  "subject": "Math"
}
```

**Response**

```json
{
    "title": "Final Term Mathematics Exam",
    "description": "Final exam for Mathematics",
    "examStatus": "upcoming",
    "startTime": "2025-06-15T10:00:00.000Z",
    "duration": 60,
    "classFilter": [
        "XII",
        "X"
    ],
    "subject": "Math",
    "assignedto": [
        "681723115fc98cc2c552cb58",
        "6817870585b50edad8c99498",
        "6818a722006c213aebd40f52"
    ],
    "_id": "681affdd70b20ac7d0e5cfe2",
    "attendees": [],
    "createdAt": "2025-05-07T06:38:21.660Z",
    "updatedAt": "2025-05-07T06:38:21.660Z",
    "__v": 0
}
```

---

### Get All Exams (by Admin)

**GET** `/api/exams`

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
[
    {
        "_id": "68188ad1edecb03e329703e9",
        "title": "Final Term Science Exam",
        "description": "Final exam for Science subject.",
        "examStatus": "upcoming",
        "startTime": "2025-06-15T10:00:00.000Z",
        "duration": 90,
        "classFilter": [
            "XII",
            "X"
        ],
        "subject": "Science",
        "assignedto": [
            {
                "_id": "681723115fc98cc2c552cb58",
                "name": "Pravas",
                "email": "pravas@quizo.com"
            },
            {
                "_id": "6817870585b50edad8c99498",
                "name": "Pravas 2",
                "email": "pravas2@quizo.com"
            }
        ],
        "attendees": [],
        "createdAt": "2025-05-05T09:54:25.424Z",
        "updatedAt": "2025-05-05T09:54:25.424Z",
        "__v": 0
    },
    ...
]
```

---

### Get Exam by ID (Both Admin and User)

**GET** `/api/exams/:id`

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
{
    "_id": "681893b25941e6ed559d7840",
    "title": "Final Term Mathematics Exam",
    "description": "Final exam for Mathematics",
    "examStatus": "active",
    "startTime": "2025-06-15T10:00:00.000Z",
    "duration": 60,
    "classFilter": [
        "XII",
        "X"
    ],
    "subject": "Math",
    "assignedto": [
        {
            "_id": "681723115fc98cc2c552cb58",
            "name": "Pravas",
            "email": "pravas@quizo.com"
        },
        {
            "_id": "6817870585b50edad8c99498",
            "name": "Pravas 2",
            "email": "pravas2@quizo.com"
        }
    ],
    "createdAt": "2025-05-05T10:32:18.600Z",
    "updatedAt": "2025-05-06T11:52:12.872Z",
    "__v": 1,
    "attendees": [
        {
            "userId": {
                "_id": "6817870585b50edad8c99498",
                "name": "Pravas 2"
            },
            "timeTaken": 600,
            "dateTaken": "2025-05-06T11:48:04.340Z",
            "_id": "6819f6f4500e06570efa5ce3"
        },
        {
            "userId": {
                "_id": "6817870585b50edad8c99498",
                "name": "Pravas 2"
            },
            "timeTaken": 600,
            "dateTaken": "2025-05-06T11:49:47.273Z",
            "_id": "6819f75b500e06570efa5cf6"
        },
        {
            "userId": {
                "_id": "6817870585b50edad8c99498",
                "name": "Pravas 2"
            },
            "timeTaken": 600,
            "dateTaken": "2025-05-06T11:52:12.872Z",
            "_id": "6819f7ec500e06570efa5d17"
        }
    ]
}
```
### Update Question (by Admin)

PUT `api/exams/:examId`

request:
```json
{
  "examStatus": "active",
        "classFilter": [
        "XII",
        "X"
    ]
}
```
Response:

```json
{
    "_id": "681893b25941e6ed559d7840",
    "title": "Final Term Mathematics Exam",
    "description": "Final exam for Mathematics",
    "examStatus": "active",
    "startTime": "2025-06-15T10:00:00.000Z",
    "duration": 60,
    "classFilter": [
        "XII",
        "X"
    ],
    "subject": "Math",
    "assignedto": [
        "681723115fc98cc2c552cb58",
        "6817870585b50edad8c99498",
        "6818a722006c213aebd40f52"
    ],
    "createdAt": "2025-05-05T10:32:18.600Z",
    "updatedAt": "2025-05-07T06:47:34.369Z",
    "__v": 2,
    "attendees": [
        {
            "userId": "6817870585b50edad8c99498",
            "timeTaken": 600,
            "dateTaken": "2025-05-06T11:48:04.340Z",
            "_id": "6819f6f4500e06570efa5ce3"
        },
        {
            "userId": "6817870585b50edad8c99498",
            "timeTaken": 600,
            "dateTaken": "2025-05-06T11:49:47.273Z",
            "_id": "6819f75b500e06570efa5cf6"
        },
        {
            "userId": "6817870585b50edad8c99498",
            "timeTaken": 600,
            "dateTaken": "2025-05-06T11:52:12.872Z",
            "_id": "6819f7ec500e06570efa5d17"
        }
    ]
}
```
### Delete Question (By Admin)

**DELETE** `/api/exams/:examId`

Deletes a question from an exam. Admin privileges are required.

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
{
    "message": "Question deleted successfully."
}
```


### Get Exams Attempted by a User (By Admin and User)

**GET** `/api/exams/attempts/:userId`

Fetches all exams attempted by a specific user.

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
[
    {
        "_id": "681893b25941e6ed559d7840",
        "title": "Final Term Mathematics Exam",
        "description": "Final exam for Mathematics",
        "examStatus": "active",
        "startTime": "2025-06-15T10:00:00.000Z",
        "duration": 60,
        "classFilter": [
            "XII",
            "X"
        ],
        "subject": "Math",
        "assignedto": [
            "681723115fc98cc2c552cb58",
            "6817870585b50edad8c99498",
            "6818a722006c213aebd40f52"
        ],
        "createdAt": "2025-05-05T10:32:18.600Z",
        "updatedAt": "2025-05-07T06:47:34.369Z",
        "__v": 2,
        "attendees": [
            {
                "userId": "6817870585b50edad8c99498",
                "timeTaken": 600,
                "dateTaken": "2025-05-06T11:48:04.340Z",
                "_id": "6819f6f4500e06570efa5ce3"
            },
            {
                "userId": "6817870585b50edad8c99498",
                "timeTaken": 600,
                "dateTaken": "2025-05-06T11:49:47.273Z",
                "_id": "6819f75b500e06570efa5cf6"
            },
            {
                "userId": "6817870585b50edad8c99498",
                "timeTaken": 600,
                "dateTaken": "2025-05-06T11:52:12.872Z",
                "_id": "6819f7ec500e06570efa5d17"
            }
        ]
    }
]
```

---

## ❓ Question Management

### Add Question (mcq/msq)

**POST** `/api/questions/:examId`
`questionImage` is optional, both `questionText` & `questionImage` can be given.
**Headers**

```
Authorization: Bearer <token>
```

**Request Body**

```json
{
  "questionText": "Which of the following are prime numbers?",
  "questionType": "msq",
  "options": [
    { "optionText": "2", "isCorrect": true },
    { "optionText": "4", "isCorrect": false },
    { "optionText": "7", "isCorrect": true },
    { "optionText": "9", "isCorrect": false }
  ],
  "correctAnswers": ["2", "7"],
  "mark": 3
}
```
**Response Body**

```json
{
    "_id": "681b0e46ee31e68687bb1fac",
    "examId": {
        "_id": "681893b25941e6ed559d7840",
        "title": "Final Term Mathematics Exam"
    },
    "questionText": "Which of the following are prime numbers?",
    "questionImage": null,
    "questionType": "msq",
    "options": [
        {
            "optionText": "2",
            "isCorrect": true,
            "_id": "681b0e46ee31e68687bb1fad"
        },
        {
            "optionText": "4",
            "isCorrect": false,
            "_id": "681b0e46ee31e68687bb1fae"
        },
        {
            "optionText": "7",
            "isCorrect": true,
            "_id": "681b0e46ee31e68687bb1faf"
        },
        {
            "optionText": "9",
            "isCorrect": false,
            "_id": "681b0e46ee31e68687bb1fb0"
        }
    ],
    "correctAnswers": [
        "2",
        "7"
    ],
    "mark": 3,
    "createdAt": "2025-05-07T07:39:50.277Z",
    "updatedAt": "2025-05-07T07:39:50.277Z",
    "__v": 0
}
```

### Update Question (By Admin)

**POST** `/api/questions/:examId`

Updates an existing question in an exam. Admin privileges are required.

**Headers**

```
Authorization: Bearer <token>
```

**Request Body (Form-Data)**

```
questionImage: <image file>
mark: 2
```

**Response**

```json
{
    "_id": "6818a1e963458f68944193b7",
    "examId": "681893b25941e6ed559d7840",
    "questionText": "Which of the following are prime numbers?",
    "questionImage": "/uploads/exam/questions/1746604545512-320134697.jpg",
    "questionType": "msq",
    "options": [
        {
            "optionText": "2",
            "isCorrect": true,
            "_id": "6818a39c63458f68944193d4"
        },
        {
            "optionText": "40",
            "isCorrect": false,
            "_id": "6818a39c63458f68944193d5"
        },
        {
            "optionText": "7",
            "isCorrect": true,
            "_id": "6818a39c63458f68944193d6"
        },
        {
            "optionText": "9",
            "isCorrect": false,
            "_id": "6818a39c63458f68944193d7"
        }
    ],
    "correctAnswers": [
        "2",
        "7"
    ],
    "mark": 2,
    "createdAt": "2025-05-05T11:32:57.935Z",
    "updatedAt": "2025-05-07T07:55:45.516Z",
    "__v": 0
}
```
### Delete a Question (By Admin)

**DELETE** `/api/questions/:questionId`

Deletes a question by its unique ID. Admin privileges are required.

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
{
    "message": "Question deleted successfully."
}
```

---

### Get Questions of an Exam (Assigned Users Only)

**GET** `/api/questions/exam/:examId`

Fetches all questions of a specific exam for users assigned to the exam.

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
[
    {
        "_id": "6818a1e963458f68944193b7",
        "examId": {
            "_id": "681893b25941e6ed559d7840"
        },
        "questionText": "Which of the following are prime numbers?",
        "questionImage": "/uploads/exam/questions/1746604545512-320134697.jpg",
        "questionType": "msq",
        "options": [
            {
                "optionText": "2",
                "isCorrect": true,
                "_id": "6818a39c63458f68944193d4"
            },
            {
                "optionText": "40",
                "isCorrect": false,
                "_id": "6818a39c63458f68944193d5"
            },
            {
                "optionText": "7",
                "isCorrect": true,
                "_id": "6818a39c63458f68944193d6"
            },
            {
                "optionText": "9",
                "isCorrect": false,
                "_id": "6818a39c63458f68944193d7"
            }
        ],
        "correctAnswers": [
            "2",
            "7"
        ],
        "mark": 2,
        "createdAt": "2025-05-05T11:32:57.935Z",
        "updatedAt": "2025-05-07T07:55:45.516Z",
        "__v": 0
    },
    ...
]
```

---

### Get Questions of an Exam (Admin)

**GET** `/api/questions/admin/:examId`

Fetches all questions of a specific exam for admin users.

**Headers**

```
Authorization: Bearer <token>
```

**Response**

```json
[
    {
        "_id": "681b0e46ee31e68687bb1fac",
        "examId": {
            "_id": "681893b25941e6ed559d7840",
            "title": "Final Term Mathematics Exam"
        },
        "questionText": "Which of the following are prime numbers?",
        "questionImage": null,
        "questionType": "msq",
        "options": [
            {
                "optionText": "2",
                "isCorrect": true,
                "_id": "681b0e46ee31e68687bb1fad"
            },
            {
                "optionText": "4",
                "isCorrect": false,
                "_id": "681b0e46ee31e68687bb1fae"
            },
            {
                "optionText": "7",
                "isCorrect": true,
                "_id": "681b0e46ee31e68687bb1faf"
            },
            {
                "optionText": "9",
                "isCorrect": false,
                "_id": "681b0e46ee31e68687bb1fb0"
            }
        ],
        "correctAnswers": [
            "2",
            "7"
        ],
        "mark": 3,
        "createdAt": "2025-05-07T07:39:50.277Z",
        "updatedAt": "2025-05-07T07:39:50.277Z",
        "__v": 0
    },
    ...
]
```

---

## 📊 Exam Attempt

### 📤 Submit Attempt

**POST** `/api/attempts/submit`

Submits a user's attempt for an exam.

#### Headers

```
Authorization: Bearer <token>
```

#### Request Body

```json
{
    "examId": "681893b25941e6ed559d7840",
    "timeTaken": 600,
    "answers": [
        {
            "questionId": "6818a4a363458f68944193f5",
            "selectedOptions": [
                "6818a4a363458f68944193f6",
                "6818a4a363458f56777393f8"
            ],
            "markedForReview": true
        }
    ]
}
```

#### Response

```json
{
        "message": "Attempt submitted successfully",
        "attempt": {
                "userId": "6817870585b50edad8c99498",
                "examId": "681893b25941e6ed559d7840",
                "responses": [
                        {
                                "questionId": "6818a4a363458f68944193f5",
                                "selectedOptions": [
                                        "6818a4a363458f68944193f6",
                                        "6818a4a363458f56777393f8"
                                ],
                                "markedForReview": true,
                                "isCorrect": false
                        }
                ],
                "totalQuestions": 3,
                "correctAnswers": 0,
                "wrongAnswers": 1,
                "score": 0,
                "timeTaken": 600,
                "_id": "681b1b477c92bc9dd748b4e6",
                "submittedAt": "2025-05-07T08:35:19.050Z",
                "createdAt": "2025-05-07T08:35:19.059Z",
                "updatedAt": "2025-05-07T08:35:19.059Z",
                "__v": 0
        }
}
```

---

### 👥 Get All Users Who Attempted the Test (By Admin)

**GET** `/api/attempts/exam/:examId`

Fetches all users who attempted a specific exam.

#### Headers

```
Authorization: Bearer <token>
```

#### Response

```json
{
        "examTitle": "Final Term Mathematics Exam",
        "attempts": [
                {
                        "name": "Pravas 2",
                        "rollNo": "QXII02",
                        "email": "pravas2@quizo.com",
                        "avatar": "/uploads/avatars/user.png",
                        "standard": "XII",
                        "score": 0,
                        "timeTaken": 600
                }
        ]
}
```

---

### 📋 Get All Tests Attempted by a User (By User/Admin)

**GET** `/api/attempts/user/:userId`

Fetches all exams attempted by a specific user.

#### Headers

```
Authorization: Bearer <token>
```

#### Response

```json
[
        {
                "title": "Final Term Mathematics Exam",
                "subject": "Math",
                "startTime": "2025-06-15T10:00:00.000Z",
                "timeTaken": 600,
                "score": 0
        }
]
```

---

### 🔍 Get Detailed Attempt Details of a User in an Exam (By User/Admin)

**GET** `/api/attempts/user/:userId/exam/:examId`

Fetches detailed attempt information of a user for a specific exam.

#### Headers

```
Authorization: Bearer <token>
```

#### Response

```json
{
        "user": {
                "name": "Pravas 2",
                "email": "pravas2@quizo.com",
                "rollNo": "QXII02",
                "standard": "XII"
        },
        "exam": {
                "title": "Final Term Mathematics Exam"
        },
        "timeTaken": 600,
        "totalQuestions": 3,
        "correctAnswers": 0,
        "wrongAnswers": 1,
        "score": 0,
        "responses": [
                {
                        "questionText": "Which of the following are prime numbers?",
                        "options": [
                                {
                                        "optionText": "2",
                                        "isCorrect": true,
                                        "_id": "6818a4a363458f68944193f6"
                                },
                                {
                                        "optionText": "4",
                                        "isCorrect": false,
                                        "_id": "6818a4a363458f68944193f7"
                                },
                                {
                                        "optionText": "7",
                                        "isCorrect": true,
                                        "_id": "6818a4a363458f68944193f8"
                                },
                                {
                                        "optionText": "9",
                                        "isCorrect": false,
                                        "_id": "6818a4a363458f68944193f9"
                                }
                        ],
                        "correctAnswers": [
                                "2",
                                "7"
                        ],
                        "selectedOptions": [
                                "6818a4a363458f68944193f6",
                                "6818a4a363458f56777393f8"
                        ],
                        "isCorrect": false,
                        "markedForReview": true
                }
        ]
}
```

---
