# Upload API Spec

## Get All Files
Endpoint : GET /api/todos/:todoId/files

Response Body :
```json
{
    "data": [
        {
            "_id": "6540ad607acb765a04fd9a55",
            "label": "File1",
            "filepath": "/storage/upload/file1.png"
        }
    ],
    "message": "OK"
}
```

## Create File
Endpoint : POST /api/todos/:todoId/files

Request Body :
```json
{
    "filepath": "[upload]",
}
```

Response Body Success :
```json
{
    "data": {
        "_id": "6540ad607acb765a04fd9a55",
        "label": "File1",
        "filepath": "/storage/upload/file1.png"
    },
    "message": "Created"
}
```

Response Body Error :
```json
{
    "errors": [
        {
            "name": "filepath",
            "message": "filepath is required",
        }
    ],
    "message": "Unprocessable Entities"
}
```

## Get File
Endpoint : GET /api/todos/:todoId/files/:fileId

Request Params :
`todoId`, `fileId`

Response Body Success :
```json
{
    "data": {
        "_id": "6540ad607acb765a04fd9a55",
        "label": "File1",
        "filepath": "/storage/upload/file1.png"
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

```json
{
    "message": "File is not found"
}
```

## Update File
Endpoint : PUT /api/todos/:todoId/files/:fileId

Request Params :
`todoId`, `fileId`

Request Body :
```json
{
    "filepath": "[upload]",
}
```

Response Body Success :
```json
{
    "data": {
        "_id": "6540ad607acb765a04fd9a55",
        "label": "File1",
        "filepath": "/storage/upload/file1.png"
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
    "message": "File is not found"
}
```

```json
{
    "errors": [
        {
            "name": "filepath",
            "message": "filepath is required",
        }
    ],
    "message": "Unprocessable Entities"
}
```

## Delete Todo
Endpoint : DELETE /api/todos/:todoId/files/:fileId

Request Params :
`todoId`, `fileId`

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

```json
{
    "message": "File is not found"
}
```