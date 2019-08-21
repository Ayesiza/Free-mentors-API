import { sessions } from '../models/sessions';

export class SessionController{

static createSession( req, res){
    const {mentorId, questions} =req.body;
    const sessionId = sessions.length + 1;
    const session = {sessionId, mentorId, questions, menteeId:req.user.id, menteeEmail:req.user.email, status:'pending'}
    sessions.push(session);
        return res.status(200).send({status:200,session}); 
}

static acceptMentorshipSession(req,res){ 
   const session = sessions.find(session => session.sessionId === parseInt(req.params.id))
   if(!session) return res.status(404).send({status:404, message:'session of the given Id not found'})
   session.status = 'accepted'
   res.send({status:200, session})
}

static rejectSession(req,res){ 
    const session = sessions.find(session => session.sessionId === parseInt(req.params.id))
    if(!session) return res.status(404).send({status:404, message:'session of the given Id not found'})
    session.status = 'rejected'
    res.send({status:200, session})
 }
}

export default SessionController;
