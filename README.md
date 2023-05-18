# Nuxt 3 Reqres App

## Overview

This was my first vue/nuxt app that I have built. It leverages nuxt server side routs to act as an authentication/rest middle ware to reqres.in. It took me a while to learn some of the nuances for vue and nuxt, but once I got the hang of it I managed to accomplish alot. I didn't prioritize styling as much because I felt the server functionality took precidence. I may have went a little over board with the user join and login features not relizing that I had added edge cases that where not compatible with the reqres.in api. On hitting the page I'm leveraging nuxt's plugin directory to ping my authorization routes and checking for session data. Client side I am using an auth composable to handle initial render, login, and create user cases. All of which post to the server with thier respected body and update the the server context. I have most of these inside v1 routes to keep some flexibility in upgrading or transitioning to 3rd party auth or breaking away the nuxt server into a standalone node.js deployment

## Setup
create a .env file in the root dir and make sure to add at least cookie name and secrete


Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Testing 

### Create User
Create user doesnt work because edge cases I made checking if user already exists in reqres. Create user for reqres needs to use a customer that already exists. 

#### Cases
- no password or email submit
- submit user that exists (should return 400)
- submit user that doesnt exists (returns 400 from reqres)

### Login
log in can work with users such as rachel.howell@reqres.in. Because Reqres doesnt actually have passwords you need to use the email as a password aswell so that the bycrypt can run and let you through.

#### Cases
- no password or email
- right email but bad password
- right password and email

## Server

### Available routes

#### Auth

##### \v1\auth\login POST
req body
```
{
    password: String,
    rememberMe: Boolean,
}
```

Success 
```
{
    id: Number
    username: String,
    firstName: String,
    LastName: String,
    password: Hashed String,
    rememberMe: Boolean,
    token: Token String
}
```
Failure
```
{
    statusCode: Number,
    message: String
}
```
##### \v1\auth\logout POST

Success 
```
null
```

#### API

##### api\v1\user\create

req body
```
{
    password: String,
    rememberMe: Boolean,
}
```

Success 
```
{
    id: Number
    username: String,
    firstName: String,
    LastName: String,
    password: Hashed String,
    rememberMe: Boolean,
    token: Token String
}
```
Failure
```
{
    statusCode: Number,
    message: String
}
```

## Testing

Currently I'm using vitest. See docs [HERE](https://vitest.dev/guide/) 

to run tests
```
npm run test
```
## TODO

In Order of Importance

- Add CRUD Lists
- Add unit tests
- Add selenium tester
- Add browser tests
- Add moar better styles
- Refactor current components/routes
- Add Local Caching
- Add Server Caching
