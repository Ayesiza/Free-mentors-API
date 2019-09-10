import { sessions}from '../data/sessionData';
import Session from '../models/sessions';
import { sessionReviews } from '../data/sessionReviews';
import User from '../models/users';

class Review{
  static async getSessionById(req,res,next){
    const session = await Session.getSessionById(req.params.id)
    if(!session.rows[0]) return res.status(404).send({status:404, message:'session of the given Id not found'})
    req.session = session.rows[0]
    
  next();
  }
  static async sessionAlreadyExist(req,res,next){
    const{questions,mentorId}=req.body
    const session = await Session.sessionAlreadyExist(questions,mentorId)
    if(session.rows[0]) return res.status(409).send({status:409, message:'session already exists'})
    req.session = session.rows[0]
    
  next();
  }
  

  static async ifMentorExists(req, res, next) {
    const user = await User.getUserById(req.body.mentorId)
    if (!user.rows[0]) return res.status(404).send({ status: 404, message: 'Mentor with the given Id not found' })
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
  