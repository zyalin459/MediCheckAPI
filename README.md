# @desc
A medical checkup packages management API. Inlcudes CRUD functionality of clinics, checkup packages and reviews, and users or authentication login.

# Packages & framework
- express
- nodemon  port watching
- dotenv
- morgan  middleware
- mongoose cloud MongoDB database connection
- colors custormize console.log output style
- slugify when create a model, slugify its name
- node-geocoder geoAPI, choosen provider for this project: mapquest. [More info](https://github.com/nchaulet/node-geocoder)

# URL structure
- /api/v1//clinics
  - GET Show all clinics, public
  - POST Add new clinic to the database, private 
- /api/v1/clinics/:id
  - GET show single clinic, public
  - PUT Update clinic, private
  - DELETE Delete clinic, private
