import { Client } from 'pg';
import dotenv from 'dotenv';

 dotenv.config();

const client = new Client({
    connectionString:process.env.DATABASE_STRING
    
});

const users = `create table if not exists
      users (
        id serial primary key,
        firstName varchar (50) not null,
        lastName varchar (50) not null,
        email varchar (50)  not null,
        password varchar (500)  not null,
        address varchar (50) not null,
        bio varchar (50) not null,
        occupation varchar(255) not null,
        expertise varchar(255) not null,
        admin boolean  not null,
        mentor boolean  not null
       )`;
 
const sessions = `create table if not exists
    sessions(
        sessionId serial primary key,
        mentorId int not null,
        questions varchar (500)  not null,
        menteeId int not null,
        menteeEmail varchar (100)  not null,  
        status varchar (50) default 'pending' not null
    )`;
const sessionsReviews =`create table if not exists
sessionReviews(
    sessionId serial primary key,
    mentorId int not null,
    menteeId int not null,
    score int not null,
    menteeFullName varchar (50)  not null,  
    remarks varchar (100)  not null
)`;


client.connect()
.then(() => console.log('connected successfully . . .'))
.then(() => client.query(users))
.then(() => client.query(sessions))
.then(() => client.query(sessionsReviews))
.catch(e => console.log(e.message))


export default client;
