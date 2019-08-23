# Free-mentors-API

[![Build Status](https://travis-ci.org/Ayesiza/Free-mentors-API.svg?branch=develop)](https://travis-ci.org/Ayesiza/Free-mentors-API)

[![Coverage Status](https://coveralls.io/repos/github/Ayesiza/Free-mentors-API/badge.svg?branch=develop)](https://coveralls.io/github/Ayesiza/Free-mentors-API?branch=develop)

[![Maintainability](https://api.codeclimate.com/v1/badges/912fd1e46671be35c9fb/maintainability)](https://codeclimate.com/github/Ayesiza/Free-mentors-API/maintainability)


## Description
Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions

## Language used

Javascript/Nodejs

###### server-side frameworks

Node/Express

## Install

Before starting  the  following software  installed on the development machine

`run npm install` to install the node packages

Have Nodemon installed globally by running 

`npm i nodemon -g`

## Run the app

A step by step examples on how to get application development environment running

1. run  `npm i`

To install all the necessary packages on your local computer

To start your sever `npm start`

This will start your application and run on port 3000

## Run the tests

The following are install

Mocha/chai 

should

supertest

run  `npm run test` 

### Endpoints  : Route('api/v1/')

Method| Route |Action/End point | Access 
---------|-----------------|--------------------|-----------
POST | `('/users/auth/signup')` |Create/signUp | Users 
POST |`('/users/auth/signin')` | Login/sigIn | Users  
PATCH | `('/users/:id')` | Change user to mentor | Admin 
GET | `('/mentors')` | All mentors | Users 
GET | `('/mentor/:id')` | Specific mentor | Users
POST | `('/sessions')` | Create MentorShip Session | Users 
PATCH | `('/sessions/:id/accept')` | Accept Mentorship Session | Mentor 
PATCH |`('/sessions/:id/reject')` | Reject Mentorship Session | Mentor

#### Pivotal Tracker story board

https://www.pivotaltracker.com/n/projects/2379596

#### gh-pages for UI




### Status Codes used

###### Success Response:

code: 200 OK

code: 201 CREATED

###### Error Response:

Code: 404 NOT FOUND 

Code: 400 BAD REQUEST

Code: 403 UNAUTHORIZED 

Code: 405 METHOD NOT ALLOWED

#### server Error

code: 500 INTERNAL SERVER ERROR

### Author

- Ayesiza Hawah


### Acknowledgments
 
 - My thanks goes to my Learning Facilitators and Team members


