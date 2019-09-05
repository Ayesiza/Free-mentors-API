import { sessions}from '../data/sessionData';
import { users } from '../data/userData'
import { sessionReviews } from '../data/sessionReviews';

export const getSessionById = (req,res,next) => {
  const session = sessions.find(session => session.sessionId === parseInt(req.params.id))
  if(!session) return res.status(404).send({status:404, message:'session of the given Id not found'})
  req.session = session
next();
}
 
export const questionExist = (req,res,next) => {
  const session = sessions.find(session => session.questions === req.body.questions)
    if(session ) return res.status(409).send({error:409,message:'question already answered'});
  next();
}

export const notReviewOwn = (req,res,next)=>{
  if(req.session.mentorId === req.user.id) return res.status(401).send({message:'you can not review yourself'})
    next()
  }


  export const notReviewAgain = (req,res,next) => {
    const sessionReview = sessionReviews.find(session => {
      return session.menteeId === req.user.id  && session.sessionId === req.session.sessionId
    }) 
    if(sessionReview) return res.status(409).send({status:409, message:'you can not review again'})
      next()
    }



 
  
 
  