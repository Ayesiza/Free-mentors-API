import Session from '../models/sessions';
import User from '../models/users';
import Reviewsession from '../models/reviews';


class Review{
  static async getSessionById(req,res,next){
    const session = await Session.getSessionById(req.params.id)
    if(!session.rows[0]) return res.status(404).send({status_code:404, error:'session of the given Id not found'})
    req.session = session.rows[0]
    
  next();
  }
  static async sessionAlreadyExist(req,res,next){
    const{questions,mentor_id}=req.body
    const session = await Session.sessionAlreadyExist(questions,mentor_id)
    if(session.rows[0]) return res.status(409).send({status_code:409, error:'session already exists'})
    req.session = session.rows[0]
    
  next();
  }
  

  static async ifMentorExists(req, res, next) {
    if (!req.mentor) return res.status(404).send({ status_code: 404, error: 'Mentor with the given Id not found' })
    next();
  }

  static notReviewYourSelf(req,res,next){
    if(req.session.mentor_id === req.user.id) return res.status(400).send({status_code:400,error:'you can not review yourself'})
      next()
    }

    static shdReviewYourOwn(req,res,next){
      if(req.session.mentee_id !== req.user.id) return res.status(400).send({status_code:400,error:'you cannot review someones session'})
        next()
    }

    static async notReviewAgain(req,res,next){
      const{mentee_id,session_id}=req.session
     const sessionReview = await Reviewsession.notReviewAgain(mentee_id,session_id) 
      if(sessionReview.rows[0]) return res.status(409).send({status_code:409, error:'you can not review again'})
        next()
    }

    static async checkIfMentor(req,res,next){
      const mentor = await User.getUserById(req.body.mentor_id)
      if (mentor.rows[0].mentor === false) return res.status(400).send({status_code:400,error:"session not allowed, user not a mentor"})
      req.mentor = mentor.rows[0]
      next()
    }
  }


  export default Review;
  