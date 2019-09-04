import { sessions}from '../data/sessionData';
import { users } from '../data/userData'


export const getSessionById = (req,res,next) => {
    const session = sessions.find(session => session.sessionId === parseInt(req.params.id))
    if(!session) return res.status(404).send({status:404, message:'session of the given Id not found'})
    req.session = session
  next();
  }
 
  export const questionExist = (req,res,next) => {
    const session = sessions.find(session => session.questions === req.body.questions)
      // const mentor = users.find(user => user.id === session.mentorId)
      if(session ) return res.status(409).send({error:409,message:'question already answered'});
    next();
  }
  