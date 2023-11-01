# NodeJS Express TodoList with Upload

A demo project todolist with NodeJS & Express. There is feature to upload single or multiple file

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

### API Spec
- [Todo API](./docs/todo.md)
- [Upload API](./docs/upload.md)