import { sessions}from '../data/sessionData';
import { sessionReviews } from '../data/sessionReviews';

class Review{
  static getSessionById(req,res,next){
    const session = sessions.find(session => session.sessionId === parseInt(req.params.id))
    if(!session) return res.status(404).send({status:404, message:'session of the given Id not found'})
    req.session = session
  next();
  }
  
  static questionExist(req,res,next){
    const session = sessions.find(session => session.questions === req.body.questions)
      if(session ) return res.status(409).send({error:409,message:'question already answered'});
    next();
  }

  static notReviewYourSelf(req,res,next){
    if(req.session.mentorId === req.user.id) return res.status(400).send({stasus:400,message:'you can not review yourself'})
      next()
    }

    static shdReviewYourOwn(req,res,next){
      if(req.session.menteeId !== req.user.id) return res.status(400).send({status:400,message:'you canot review some ones session'})
        next()
    }


    static notReviewAgain(req,res,next){
      const sessionReview = sessionReviews.find(session => {
        return session.menteeId === req.user.id  && session.sessionId === req.session.sessionId
      }) 
      if(sessionReview) return res.status(409).send({status:409, message:'you can not review again'})
        next()
    }
  }


  export default Review;
  