import Session from '../models/sessions';
import User from '../models/users';
import Reviewsession from '../models/reviews';


class Review{
  static async getSessionById(req,res,next){
    const session = await Session.getSessionById(req.params.id)
    if(!session.rows[0]) return res.status(404).send({status:404, message:'session of the given Id not found'})
    req.session = session.rows[0]
    
  next();
  }
  static async sessionAlreadyExist(req,res,next){
    const{questions,mentor_id}=req.body
    const session = await Session.sessionAlreadyExist(questions,mentor_id)
    if(session.rows[0]) return res.status(409).send({status:409, message:'session already exists'})
    req.session = session.rows[0]
    
  next();
  }
  

  static async ifMentorExists(req, res, next) {
    const user = await User.getUserById(req.body.mentor_id)
    if (!user.rows[0]) return res.status(404).send({ status: 404, message: 'Mentor with the given Id not found' })
    next();
  }

  static notReviewYourSelf(req,res,next){
    if(req.session.mentor_id === req.user.id) return res.status(400).send({stasus:400,message:'you can not review yourself'})
      next()
    }

    static shdReviewYourOwn(req,res,next){
      if(req.session.mentee_id !== req.user.id) return res.status(400).send({status:400,message:'you canot review some ones session'})
        next()
    }

    static async notReviewAgain(req,res,next){
      const{mentee_id,session_id}=req.session
     const sessionReview = await Reviewsession.notReviewAgain(mentee_id,session_id) 
      if(sessionReview.rows[0]) return res.status(409).send({status:409, message:'you can not review again'})
        next()
    }
  }


  export default Review;
  