import jwt from 'jsonwebtoken';
import  { sessions } from '../data/sessionData'
class Session {
    constructor( sessionId, mentorId, questions, menteeId, menteeEmail){
        this.sessionId = sessionId;
        this.mentorId = mentorId;
        this.questions = questions;
        this.menteeId = menteeId;
        this.menteeEmail = menteeEmail;
        this.status = 'pending';
        
    }

    createSession(){
        sessions.push(this);
        return this; 
    }

    static acceptMentorshipSession(session){ 
         session.status = 'accepted'
        return session
       
     } 
    static rejectSession(session){ 
     session.status = 'rejected'
     return session
     } 
}
 
export default Session;    