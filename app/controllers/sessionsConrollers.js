import Session from '../models/sessions';
import { sessions } from '../data/sessionData';
import { sessionReviews } from '../data/sessionReviews';

export class SessionController {
  static async createSession(req, res) {
    try{
    const { mentorId, questions } = req.body;
    const { id, email } = req.user
    const newSession = new Session(mentorId, questions, id, email)
    const session = await newSession.createSession();
    return res.status(200).send({ status: 200, data:session.rows[0]});
  }  catch (error){
    return res.status(400).send({status:400, message:error.message});
  }
  };

  static async acceptMentorshipSession(req, res) {
    if(req.session.status==='accepted') return res.status(409).send({status:409, message:'Session Already Accepted'})
    const session = await Session.acceptMentorshipSession((req.session.sessionid))
    return res.send({ status:200, session:session.rows[0]})
  }
 

  static async rejectSession(req, res) {
    const session = await Session.rejectSession(req.session.sessionid)
    return res.send({ status: 200, session:session.rows[0]})
  }

  static reviewSession(req ,res){
    const {id,firstName,lastName} = req.user
    const {score,remark} = req.body
    const sessionReview = {
        sessionId: parseInt(req.params.id),
        mentorId: req.session.mentorId,
        menteeId: id,
        score: score,
        menteeFullName: `${firstName} ${lastName}` ,
        remark: remark,
    }
    sessionReviews.push(sessionReview)
    res.status(201).send({status:201,data:sessionReview})
  }
}

export default SessionController;
