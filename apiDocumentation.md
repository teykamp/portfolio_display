# Complete REST API Documentation

Our API is split into 2 different top level routes ([/accounts](#accounts) & [/portfolios](#portfolios)).

## <span id="accounts" style="text-decoration: underline;">Accounts Interface<span>

#### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px;">GET</span><br>
###  All Accounts</b>
<i>Response:</i> Array containing all account documents (objects)
<br>
<i>Full Route:</i> ```/api/accounts```

#### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px;">GET</span><br>
###  Account By Username</b>
<i>Response:</i> Object containing all account details as properties
<br>
<i>Full Route:</i> ```/api/accounts/{username}```

#### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px;">GET</span><br>
###  If A Username Is Taken</b>
<i>Response:</i> Boolean (true if taken | false if not taken)
<br>
<i>Full Route:</i> ```/api/accounts/{username}/istaken?```

#### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px;">GET</span><br>
###  All Account IDs With The Same Username</b>
<i>Response:</i> Array containing all account objects
<br>
<i>Full Route:</i> ```/api/accounts/all/{username}```
<br>
<i>Note:</i> This route was created for a specific use case in src/views/AuthPage, there should never be accounts that share the same username!

#### <b><span style="background-color: #fd7e14; padding: 1px 5px 1px 5px;">POST</span><br>
###  New Account</b>
<i>Response:</i> MongoDB Posted Document Confirmation Object
<br>
<i>Full Route:</i> ```/api/accounts```
<br>
<i>Requirements:</i> Body must contain the following properties: { username, password } to conform to schema.

#### <b><span style="background-color: #dc3545; padding: 1px 5px 1px 5px;">DELETE</span><br>
###  Account By ID</b>
<i>Response:</i> MongoDB Deleted Document Confirmation Object
<br>
<i>Full Route:</i> ```/api/accounts/{_id}```
<br>
<i>Note:</i> Every document in a MongoDB collection contains an "_id" property that is unique to that specific document.

## <span id="portfolios" style="text-decoration: underline;">Portfolios Interface<span>

#### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px;">GET</span><br>
###  All Portfolios</b>
<i>Response:</i> Array containing all portfolio documents (objects)
<br>
<i>Full Route:</i> ```/api/portfolios```

#### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px;">GET</span><br>
###  Portfolio Object By Username</b>
<i>Response:</i>  An object containing the portfolio item that corrosponds to the username of the request
<br>
<i>Full Route:</i> ```/api/portfolios/{username}```

#### <b><span style="background-color: #fd7e14; padding: 1px 5px 1px 5px;">POST</span><br>
###  New Portfolio</b>
<i>Response:</i> MongoDB Post Confirmation Object
<br>
<i>Full Route:</i> ```/api/portfolios```
<br>
<i>Requirements:</i> Post requests made to this route must conform to schema validation, therefore the body of the request must include the following properties: { username: String, portfolioItem: Object } to be successfully added to the cluster 

#### <b><span style="background-color: #198754; padding: 1px 5px 1px 5px;">PUT</span><br>
###  Portfolio Object By Username</b>
<i>Response:</i> MongoDB Put Confirmation Object
<br>
<i>Full Route:</i> ```/api/portfolios/{username}```
<br>
<i>Requirements:</i> New portfolio item must be specified in the body of the request, the request is matched to the document through the username that is specified in the route param

#### <b><span style="background-color: #dc3545; padding: 1px 5px 1px 5px;">DELETE</span><br>
###  Portfolio By ID</b>
<i>Response:</i> MongoDB Delete Confirmation Object
<br>
<i>Full Route:</i> ```/api/portfolios/{_id}```
<br>
<i>Note:</i> ID is the MongoDB '_id' property, which each document has

#### <b><span style="background-color: #0d6efd; padding: 1px 5px 1px 5px;">GET</span><br>
###  Portfolio Object By Username - Offline (Deprecated)</b>
<i>Response:</i> An object containing the portfolio item that corrosponds to the username of the request
<br>
<i>Full Route:</i> ```/api/portfolios/offline/{username}```
<br>
<i>Warning:</i> This request utilizes the deprecated custom written offline API created for offline UI/API testing. Expect unreliable data!




