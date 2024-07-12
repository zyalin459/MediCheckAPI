# @desc

A medical checkup packages management API. Inlcudes CRUD functionality of clinics, checkup packages and reviews, and users or authentication login.

# npm Packages

- `express`
- `nodemon` port watching
- `dotenv` can access `process.env`
- `morgan` middleware
- `mongoose` cloud MongoDB database connection
- `colors` custormize console.log output style
- `slugify` when create a model, slugify its name
- `node-geocoder` geoAPI, choosen provider for this project: mapquest. [More info](https://github.com/nchaulet/node-geocoder)
- `express-fileupload`
- `jsonwebtoken` get Json Web Token
- `bcryptjs` encrypt password
- `cookie-parser` to send token in a cookie

# URL structur

(All GET request are public, and private otherwise)

- /api/v1/clinics
  - GET Show all clinics, public
  - POST Add new clinic to the database, private
- /api/v1/clinics/:id
  - GET show single clinic, public
  - PUT Update clinic, private
  - DELETE Delete clinic, private
- /api/v1/clinics/:id/photo

  - PUT Upload photo of clinic

- /api/v1/services
  - GET services
- /api/v1/clinics/:id/services
  - GET show services for clinic
  - POST create service for clinic
- /api/v1/clinics/:id

  - GET show single service
  - PUT update service
  - DELETE delete service from database

- /api/v1/users/register
- /api/v1/users/login
- /api/v1/users/me
