import Session from '../models/sessions';
import reviewSession from '../models/reviews'

export class SessionController {
  static async createSession(req, res) {
    try{
    const { mentor_id, questions } = req.body;
    const { id, email } = req.user
    const newSession = new Session(mentor_id, questions, id, email)
    const session = await newSession.createSession();
    return res.status(200).send({ status_code: 200, data:session.rows[0]});
  }  catch (error){
    return res.status(400).send({status_code:400, message:error.message});
  }
  };

  static async acceptMentorshipSession(req, res) {
    if(req.session.status==='accepted') return res.status(409).send({status_code:409, error:'Session Already Accepted'})
    const session = await Session.acceptMentorshipSession((req.session.session_id))
    return res.status(200).send({ status_code:200, session:session.rows[0]})
  };
 
  static async rejectSession(req, res) {
    const session = await Session.rejectSession(req.session.session_id)
    return res.status(200).send({ status_code: 200, session:session.rows[0]})
  }

  
  static async reviewSession(req ,res){
 
      const {id,first_name,last_name} = req.user
      const {score,remarks} = req.body
      const sessionReview = {
          session_id: parseInt(req.params.id),
          mentor_id: req.session.mentor_id,
          mentee_id: id,
          score: score,
          mentee_full_name: `${first_name} ${last_name}` ,
          remarks: remarks,
      }
    const review = await reviewSession.reviewSession(sessionReview)
      return res.status(201).send({status_code:201,data:review.rows[0]})
   
    
  }
};

export default SessionController;
