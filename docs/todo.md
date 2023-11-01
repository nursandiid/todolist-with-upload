# Todo API Spec

## Get All Todos
Endpoint : GET /api/todos

Query Params :
- `is_completed` : 1, 0 optional
- `has_due_date` : 1, 0 optional

Response Body :
```json
{
    "data": [
        {
            "_id": "6540ad607acb765a04fd9a55",
            "todo": "Todo 1",
            "due_date": "new Date()",
            "is_completed": true
        },
        {
            "_id": "6540ad607acb765a04fd9a53",
            "todo": "Todo 2",
            "due_date": "new Date()",
            "is_completed": false
        }
    ],
    "message": "OK"
}
```

## Create Todo
Endpoint : POST /api/todos

Request Body :
```json
{
    "todo": "Todo 1",
    "due_date": "new Date()",
}
```

Response Body Success :
```json
{
    "data": {
        "_id": "6540ad607acb765a04fd9a55",
        "todo": "Todo 1",
        "due_date": "new Date()",
        "is_completed": false
    },
    "message": "Created"
}
```

Response Body Error :
```json
{
    "errors": [
        {
            "name": "todo",
            "message": "todo is required",
        }
    ],
    "message": "Unprocessable Entities"
}
```

## Get Todo
Endpoint : GET /api/todos/:todoId

Request Params :
`todoId`

Response Body Success :
```json
{
    "data": {
        "_id": "6540ad607acb765a04fd9a55",
        "todo": "Todo 1",
        "due_date": "new Date()",
        "is_completed": true
    },
    "message": "OK"
}
```

Response Body Error :
```json
{
    "message": "Todo is not found"
}
```

## Update Todo
Endpoint : PUT /api/todos/:todoId

Request Params :
`todoId`

Request Body :
```json
{
    "todo": "Todo 1 updated",
    "due_date": "new Date()",
}
```

Response Body Success :
```json
{
    "data": {
        "_id": "6540ad607acb765a04fd9a55",
        "todo": "Todo 1 updated",
        "due_date": "new Date()",
        "is_completed": false
    },
    "message": "Updated"
}
```

Response Body Error :
```json
{
    "message": "Todo is not found"
}
```

```json
{
    "errors": [
        {
            "name": "todo",
            "message": "todo is required",
        }
    ],
    "message": "Unprocessable Entities"
}
```

## Delete Todo
Endpoint : DELETE /api/todos/:todoId

Request Params :
`todoId`

Response Body Success :
```json
{
    "data": null,
    "message": "Deleted"
}
```

Response Body Error :

```json
{
    "message": "Todo is not found"
}
```

## Toggle Completed Todo
Endpoint : PATCH /api/todos/:todoId/toggle

Request Params :
`todoId`

Request Body :
```json
{
    "is_completed": 1
}
```

Response Body Success :
```json
{
    "data": {
        "_id": "6540ad607acb765a04fd9a55",
        "todo": "Todo 1 updated",
        "due_date": "new Date()",
        "is_completed": true
    },
    "message": "Updated"
}
```

Response Body Error :
```json
{
    "errors": [
        {
            "name": "is_completed",
            "message": "is_completed is required",
        }
    ],
    "message": "Unprocessable Entities"
}
```