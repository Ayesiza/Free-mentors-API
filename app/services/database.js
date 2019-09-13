import { Client } from 'pg';
import dotenv from 'dotenv';

 dotenv.config();

const client = process.env.NODE_ENV === 'test'
? new Client({connectionString:process.env.TEST_DATABASE})
: new Client({connectionString:process.env.DATABASE_URL, ssl:true})

const users = `create table if not exists
      users (
        id serial primary key,
        first_name varchar (50) not null,
        last_name varchar (50) not null,
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
        session_id serial primary key,
        mentor_id int not null,
        questions varchar (500)  not null,
        mentee_id int not null,
        mentee_email varchar (100)  not null,  
        status varchar (50) default 'pending' not null
    )`;
const sessionReviews =`create table if not exists
sessionReviews(
    session_id serial primary key,
    mentor_id int not null,
    mentee_id int not null,
    score int not null,
    mentee_full_name varchar (50)  not null,  
    remarks varchar (100)  not null
)`;


client.connect()
if (process.env.NODE_ENV === 'test') {
    client.query('drop table if  exists sessions')
    client.query('drop table if  exists sessionReviews')
    client.query('drop table if  exists users')
    client.query(users)
    client.query(sessions)
    client.query(sessionReviews)
} else {
    client.query(users)
    client.query(sessions)
    client.query(sessionReviews)
}



export default client;
