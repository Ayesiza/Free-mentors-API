import Session from '../models/sessions';
import { sessions } from '../data/sessionData';
import { sessionReviews } from '../data/sessionReviews';

export class SessionController {
  static createSession(req, res) {
    const { mentorId, questions } = req.body;
    const sessionId = sessions.length + 1;
    const { id, email } = req.user
    const newSession = new Session(sessionId, mentorId, questions, id, email)
    const session = newSession.createSession();
    return res.status(200).send({ status: 200, data:session });
  }

  static acceptMentorshipSession(req, res) {
    if(req.session.status==='accepted') return res.status(409).send({status:409, message:'Session Already Accepted'})
    const session = Session.acceptMentorshipSession(req.session)
    return res.send({ status: 200, session })
  }


  static rejectSession(req, res) {
    const session = Session.rejectSession(req.session)
    return res.send({ status: 200, session})
  }

  static reviewSession(req ,res){
    const {id,firstName,lastName} = req.user
    const {score,remark} = req.body
    let sessionReview = {
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
