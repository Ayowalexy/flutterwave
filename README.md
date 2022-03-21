# flutterwave
run npm start to start development server on port 5000

The compute-transaction api returns response in less than 50ms in the development environment but due to commnunication with
external endpoints like the mongoDB instance, the response time is reduced.

The body of the /fees endpoint is parsed by splitting the request by the newline character.

JSONWEBTOKEN are used to encrypt the parsed data from the /fees endpoint and stored on the requestion session, utilizing mongoDB
