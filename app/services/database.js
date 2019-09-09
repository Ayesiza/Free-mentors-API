import { Client } from 'pg';
import dotenv from 'dotenv';

 dotenv.config();

const client = process.env.NODE_ENV === 'test'
? new Client({connectionString:process.env.TEST_DATABASE})
: new Client({connectionString:process.env.DATABASE_STRING})

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
if (process.env.NODE_ENV === 'test') {
    client.query('drop table if  exists sessions')
    client.query('drop table if  exists sessionsReviews')
    client.query('drop table if  exists users')
    client.query(users)
    client.query(sessions)
    client.query(sessionsReviews)

} else {
    client.query(users)
    client.query(sessions)
    client.query(sessionsReviews)
}



export default client;
