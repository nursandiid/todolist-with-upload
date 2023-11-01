# NodeJS Express TodoList with Upload

A demo project todolist with NodeJS & Express. There is feature to upload single or multiple file.

## Endpoints :
Todo Endpoints :
- GET /api/todos
- POST /api/todos
- GET /api/todos/{todoId}
- PUT /api/todos/{todoId}
- DELETE /api/todos/{todoId}

Upload Endpoints :
- GET /api/todos/:todoId/files
- POST /api/todos/:todoId/files
- GET /api/todos/:todoId/files/:fileId
- PUT /api/todos/:todoId/files/:fileId
- DELETE /api/todos/:todoId/files/:fileId

## API Spec
- [Todo API](./docs/todo.md)
- [Upload API](./docs/upload.md)

## Folder Sturcture
```md
.
├── docs
│   ├── todo.md
│   └── upload.md
├── src
│   ├── applications
│   │   ├── database.js
│   │   ├── upload.js
│   │   └── web.js
│   ├── controllers
│   │   ├── todo.controller.js
│   │   └── upload.controller.js
│   ├── errors
│   │   └── message.error.js
│   ├── middleware
│   │   └── error.middleware.js
│   ├── models
│   │   ├── Todo.js
│   │   └── Upload.js
│   ├── responses
│   │   ├── error.response.js
│   │   └── success.response.js
│   ├── routes
│   │   ├── todos.js
│   │   └── uploads.js
│   ├── utils
│   │   └── helpers.js
│   ├── validations
│   │   ├── todo.validation.js
│   │   ├── upload.validation.js
│   │   └── validation.js
│   └── server.js
├── storage
│   └── uploads
├── test
│   ├── feature
│   │   ├── todo.test.js
│   │   ├── upload.test.js
│   │   └── welcome.test.js
│   ├── filetest
│   │   └── 1.png
│   ├── unit
│   └── utils.js
├── babel.config.json
├── package-lock.json
├── package.json
└── README.md
```

## Run

Run your app. If you already have nodemon installed you can run this.

```sh
npm start
```

Or if not, you can run this.

```sh
node src/server.js
```

That's it.