# API secured by registration/login

## Summary
This is a user login and registration Rest API, developped with Node.js, ES6, Express and MongoDB. Mongoose is used as ODM library for MongoDB.
bcrypt library is used for password encryption and jsonwebtoken is used to identify an authenticated user.

## Getting Started
You need to install : npm, Node.js, express, mongoose, jsonwebtoken and bcryptjs.

## Usage
Testing is performed with Postman.

* /register endpoint
```
POST localhost:5000/api/register
json body:
{
    email: "test@mail.com"
    password: "password_test"   
}

Output: 
{
    "message": "User registered successfully"
}
```

* /login endpoint
```
POST localhost:5000/api/login
json body:
{
    email: "test@mail.com"
    password: "password_test"   
}

Output: 
{
    "message": "LoggedIn Successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWQ0ZTc1YzU0NGRiNmJhZmEyM2JmZSIsImlhdCI6MTY4MzgzNjU5NCwiZXhwIjoxNjg0MDA5Mzk0fQ.RSIDzfUhJZJYcYIUEtBQL4tZvaZf_tqrDywBoaI-koo"
}
```

* /users endpoint
```
GET localhost:5000/api/users
Bearer token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWQ0ZTc1YzU0NGRiNmJhZmEyM2JmZSIsImlhdCI6MTY4MzgzNjU5NCwiZXhwIjoxNjg0MDA5Mzk0fQ.RSIDzfUhJZJYcYIUEtBQL4tZvaZf_tqrDywBoaI-koo

Output: 
{
    "users": [
        {
            "_id": "645cb38e1758a7e00ef288f7",
            "email": "test@mail.com",
            "password": "$2b$10$ELj5Oc1djj.gn2NysbkHk.KBKdcQ5KicTzWbVZQVo6w83o6Uh5WOy",
            "__v": 0
        },
        {
            "_id": "645cfeda6299ffdd5739a52c",
            "email": "testbis@mail.com",
            "password": "$2b$10$UD7iRcnp.vfqPckXs/munu9HmGwB3E17tJUzJvYcyevzNdI5V0vwG",
            "__v": 0
        }
   ]
}
```
