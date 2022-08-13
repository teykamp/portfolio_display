# Complete REST API Documentation

Our API is split into 2 different top level routes (/accounts & /portfolios).

## <span style="text-decoration: underline;">Accounts Interface<span>

<br>

### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px; margin-right: 8px;">GET</span>Get All Accounts</b>
<i>Response:</i> Array containing all account documents (objects)
<br>
<i>Full Route:</i> ```/api/accounts```

### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px; margin-right: 8px;">GET</span>Get Individual Account By Username</b>
<i>Response:</i> Object containing all account details as properties
<br>
<i>Full Route:</i> ```/api/accounts/{username}```

### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px; margin-right: 8px;">GET</span>Find Out If A Username Is Taken</b>
<i>Response:</i> Boolean (true if taken | false if not taken)
<br>
<i>Full Route:</i> ```/api/accounts/{username}/istaken?```

### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px; margin-right: 8px;">GET</span>Get All Account IDs With Same Username</b>
<i>Response:</i> Array containing all account objects
<br>
<i>Full Route:</i> ```/api/accounts/all/{username}```
<br>
<i>Note:</i> This route was created for a specific use case in src/views/AuthPage, there should never be accounts that share the same username!

### <b><span style="background-color: #fd7e14; padding: 1px 5px 1px 5px; margin-right: 8px;">POST</span>Post New Account</b>
<i>Response:</i> MongoDB Posted Document Confirmation Object
<br>
<i>Full Route:</i> ```/api/accounts```
<br>
<i>Requirements:</i> Body must contain the following properties: { username, password } to conform to schema.

### <b><span style="background-color: #dc3545; padding: 1px 5px 1px 5px; margin-right: 8px;">DELETE</span>Delete Account By ID</b>
<i>Response:</i> MongoDB Deleted Document Confirmation Object
<br>
<i>Full Route:</i> ```/api/accounts/{_id}```
<br>
<i>Note:</i> Every document in a MongoDB collection contains an "_id" property that is unique to that specific document.

## Portfolios Interface

### <b>Get All Portfolios
Method: GET
Response: Array containing all portfolio documents (objects)
Full Route: /api/portfolios

### <b>Get Portfolio By Username
Method: GET
Response: An object containing the portfolio item that is attached to the username
Full Route: /api/portfolios/{username}

### <b>Post Portfolio
Method: POST
Response: MongoDB Post Confirmation Object
Full Route: /api/portfolios
Note: Post requests made to this route must conform to schema validation, therefore the body of the request must include the following properties: { username: String, portfolioItem: Object } to be successfully added to the cluster

### <b>Update Portfolio By Username
Method: PUT
Response: MongoDB Put Request Confirmation Object
Full Route: /api/portfolios/{username}
Note: New portfolio item must be specified in the body of the request, the request is matched to the document through the username that is specified in the route param

### <b>Delete Portfolio By ID
Method: DELETE
Response: MongoDB Delete Confirmation Object
Full Route: /api/portfolios/{_id}
Note: ID is the MongoDB '_id' property, which each document has

### <b>Get Portfolio By Username Offline (Deprecated)
Method: GET
Response: An object containing the portfolio item that is attached to the username
Full Route: /api/portfolios/offline/{username}
Note: This request utilizes the deprecated custom written offline API created for offline UI/API testing. Expect unreliable data!




