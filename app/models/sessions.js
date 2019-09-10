import jwt from 'jsonwebtoken';
import  { sessions } from '../data/sessionData'
import client from '../services/database';

class Session {
    constructor(mentorId, questions, menteeId, menteeEmail){
        this.mentorId = mentorId;
        this.questions = questions;
        this.menteeId = menteeId;
        this.menteeEmail = menteeEmail;
       
        
    }
    createSession(){
        const sessionQuery ='INSERT INTO sessions (mentorId, questions, menteeId, menteeEmail) VALUES($1,$2,$3,$4) returning *';
        const values = [this.mentorId, this.questions, this.menteeId, this.menteeEmail]
        return client.query(sessionQuery, values); 
    }
   
    static sessionAlreadyExist(questions,mentorId){
        const query = 'SELECT * FROM sessions WHERE questions=$1 and mentorId = $2 '
           return client.query(query, [questions,mentorId]);   
       }

   
   
    static acceptMentorshipSession(sessionId){ 
        const acceptSession = `UPDATE sessions SET status='accepted' WHERE sessionId= $1 RETURNING *`;
        return client.query(acceptSession, [sessionId]);
       
     } 
    static getSessionById(sessionId){
     const session = `SELECT * FROM sessions WHERE sessionId = $1`;
      return client.query(session,[sessionId])
    }

    static rejectSession(sessionId){ 
        const rejectSession = `UPDATE sessions SET status='rejected' WHERE sessionId= $1 RETURNING *`;
        return client.query(rejectSession, [sessionId]);
     } 
}
 
export default Session;    