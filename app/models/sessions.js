import jwt from 'jsonwebtoken';
import  { sessions } from '../data/sessionData'
import client from '../services/database';

class Session {
    constructor(mentor_id, questions, mentee_id, mentee_email){
        this.mentor_id = mentor_id;
        this.questions = questions;
        this.mentee_id = mentee_id;
        this.mentee_email = mentee_email;
       
        
    }
    createSession(){
        const sessionQuery ='INSERT INTO sessions (mentor_id, questions, mentee_id, mentee_email) VALUES($1,$2,$3,$4) returning *';
        const values = [this.mentor_id, this.questions, this.mentee_id, this.mentee_email]
        return client.query(sessionQuery, values); 
    }
   
    static sessionAlreadyExist(questions,mentor_id){
        const query = 'SELECT * FROM sessions WHERE questions=$1 and mentor_id = $2 '
           return client.query(query, [questions,mentor_id]);   
       }

   
   
    static acceptMentorshipSession(session_id){ 
        const acceptSession = `UPDATE sessions SET status='accepted' WHERE session_id= $1 RETURNING *`;
        return client.query(acceptSession, [session_id]);
       
     } 
    static getSessionById(session_id){
     const session = `SELECT * FROM sessions WHERE session_id = $1`;
      return client.query(session,[session_id])
    }

    static rejectSession(session_id){ 
        const rejectSession = `UPDATE sessions SET status='rejected' WHERE session_id= $1 RETURNING *`;
        return client.query(rejectSession, [session_id]);
     } 
}
 
export default Session;    