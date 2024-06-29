# @desc
A medical checkup packages management API. Inlcudes CRUD functionality of clinics, checkup packages and reviews, and users or authentication login.

# Packages, framwork and tech stack 
- express
- nodemon  port watching
- dotenv
- morgan  middleware

# URL structure
- /api/v1//clinics
  - GET Show all clinics, public
  - POST Add new clinic to the database, private 
- /api/v1/clinics/:id
  - GET show single clinic, public
  - PUT Update clinic, private
  - DELETE Delete clinic, private
