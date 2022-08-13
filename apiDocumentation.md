# Complete REST API Documentation

Our API is split into 2 different top level routes (/accounts & /portfolios).

## Accounts Interface

### Action: Get All Accounts
Method: GET
Response: Array containing all account documents (objects)
Full Route: /api/accounts

### Action: Get Individual Account By Username
Method: GET
Response: Object containing all account details as properties
Full Route: /api/accounts/{username}

### Action: Find Out If A Username Is Taken
Method: GET
Response: Boolean (true if taken | false if not taken)
Full Route: /api/accounts/{username}/istaken?

### Action: Get All Account IDs With Same Username
Method: GET
Response: Array containing all account objects
Full Route: /api/accounts/all/{username}
Note: This route was created for a specific use case in src/views/AuthPage, there should never be accounts that share the same username!

### Action: Post New Account
Method: POST
Response: MongoDB Posted Document Confirmation Object
Full Route: /api/accounts
Requirements: Body must contain the following properties: { username, password } to conform to schema.

### Action: Delete Account By _id
Method: DELETE
Response: MongoDB Deleted Document Confirmation Object
Full Route: /api/accounts/{_id}
Note: Every document in a MongoDB collection contains an "_id" property that is unique to that specific document.

## Portfolios Interface

### Action: Get All Portfolios
Method: GET
Response: Array containing all portfolio documents (objects)
Full Route: /api/portfolios

### Action: Get Portfolio By Username
Method: GET
Response: An object containing the portfolio item that is attached to the username
Full Route: /api/portfolios/{username}

### Action: Post Portfolio
Method: POST
Response: MongoDB Post Confirmation Object
Full Route: /api/portfolios
Note: Post requests made to this route must conform to schema validation, therefore the body of the request must include the following properties: { username: String, portfolioItem: Object } to be successfully added to the cluster

### Action: Update Portfolio By Username
Method: PUT
Response: MongoDB Put Request Confirmation Object
Full Route: /api/portfolios/{username}
Note: New portfolio item must be specified in the body of the request, the request is matched to the document through the username that is specified in the route param

### Action: Delete Portfolio By ID
Method: DELETE
Response: MongoDB Delete Confirmation Object
Full Route: /api/portfolios/{_id}
Note: ID is the MongoDB '_id' property, which each document has

### Action: Get Portfolio By Username Offline (Deprecated)
Method: GET
Response: An object containing the portfolio item that is attached to the username
Full Route: /api/portfolios/offline/{username}
Note: This request utilizes the deprecated custom written offline API created for offline UI/API testing. Expect unreliable data!




