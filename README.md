# Node-RESTful-Api
Created a simple API using Node.js, Express.js &amp; MongoDB
This API simulates a shop API, which is built by considering MVC architecture.
API comprises of 3 document schemas that are of order, product and user.
Funactionalities of this API:-
1) It enables the client to post an order, get all orders or a specific order & to delete an order.
2) It enables the client to post a product,upadte a product, get a specific product or all products & delete a product.
3) It also enables the client to signup a user, login the user, get all users & delete a user.
4) It also has a fundamental error handling to handle the errors on server and client side.
5) It also showcase the ability to add a image.
6) It also comprises of proper authorisation like JWT signing and route protection for accessing most of the routes.

Navigation to the project:-
Node-Rest-Shop folder consist of server.js file which consist of all the logic regarding creating a server and listening to that server.
App.js file consist of all the app logic like adding middlewares, mounting routes, handling errors,etc.
api folder inside Node-Rest-Shop consist of routes, controller, model and auth folder which consist of file which are created with MVC architecture.
Routes folder consist of files which specify the routes and http methods.
model folder consist of files which specifies schema for different documents.
controller folder consist of files which specifies functionalies of various routes.
auth folder consist of file with is responsible for authentication.

Note- This API is only for learning and practice purpose, please don't use database connection url and password for your own project. You can refer to this API for learning and brushing up your concepts.
