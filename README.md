# Test task for incode-group

## INSTALL APP

1. `docker-compose up -d --build` <- install MYSQL database with docker.

2. `npm install` <- install dependencies for server-app.

3. `npm run start` <- start server on 3000 port.

## REST API endpoints

### auth user

`/auth/register` - POST request, params:

username must be between 6 and 16 characters. (required)

password must be between 8 and 16 characters. (required)

boss id - choose boss by id.

role id - choose role (admin, boss, user) (required)

`/auth/login` - POST request,

params (username, password)

### list users

`/list` -- GET request.

gets all users as a nested list.

### auth list

when the user is logged in, he is given a token,

`/auth/profile` -- GET request only for authorized users:

if user is admin -- gets all users as a nested list.

if user is boss -- get list of all subordinate users.

if regular user -- get information only about itself.
